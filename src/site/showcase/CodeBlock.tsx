import * as React from 'react'
import clsx from 'clsx'
import {copyToClipboard} from '../copy-to-clipboard'
import {CheckIcon, CopyIcon} from './icons'
import {tokenize} from './highlight'
import classes from './code-block.module.css'

interface CodeBlockProps {
  code: string
  /** Language chip shown in the header. */
  lang?: string
  /** Collapse to ~18 lines behind an "Expand" fade, like a docs snippet. */
  collapsible?: boolean
  /** Hide the header bar (used when the parent already owns a toolbar). */
  bare?: boolean
  /** Set false when the parent's toolbar already offers a copy button. */
  showCopy?: boolean
  className?: string
}

const COLLAPSED_LINES = 18

export function CodeBlock({
  code,
  lang = 'tsx',
  collapsible = true,
  bare = false,
  showCopy = true,
  className,
}: CodeBlockProps) {
  const source = code.trim()
  const tokens = React.useMemo(() => tokenize(source), [source])
  const lineCount = source.split('\n').length
  const overflows = collapsible && lineCount > COLLAPSED_LINES
  const [expanded, setExpanded] = React.useState(false)
  const collapsed = overflows && !expanded

  return (
    <div className={clsx(classes.root, className)}>
      {!bare && showCopy && (
        <div className={classes.header}>
          <span className={clsx(classes.lang, 'zap-caption-semibold')}>{lang}</span>
          <CopyButton value={source} />
        </div>
      )}
      <div className={clsx(classes.scroll, collapsed && classes.collapsed)}>
        {/* Gutter is aria-hidden and outside the <pre> so copying the selection
            never picks up the line numbers. */}
        <div className={classes.gutter} aria-hidden>
          {Array.from({length: lineCount}, (_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <pre className={classes.pre}>
          <code>
            {tokens.map((token, i) => (
              <span key={i} className={classes[token.kind]}>
                {token.text}
              </span>
            ))}
          </code>
        </pre>
        {bare && showCopy && <CopyButton value={source} className={classes.floatingCopy} />}
      </div>
      {overflows && (
        <button
          type="button"
          className={clsx(classes.expand, 'zap-subcontent-semibold')}
          onClick={() => setExpanded(v => !v)}
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      )}
    </div>
  )
}

interface CopyButtonProps {
  value: string
  /** `dark` sits on the code surface, `light` on white/subtle docs surfaces. */
  tone?: 'dark' | 'light'
  className?: string
}

export function CopyButton({value, tone = 'dark', className}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  React.useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    if (!(await copyToClipboard(value))) return
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={clsx(
        classes.copy,
        tone === 'light' && classes.copyLight,
        copied && classes.copied,
        className,
      )}
      aria-label={copied ? 'Copied' : 'Copy code'}
      title={copied ? 'Copied' : 'Copy code'}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  )
}
