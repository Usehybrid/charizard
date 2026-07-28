import * as React from 'react'
import clsx from 'clsx'
import {CopyButton} from './CodeBlock'
import {CopyPageButton} from './CopyPageButton'
import {ALL_COMPONENTS} from '../manifest'
import {importLine} from '../llm-markdown'
import classes from './page-header.module.css'

interface PageHeaderProps {
  /** Component name as it appears in the sidebar — unversioned. */
  title: string
  /**
   * Exported symbols this page documents. Defaults to the manifest entry's
   * `exports` — the library still ships some names with a V2 suffix, and the
   * docs show the plain name, so the import line spells out the real symbols.
   */
  exports?: string[]
  children?: React.ReactNode
}

export function PageHeader({title, exports, children}: PageHeaderProps) {
  const entry = ALL_COMPONENTS.find(c => c.title === title)
  const names = exports ?? entry?.exports
  const line = entry ? importLine({...entry, exports: names ?? [title]}) : null

  return (
    <header className={classes.root}>
      <div className={classes.top}>
        <div className={classes.headings}>
          <h1 className={classes.title}>{title}</h1>
          {children && <p className={clsx(classes.lede, 'zap-content-regular')}>{children}</p>}
        </div>
        {entry && <CopyPageButton entry={{...entry, exports: names}} />}
      </div>
      {line && (
        <div className={classes.importBar}>
          <code className={classes.importCode}>{line}</code>
          <CopyButton value={line} tone="light" className={classes.importCopy} />
        </div>
      )}
    </header>
  )
}
