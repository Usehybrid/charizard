/**
 * Extracts the public prop surface of every documented component straight from
 * the TypeScript types, into src/site/generated/props.json.
 *
 * Why the compiler API and not react-docgen-typescript: `typescript` is already
 * a dependency, the components use patterns docgen tools trip on (discriminated
 * union prop types, forwardRef wrappers), and we need to *filter out* inherited
 * DOM attributes — a table with 300 rows of `onAnimationStart` documents
 * nothing. Props declared outside src/components are dropped and reported as a
 * single "plus native attributes" note instead.
 *
 * Run: `vp run site:props` (also part of site:build).
 */
import ts from 'typescript'
import {writeFileSync, mkdirSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {CATEGORIES} from '../src/site/manifest.ts'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ENTRY = resolve(ROOT, 'src/components/index.ts')
const OUT = resolve(ROOT, 'src/site/generated/props.json')

export interface PropDoc {
  name: string
  type: string
  required: boolean
  description?: string
  defaultValue?: string
}

export interface ComponentDoc {
  props: PropDoc[]
  /** Set when the component also accepts a DOM element's native attributes. */
  nativeProps?: string
}

const configPath = resolve(ROOT, 'tsconfig.app.json')
const config = ts.readConfigFile(configPath, ts.sys.readFile)
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, ROOT)
const program = ts.createProgram([ENTRY], {
  ...parsed.options,
  noEmit: true,
  skipLibCheck: true,
})
const checker = program.getTypeChecker()

const entryFile = program.getSourceFile(ENTRY)
if (!entryFile) throw new Error(`cannot load ${ENTRY}`)
const entrySymbol = checker.getSymbolAtLocation(entryFile)
if (!entrySymbol) throw new Error('entry has no module symbol')

const exportsByName = new Map<string, ts.Symbol>()
for (const symbol of checker.getExportsOfModule(entrySymbol)) {
  exportsByName.set(symbol.getName(), symbol)
}

/** Unwraps `export {X} from './x'` re-export chains. */
function resolveAlias(symbol: ts.Symbol): ts.Symbol {
  return symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol
}

/** The props type of a component symbol: the first parameter of its signature. */
function propsTypeOf(symbol: ts.Symbol): {type: ts.Type; declaration: ts.Declaration} | null {
  const declaration = symbol.getDeclarations()?.[0]
  if (!declaration) return null
  const type = checker.getTypeOfSymbolAtLocation(symbol, declaration)
  const signature = type.getCallSignatures()[0]
  if (signature) {
    const param = signature.getParameters()[0]
    if (!param) return {type: checker.getAnyType?.() ?? type, declaration}
    const paramDecl = param.getDeclarations()?.[0] ?? declaration
    return {type: checker.getTypeOfSymbolAtLocation(param, paramDecl), declaration}
  }
  // forwardRef / memo components expose props through their type argument.
  const propsAlias = type.aliasTypeArguments?.[0] ?? checker.getTypeArguments(type as never)?.[0]
  return propsAlias ? {type: propsAlias, declaration} : null
}

/** Flattens union props types so a discriminated API lists every variant's props. */
function constituentsOf(type: ts.Type): ts.Type[] {
  return type.isUnion() ? type.types : [type]
}

// Inherited props are dropped from the table, but which element they came from
// is worth saying once. Keyed by the React interface that declared them.
const NATIVE_ELEMENTS: Record<string, string> = {
  InputHTMLAttributes: 'input',
  TextareaHTMLAttributes: 'textarea',
  ButtonHTMLAttributes: 'button',
  AnchorHTMLAttributes: 'a',
  ImgHTMLAttributes: 'img',
  SelectHTMLAttributes: 'select',
  LabelHTMLAttributes: 'label',
  TableHTMLAttributes: 'table',
  SVGAttributes: 'svg',
  HTMLAttributes: 'div',
}

/** Name of the interface a (dropped) inherited prop was declared on. */
function declaringInterface(decl?: ts.Declaration): string | undefined {
  const parent = decl?.parent
  return parent && (ts.isInterfaceDeclaration(parent) || ts.isTypeLiteralNode(parent))
    ? ((parent as ts.InterfaceDeclaration).name?.text ?? undefined)
    : undefined
}

// Zag machine plumbing that is never part of how our components are used.
const PROP_DENYLIST = new Set(['getRootNode', 'ids', 'dir', 'translations'])

/** `foo | undefined` reads as noise next to a Required column. */
function cleanType(type: string): string {
  return type
    .split('|')
    .map(part => part.trim())
    .filter(part => part !== 'undefined')
    .join(' | ')
}

function docFor(name: string): ComponentDoc | null {
  const exported = exportsByName.get(name)
  if (!exported) return null
  const resolved = resolveAlias(exported)
  const props = propsTypeOf(resolved)
  if (!props) return null

  // A prop is "ours" when its declaration lives in src/components — everything
  // else is inherited DOM/React surface we summarise instead of listing.
  // Merged across union constituents: a discriminated API (Button, Badge) has
  // the same prop declared per variant, sometimes as `never`.
  const own = new Map<
    string,
    {types: Set<string>; required: boolean; description?: string; defaultValue?: string}
  >()
  const inherited = new Set<string>()

  for (const constituent of constituentsOf(props.type)) {
    for (const prop of checker.getPropertiesOfType(constituent)) {
      const decl = prop.getDeclarations()?.[0]
      const file = decl?.getSourceFile().fileName ?? ''
      // Zag machine props (checked, onCheckedChange, …) are part of the public
      // API of our zag-based components, so they count as ours; React's DOM
      // attribute interfaces do not.
      const isOurs =
        file.includes('/src/components/') ||
        file.includes('/src/types') ||
        file.includes('/@zag-js/')
      if (!isOurs) {
        const iface = declaringInterface(decl)
        if (iface) inherited.add(iface)
        continue
      }
      const name = prop.getName()
      if (PROP_DENYLIST.has(name)) continue
      const type = cleanType(
        checker.typeToString(
          checker.getTypeOfSymbolAtLocation(prop, decl!),
          undefined,
          ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
        ),
      )
      const description = ts.displayPartsToString(prop.getDocumentationComment(checker)).trim()
      const defaultTag = prop
        .getJsDocTags(checker)
        .find(tag => tag.name === 'default' || tag.name === 'defaultValue')
      const optional = Boolean(prop.flags & ts.SymbolFlags.Optional)

      const merged = own.get(name) ?? {types: new Set<string>(), required: !optional}
      if (type && type !== 'never') merged.types.add(type)
      // Optional in ANY variant means callers can omit it.
      merged.required = merged.required && !optional
      merged.description ||= description || undefined
      merged.defaultValue ||= defaultTag?.text?.length
        ? ts.displayPartsToString(defaultTag.text).trim()
        : undefined
      own.set(name, merged)
    }
  }

  const docs: PropDoc[] = [...own.entries()].map(([name, merged]) => ({
    name,
    type: [...merged.types].join(' | ') || 'never',
    required: merged.required,
    ...(merged.description ? {description: merged.description} : {}),
    ...(merged.defaultValue ? {defaultValue: merged.defaultValue} : {}),
  }))

  // Destructuring defaults in the component signature, e.g. `size = 'default'`.
  applySignatureDefaults(resolved, docs)

  const nativeProps = [...inherited].map(name => NATIVE_ELEMENTS[name]).find(Boolean)
  if (docs.length === 0 && !nativeProps) return null

  return {
    props: docs.sort((a, b) =>
      a.required === b.required ? a.name.localeCompare(b.name) : a.required ? -1 : 1,
    ),
    ...(nativeProps ? {nativeProps} : {}),
  }
}

function applySignatureDefaults(symbol: ts.Symbol, props: PropDoc[]) {
  const decl = symbol.getDeclarations()?.[0]
  if (!decl) return
  const fn = ts.isFunctionDeclaration(decl)
    ? decl
    : ts.isVariableDeclaration(decl) &&
        decl.initializer &&
        (ts.isArrowFunction(decl.initializer) || ts.isFunctionExpression(decl.initializer))
      ? decl.initializer
      : undefined
  const param = fn?.parameters[0]
  if (!param || !ts.isObjectBindingPattern(param.name)) return
  for (const element of param.name.elements) {
    if (!element.initializer || !ts.isIdentifier(element.propertyName ?? element.name)) continue
    const name = (element.propertyName ?? element.name).getText()
    const prop = props.find(p => p.name === name)
    if (prop && !prop.defaultValue) prop.defaultValue = element.initializer.getText()
  }
}

const components: Record<string, ComponentDoc> = {}
const missing: string[] = []

for (const category of CATEGORIES) {
  for (const entry of category.entries) {
    for (const name of entry.exports ?? [entry.title]) {
      const doc = docFor(name)
      if (doc) components[name] = doc
      else missing.push(name)
    }
  }
}

mkdirSync(dirname(OUT), {recursive: true})
writeFileSync(OUT, JSON.stringify(components, null, 2) + '\n')

const propCount = Object.values(components).reduce((n, c) => n + c.props.length, 0)
console.log(
  `✓ src/site/generated/props.json — ${Object.keys(components).length} components, ${propCount} props`,
)
if (missing.length) console.log(`  (no props resolved: ${missing.join(', ')})`)
