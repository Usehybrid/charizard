import * as React from 'react'
import clsx from 'clsx'
import slash from '../assets/slash.svg'
import MorePages from './components/more-pages/MorePages'
import classes from './breadcrumb.module.css'
import {Key} from 'react'
import {SVG} from '../svg'
import { Page } from './types'

interface BreadCrumbProps {
  pages: Array<Page>
}

export function Breadcrumb({pages}: BreadCrumbProps) {
  const [showMorePages, setShowMorePages] = React.useState(false)

  return (
    <div className={classes.breadcrumb}>
      {pages.map((page: Page, i: Key) => (
        <span key={i} className={classes.pageSection}>
          {Number(i) === 2 && pages.length !== 3 ? (
            <>
              <span
                className={clsx(classes.dots, `${showMorePages && classes.dotsActive}`)}
                onClick={() => setShowMorePages(e => !e)}
              >
                ...
              </span>
              <span>
                <SVG path={slash} width={24} height={24} />
              </span>
            </>
          ) : (
            <>
              {(Number(i) === pages.length - 1 || Number(i) < 2) && (
                <span className={clsx(classes.page, `${Number(i) >= 2 && classes.activePage}`)}>
                  {page.label}
                </span>
              )}
              {i !== pages.length - 1 && Number(i) < 2 && (
                <span>
                  <SVG path={slash} width={24} height={24} />
                </span>
              )}
            </>
          )}
        </span>
      ))}
      {showMorePages && <MorePages pages={pages.slice(2, pages.length - 1)} />}
    </div>
  )
}
