import * as React from 'react'
import clsx from 'clsx'
import slash from '../assets/slash.svg'
import MorePages from './components/more-pages/MorePages'
import classes from './breadcrumb.module.css'
import {SVG} from '../svg'
import {Page} from './types'

interface BreadCrumbProps {
  pages: Array<Page>
}

export function Breadcrumb({pages}: BreadCrumbProps) {
  const [showMorePages, setShowMorePages] = React.useState(false)
  const [clickedItem, setClickedItem] = React.useState<string | null>(null)

  const menuRef = React.useRef<HTMLDivElement | null>(null)

  const handleHideMenu = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMorePages(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleHideMenu)

    return () => {
      document.removeEventListener('mousedown', handleHideMenu)
    }
  }, [])

  return (
    <div className={classes.breadcrumb}>
      {pages.map((page: Page, i: React.Key) => (
        <span key={i} className={classes.pageSection}>
          {Number(i) === 2 && pages.length !== 3 ? (
            <>
              <span
                className={clsx(
                  classes.dots,
                  `${showMorePages && clickedItem === 'dots' ? classes.focused : null}`,
                )}
                onClick={() => {
                  setShowMorePages(e => !e)
                  setClickedItem('dots')
                }}
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
                <span
                  onClick={() => {
                    page.to()
                    setClickedItem(page.label)
                  }}
                  className={clsx(
                    classes.page,
                    `${Number(i) >= 2 && classes.activePage} ${clickedItem === page.label && classes.focused}`,
                  )}
                >
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
      {showMorePages && (
        <div ref={menuRef}>
          <MorePages pages={pages.slice(2, pages.length - 1)} />
        </div>
      )}
    </div>
  )
}
