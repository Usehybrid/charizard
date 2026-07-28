import * as React from 'react'
import clsx from 'clsx'
import classes from './toc.module.css'

function scrollToHeading(id: string) {
  document.getElementById(id)?.scrollIntoView({behavior: 'smooth', block: 'start'})
}

interface Heading {
  id: string
  text: string
}

function sameHeadings(a: Heading[], b: Heading[]): boolean {
  return a.length === b.length && a.every((h, i) => h.id === b[i].id && h.text === b[i].text)
}

/**
 * "On this page" rail. Reads the rendered section headings instead of a second
 * declaration of them, so a page can never have a stale outline — DemoSection
 * already gives every `h2` a slug id.
 */
export function TableOfContents({slug}: {slug: string}) {
  const [headings, setHeadings] = React.useState<Heading[]>([])
  const [active, setActive] = React.useState<string>('')

  React.useEffect(() => {
    const read = () => {
      const found = [...document.querySelectorAll<HTMLElement>('main h2[id]')].map(el => ({
        id: el.id,
        text: el.textContent?.trim() ?? '',
      }))
      // Bail out when nothing changed: this also runs from a MutationObserver,
      // so re-rendering on every DOM touch would loop.
      setHeadings(prev => (sameHeadings(prev, found) ? prev : found))
    }
    read()

    // Pages are lazy, so the headings only exist some time after this mounts —
    // and on a cold chunk that can be well over a second. Watch the DOM instead
    // of retrying on a budget, which gave up early and left the rail empty for
    // the rest of the page's life.
    const main = document.querySelector('main')
    if (!main) return
    const observer = new MutationObserver(read)
    observer.observe(main, {childList: true, subtree: true})
    return () => observer.disconnect()
  }, [slug])

  React.useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id)
      },
      {rootMargin: '-64px 0px -70% 0px', threshold: [0, 1]},
    )
    for (const h of headings) {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <nav className={classes.root} aria-label="On this page">
      <div className={clsx(classes.title, 'zap-caption-semibold')}>On this page</div>
      <ul className={classes.list}>
        {headings.map(h => (
          <li key={h.id}>
            {/* Buttons, not #hash links: the site runs on a hash router, so a
                bare fragment href would be read as a route and 404. */}
            <button
              type="button"
              onClick={() => scrollToHeading(h.id)}
              className={clsx(
                classes.link,
                'zap-subcontent-regular',
                active === h.id && classes.linkActive,
              )}
            >
              {h.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
