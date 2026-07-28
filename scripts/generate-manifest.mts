/**
 * Generates the machine-readable component index served by the showcase site:
 *   public/llms.txt              — markdown index for LLMs/agents
 *   public/components.json       — structured equivalent
 *   public/components/<slug>.md  — one markdown page per component
 *
 * Sources: src/site/manifest.ts (names, categories, descriptions) and the
 * copyable `code` snippets embedded in each showcase page, via the shared
 * builders in src/site/llm-markdown.ts — the same code the site's "Copy page"
 * button runs, so the copied text and the published file can't drift. Runs as
 * part of `site:build`.
 */
import {readFileSync, writeFileSync, mkdirSync, existsSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {CATEGORIES} from '../src/site/manifest.ts'
import propDocs from '../src/site/generated/props.json' with {type: 'json'}
import {
  componentMarkdown,
  extractSectionTitles,
  extractSnippets,
  importLine,
  PKG,
  SITE_URL,
} from '../src/site/llm-markdown.ts'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = resolve(ROOT, 'public')

function sourceFor(slug: string): string {
  const file = resolve(ROOT, `src/site/pages/${slug}.tsx`)
  return existsSync(file) ? readFileSync(file, 'utf8') : ''
}

const components = CATEGORIES.flatMap(category =>
  category.entries.map(entry => {
    const source = sourceFor(entry.slug)
    return {
      name: entry.title,
      slug: entry.slug,
      category: category.name,
      description: entry.description,
      docs: `${SITE_URL}/#/components/${entry.slug}`,
      markdown: `${SITE_URL}/components/${entry.slug}.md`,
      // Some components still ship a V2-suffixed export; the docs use the plain
      // name, so the import line has to come from the manifest's `exports`.
      exports: entry.exports ?? [entry.title],
      import: importLine(entry),
      sections: extractSectionTitles(source),
      snippets: extractSnippets(source),
      props: Object.fromEntries(
        (entry.exports ?? [entry.title])
          .filter(name => name in propDocs)
          .map(name => [name, propDocs[name as keyof typeof propDocs]]),
      ),
    }
  }),
)

// ---------------------------------------------------------------------------
// public/components/<slug>.md — the per-component page an agent can fetch
mkdirSync(resolve(OUT_DIR, 'components'), {recursive: true})
for (const category of CATEGORIES) {
  for (const entry of category.entries) {
    const c = components.find(x => x.slug === entry.slug)!
    writeFileSync(
      resolve(OUT_DIR, 'components', `${entry.slug}.md`),
      componentMarkdown({
        entry,
        category: category.name,
        snippets: c.snippets,
        sections: c.sections,
        propDocs: c.props,
      }),
    )
  }
}

// ---------------------------------------------------------------------------
// llms.txt
let md = `# Charizard Design System (${PKG})

> The React 19 component library powering ZenAdmin (https://www.zenadmin.ai). ESM-only,
> tree-shakeable named exports, TypeScript prop types included, styles injected on import.
> Built on Zag.js state machines, TanStack Table v8, Zustand, react-day-picker and dnd-kit.

Install: \`pnpm add ${PKG}\`
If your bundler strips CSS side effects: \`import '${PKG}/styles.css'\`
Components needing router context (Button links, Breadcrumbs, TaskCards, Error pages) must render inside a react-router v8 router.
This index lists the current generation of every component. Some are still exported under a V2-suffixed
name (e.g. InputV2, ModalV2) — always import the exact name shown in the component's Import line.
Superseded originals (Input, Modal, Checkbox, …) remain exported for backwards compatibility only; do not use them in new code.

Human-browsable showcase with live demos of every component: ${SITE_URL}/
Structured version of this index: ${SITE_URL}/components.json
Full markdown page for one component (description, imports, snippets, prop tables): ${SITE_URL}/components/<slug>.md
Release history: ${SITE_URL}/#/changelog
`

for (const category of CATEGORIES) {
  md += `\n## ${category.name}\n`
  for (const entry of category.entries) {
    const c = components.find(x => x.slug === entry.slug)!
    md += `\n### ${entry.title}\n\n${entry.description}\n\n`
    md += `- Import: \`${c.import}\`\n- Demos: ${c.docs}\n- Markdown: ${c.markdown}\n`
    for (const snippet of c.snippets.slice(0, 2)) {
      md += `\n\`\`\`tsx\n${snippet}\n\`\`\`\n`
    }
  }
}

writeFileSync(resolve(OUT_DIR, 'llms.txt'), md)
writeFileSync(
  resolve(OUT_DIR, 'components.json'),
  JSON.stringify(
    {package: PKG, site: SITE_URL, generatedFrom: 'src/site/manifest.ts', components},
    null,
    2,
  ) + '\n',
)
console.log(
  `✓ public/llms.txt + public/components.json + public/components/*.md (${components.length} components)`,
)
