import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import { Page } from '../../types'

export default function MorePages({pages}: {pages: Array<Page>}) {
  return (
    <div className={classes.menu}>
      {pages.map((page: Page, index: React.Key) => (
        <div className={clsx(classes.menuItem)} key={index}>
          <div className={classes.page}>{page.label}</div>
        </div>
      ))}
    </div>
  )
}
