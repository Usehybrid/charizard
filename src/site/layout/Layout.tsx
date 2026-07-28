import * as React from 'react'
import {createPortal} from 'react-dom'
import clsx from 'clsx'
import {NavLink, Outlet, useLocation} from 'react-router'
import {ToastContainer} from 'react-toastify'
import {ToastCloseButton} from '../../components'
import {ALL_COMPONENTS} from '../manifest'
import {GithubStars} from './GithubStars'
import {Sidebar} from './Sidebar'
import {TableOfContents} from './TableOfContents'
import classes from './layout.module.css'
import type {ToastCloseButtonProps} from '../../components/toasts/types'

export function Layout() {
  const {pathname} = useLocation()
  const [navOpen, setNavOpen] = React.useState(false)

  // Close the mobile nav and reset scroll on every navigation.
  React.useEffect(() => {
    setNavOpen(false)
    window.scrollTo({top: 0})
  }, [pathname])

  const slug = pathname.startsWith('/components/') ? pathname.slice('/components/'.length) : null
  const current = slug ? ALL_COMPONENTS.find(c => c.slug === slug) : null

  return (
    <div className={classes.shell}>
      <div className={clsx(classes.sidebarWrap, navOpen && classes.sidebarWrapOpen)}>
        <Sidebar onNavigate={() => setNavOpen(false)} />
      </div>
      {navOpen && (
        <button
          type="button"
          className={classes.scrim}
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
        />
      )}

      <div className={classes.main}>
        <header className={classes.topbar}>
          <button
            type="button"
            className={classes.navToggle}
            onClick={() => setNavOpen(v => !v)}
            aria-label="Toggle navigation"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
          <nav className={clsx(classes.crumbs, 'zap-subcontent-medium')} aria-label="Breadcrumb">
            <span className={classes.crumbMuted}>Components</span>
            {current && (
              <>
                <span className={classes.crumbSep} aria-hidden>
                  /
                </span>
                <span>{current.title}</span>
              </>
            )}
          </nav>
          <div className={classes.topbarActions}>
            <NavLink
              className={({isActive}) =>
                clsx(
                  classes.topbarLink,
                  'zap-subcontent-medium',
                  isActive && classes.topbarLinkActive,
                )
              }
              to="/changelog"
            >
              Changelog
            </NavLink>
            <a
              className={clsx(classes.topbarLink, 'zap-subcontent-medium')}
              href={`${import.meta.env.BASE_URL}llms.txt`}
            >
              llms.txt
            </a>
            <GithubStars />
          </div>
        </header>

        <div className={classes.body}>
          <main
            className={clsx(
              classes.content,
              slug === 'table' && classes.contentWide,
              pathname === '/' && classes.contentHome,
            )}
          >
            <Outlet />
          </main>
          {current && <TableOfContents slug={current.slug} />}
        </div>
      </div>

      {createPortal(
        <ToastContainer
          pauseOnFocusLoss={false}
          closeButton={({closeToast}: ToastCloseButtonProps) => (
            <ToastCloseButton closeToast={closeToast} />
          )}
        />,
        document.body,
      )}
    </div>
  )
}
