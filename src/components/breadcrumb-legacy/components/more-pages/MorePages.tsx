import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import { Page } from '../../types'

export default function MorePages({pages}: {pages: Array<Page>}) {
  return (
    <div className={classes.menu}>
      {pages.map((page: Page, index: React.Key) => (
        <div className={clsx(classes.menuItem)} key={index}>
          <div className={clsx(classes.page, 'zap-content-medium')} onClick={page.to}>{page.label}</div>
        </div>
      ))}
    </div>
  )
}
