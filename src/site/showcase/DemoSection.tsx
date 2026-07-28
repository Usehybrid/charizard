import * as React from 'react'
import clsx from 'clsx'
import {CodeBlock, CopyButton} from './CodeBlock'
import {CodeIcon, EyeIcon} from './icons'
import classes from './showcase.module.css'

interface DemoSectionProps {
  title: string
  description?: string
  /** JSX source shown in the Code tab. */
  code?: string
  children: React.ReactNode
}

/**
 * One documented example: heading, prose, then a Preview/Code card.
 * The preview renders the real component from source — no screenshots.
 */
export function DemoSection({title, description, code, children}: DemoSectionProps) {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview')
  const id = slugify(title)

  return (
    <section className={classes.section}>
      {/* id feeds the "On this page" rail; no fragment link — the hash router
          owns the URL hash. */}
      <h2 id={id} className={clsx(classes.sectionTitle, 'zap-heading-semibold')}>
        {title}
      </h2>
      {description && (
        <p className={clsx(classes.sectionDescription, 'zap-content-regular')}>{description}</p>
      )}

      <div className={classes.card}>
        {code && (
          <div className={classes.toolbar}>
            <div className={classes.tabs} role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'preview'}
                className={clsx(
                  classes.tab,
                  tab === 'preview' && classes.tabActive,
                  'zap-subcontent-semibold',
                )}
                onClick={() => setTab('preview')}
              >
                <EyeIcon />
                Preview
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'code'}
                className={clsx(
                  classes.tab,
                  tab === 'code' && classes.tabActive,
                  'zap-subcontent-semibold',
                )}
                onClick={() => setTab('code')}
              >
                <CodeIcon />
                Code
              </button>
            </div>
            <CopyButton value={code.trim()} tone="light" />
          </div>
        )}

        {/* The preview stays mounted while the Code tab is open so demo state
            (open modals, typed values) survives a peek at the source. */}
        <div className={clsx(classes.canvas, code && tab !== 'preview' && classes.hidden)}>
          {children}
        </div>
        {code && tab === 'code' && (
          <div className={classes.codePane}>
            <CodeBlock code={code} bare showCopy={false} collapsible={false} />
          </div>
        )}
      </div>
    </section>
  )
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
