import * as React from 'react'
import clsx from 'clsx'
import classes from './showcase.module.css'

interface DemoSectionProps {
  title: string
  description?: string
  /** JSX source shown in a collapsible, copyable snippet under the demo. */
  code?: string
  children: React.ReactNode
}

export function DemoSection({title, description, code, children}: DemoSectionProps) {
  const [showCode, setShowCode] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const copy = async () => {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section className={classes.section}>
      <h2 className={classes.sectionTitle}>{title}</h2>
      {description && <p className={classes.sectionDescription}>{description}</p>}
      <div className={classes.canvas}>{children}</div>
      {code && (
        <div className={classes.codeBlock}>
          <div className={classes.codeActions}>
            <button className={classes.codeButton} onClick={() => setShowCode(v => !v)}>
              {showCode ? 'Hide code' : 'Show code'}
            </button>
            <button className={clsx(classes.codeButton, copied && classes.codeButtonDone)} onClick={copy}>
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
          {showCode && (
            <pre className={classes.code}>
              <code>{code.trim()}</code>
            </pre>
          )}
        </div>
      )}
    </section>
  )
}
