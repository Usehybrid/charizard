/**
 * Generates the machine-readable component index served by the showcase site:
 *   public/llms.txt         — markdown index for LLMs/agents
 *   public/components.json  — structured equivalent
 *
 * Sources: src/site/manifest.ts (names, categories, descriptions) and the
 * copyable `code` snippets embedded in each showcase page. Runs as part of
 * `site:build`, so the output never drifts from the pages.
 */
import {readFileSync, writeFileSync, mkdirSync, existsSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {CATEGORIES} from '../src/site/manifest.ts'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = resolve(ROOT, 'public')
const SITE_URL = 'https://ui.zenadmin.co'
const PKG = '@hybr1d-tech/charizard'

function snippetsFor(slug: string): string[] {
  const file = resolve(ROOT, `src/site/pages/${slug}.tsx`)
  if (!existsSync(file)) return []
  const source = readFileSync(file, 'utf8')
  const snippets: string[] = []
  // `code` props are template literals: code={`...`}
  for (const match of source.matchAll(/code=\{`([\s\S]*?)`\}/g)) {
    snippets.push(match[1].trim())
  }
  // Also match code={someVar} where someVar = `...` at module scope.
  for (const match of source.matchAll(/code=\{(\w+)\}/g)) {
    const varMatch = source.match(new RegExp(`const ${match[1]} = \`([\\s\\S]*?)\``))
    if (varMatch) snippets.push(varMatch[1].trim())
  }
  return snippets
}

const components = CATEGORIES.flatMap(category =>
  category.entries.map(entry => ({
    name: entry.title,
    slug: entry.slug,
    category: category.name,
    description: entry.description,
    docs: `${SITE_URL}/#/components/${entry.slug}`,
    import: `import {${entry.title}} from '${PKG}'`,
    snippets: snippetsFor(entry.slug),
  })),
)

// ---------------------------------------------------------------------------
// llms.txt
let md = `# Charizard Design System (${PKG})

> The React 19 component library powering ZenAdmin (https://www.zenadmin.ai). ESM-only,
> tree-shakeable named exports, TypeScript prop types included, styles injected on import.
> Built on Zag.js state machines, TanStack Table v8, Zustand, react-day-picker and dnd-kit.

Install: \`pnpm add ${PKG}\`
If your bundler strips CSS side effects: \`import '${PKG}/styles.css'\`
Components needing router context (Button links, Breadcrumbs, TaskCards, Error pages) must render inside a react-router v8 router.
Prefer V2 components where one exists; V1 originals remain exported for backwards compatibility.

Human-browsable showcase with live demos of every component: ${SITE_URL}/
Structured version of this index: ${SITE_URL}/components.json
`

for (const category of CATEGORIES) {
  md += `\n## ${category.name}\n`
  for (const entry of category.entries) {
    const c = components.find(x => x.slug === entry.slug)!
    md += `\n### ${entry.title}\n\n${entry.description}\n\n`
    md += `- Import: \`${c.import}\`\n- Demos: ${c.docs}\n`
    for (const snippet of c.snippets.slice(0, 2)) {
      md += `\n\`\`\`tsx\n${snippet}\n\`\`\`\n`
    }
  }
}

mkdirSync(OUT_DIR, {recursive: true})
writeFileSync(resolve(OUT_DIR, 'llms.txt'), md)
writeFileSync(
  resolve(OUT_DIR, 'components.json'),
  JSON.stringify({package: PKG, site: SITE_URL, generatedFrom: 'src/site/manifest.ts', components}, null, 2) + '\n',
)
console.log(`✓ public/llms.txt + public/components.json (${components.length} components)`)
