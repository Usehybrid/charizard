/**
 * Per-component markdown for LLMs and coding agents.
 *
 * Pure data + string building, no vite or node APIs: the same functions run in
 * the browser (the "Copy page" button on each component page) and in Node
 * (scripts/generate-manifest.mts, which writes public/components/<slug>.md and
 * llms.txt). One implementation means the copied text and the published file
 * can never disagree.
 */
import type {ComponentEntry} from './manifest'

export const PKG = '@hybr1d-tech/charizard'
export const SITE_URL = 'https://ui.zenadmin.co'

/** Import line for an entry — honours the manifest's `exports` override. */
export function importLine(entry: ComponentEntry): string {
  return `import {${(entry.exports ?? [entry.title]).join(', ')}} from '${PKG}'`
}

/**
 * Pulls the copyable snippets out of a showcase page's source. Snippets live in
 * `code` props of DemoSection, either inline template literals or a module-scope
 * const referenced by name.
 */
export function extractSnippets(source: string): string[] {
  const snippets: string[] = []
  for (const match of source.matchAll(/code=\{`([\s\S]*?)`\}/g)) {
    snippets.push(match[1].trim())
  }
  for (const match of source.matchAll(/code=\{(\w+)\}/g)) {
    const varMatch = source.match(new RegExp(`const ${match[1]} = \`([\\s\\S]*?)\``))
    if (varMatch) snippets.push(varMatch[1].trim())
  }
  return snippets
}

/** Section titles in page order, for a table of contents. */
export function extractSectionTitles(source: string): string[] {
  return [...source.matchAll(/<DemoSection\s+title="([^"]+)"/g)].map(m => m[1])
}

export interface PropDoc {
  name: string
  type: string
  required: boolean
  description?: string
  defaultValue?: string
}

export interface ComponentPropDocs {
  props: PropDoc[]
  /** Element whose native attributes are also accepted. */
  nativeProps?: string
}

interface MarkdownOptions {
  entry: ComponentEntry
  category: string
  snippets: string[]
  /** Section titles, when known — rendered as a usage outline. */
  sections?: string[]
  /** Generated prop tables, keyed by export name. */
  propDocs?: Record<string, ComponentPropDocs>
}

/** The full markdown page for one component. */
export function componentMarkdown({
  entry,
  category,
  snippets,
  sections,
  propDocs,
}: MarkdownOptions): string {
  const lines = [
    `# ${entry.title}`,
    '',
    entry.description,
    '',
    `- Package: \`${PKG}\``,
    `- Import: \`${importLine(entry)}\``,
    `- Category: ${category}`,
    `- Live demos: ${SITE_URL}/#/components/${entry.slug}`,
  ]

  if (entry.exports?.length && !entry.exports.includes(entry.title)) {
    lines.push(
      `- Note: import the exact name(s) above. A \`${entry.title}\` export also exists, but it is the superseded earlier generation — do not use it in new code.`,
    )
  }

  if (sections?.length) {
    lines.push('', '## Examples on this page', '', ...sections.map(s => `- ${s}`))
  }

  for (const [i, snippet] of snippets.entries()) {
    lines.push('', `## Usage ${i + 1}`, '', '```tsx', snippet, '```')
  }

  if (propDocs) {
    for (const name of entry.exports ?? [entry.title]) {
      const doc = propDocs[name]
      if (!doc) continue
      lines.push('', `## Props — ${name}`, '')
      if (doc.nativeProps) {
        lines.push(`Also accepts every native \`<${doc.nativeProps}>\` attribute.`, '')
      }
      lines.push(
        '| Prop | Type | Required | Default | Description |',
        '| --- | --- | --- | --- | --- |',
      )
      for (const prop of doc.props) {
        const cells = [
          `\`${prop.name}\``,
          `\`${prop.type.replaceAll('|', '\\|')}\``,
          prop.required ? 'yes' : 'no',
          prop.defaultValue ? `\`${prop.defaultValue.replaceAll('\n', ' ')}\`` : '—',
          prop.description?.replaceAll('\n', ' ') ?? '',
        ]
        lines.push(`| ${cells.join(' | ')} |`)
      }
    }
  }

  lines.push(
    '',
    '---',
    '',
    `Styles ship with the import; if your bundler strips CSS side effects, also \`import '${PKG}/styles.css'\`.`,
    `Full component index for agents: ${SITE_URL}/llms.txt`,
    '',
  )

  return lines.join('\n')
}
