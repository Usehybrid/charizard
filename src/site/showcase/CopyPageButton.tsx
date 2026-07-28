import * as React from 'react'
import clsx from 'clsx'
import {CATEGORIES, type ComponentEntry} from '../manifest'
import {
  componentMarkdown,
  extractSectionTitles,
  extractSnippets,
  importLine,
  SITE_URL,
} from '../llm-markdown'
import {pageSource} from '../page-modules'
import {copyToClipboard} from '../copy-to-clipboard'
import {ChatGptIcon, ClaudeIcon, MarkdownIcon} from './brand-icons'
import {CheckIcon, ChevronDownIcon, CopyIcon} from './icons'
import classes from './copy-page.module.css'

/**
 * "Copy page" — hands an agent the whole component as markdown, or opens it in
 * an assistant. Same shape as the shadcn/ui docs control.
 *
 * The markdown is built on demand from the page's own source (loaded lazily as
 * a raw module, so no page source sits in the initial bundle) through the same
 * builder that writes the published .md files.
 */
export function CopyPageButton({entry}: {entry: ComponentEntry}) {
  const [state, setState] = React.useState<'idle' | 'copied'>('idle')
  const [open, setOpen] = React.useState(false)
  const root = React.useRef<HTMLDivElement>(null)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  React.useEffect(() => () => clearTimeout(timer.current), [])

  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const flash = () => {
    setState('copied')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState('idle'), 1800)
  }

  const markdown = async () => {
    const load = pageSource(entry.slug)
    const source = load ? await load() : ''
    const category = CATEGORIES.find(c => c.entries.some(e => e.slug === entry.slug))?.name ?? ''
    return componentMarkdown({
      entry,
      category,
      snippets: extractSnippets(source),
      sections: extractSectionTitles(source),
    })
  }

  const copy = async (text: string) => {
    const ok = await copyToClipboard(text)
    setOpen(false)
    if (ok) flash()
  }

  // Assistants have to fetch a real URL, so they get the absolute published
  // .md — the HTML page is a hash-routed SPA they can't read.
  const mdUrl = `${SITE_URL}/components/${entry.slug}.md`
  const promptUrl = (base: string) =>
    `${base}?q=${encodeURIComponent(
      `I'm looking at this Charizard (ZenAdmin design system) documentation: ${mdUrl}.
Help me understand how to use the ${entry.title} component. Be ready to explain concepts, give examples, or help debug based on it.`,
    )}`

  return (
    <div className={classes.root} ref={root}>
      <button
        type="button"
        className={clsx(classes.main, 'zap-subcontent-semibold')}
        onClick={async () => copy(await markdown())}
      >
        {state === 'copied' ? <CheckIcon /> : <CopyIcon />}
        {state === 'copied' ? 'Copied' : 'Copy page'}
      </button>
      <button
        type="button"
        className={classes.chevron}
        aria-label="More copy options"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        <ChevronDownIcon />
      </button>

      {open && (
        <div className={classes.menu} role="menu">
          <button
            type="button"
            role="menuitem"
            className={clsx(classes.item, 'zap-subcontent-medium')}
            onClick={() => copy(importLine(entry))}
          >
            <CopyIcon />
            Copy import line
          </button>
          <a
            role="menuitem"
            className={clsx(classes.item, 'zap-subcontent-medium')}
            href={`${import.meta.env.BASE_URL}components/${entry.slug}.md`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <MarkdownIcon />
            View as Markdown
          </a>
          <div className={classes.separator} />
          <a
            role="menuitem"
            className={clsx(classes.item, 'zap-subcontent-medium')}
            href={promptUrl('https://chatgpt.com')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <ChatGptIcon />
            Open in ChatGPT
          </a>
          <a
            role="menuitem"
            className={clsx(classes.item, 'zap-subcontent-medium')}
            href={promptUrl('https://claude.ai/new')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <ClaudeIcon />
            Open in Claude
          </a>
        </div>
      )}
    </div>
  )
}
