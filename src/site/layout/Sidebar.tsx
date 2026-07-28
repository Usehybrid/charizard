import * as React from 'react'
import clsx from 'clsx'
import {NavLink} from 'react-router'
import {CATEGORIES} from '../manifest'
import {pageLoader} from '../page-modules'
import {SearchIcon} from '../showcase/icons'
// The README's mascot, reused rather than duplicated into src/.
import mascot from '../../../.github/assets/charizard.png'
import classes from './layout.module.css'

export function Sidebar({onNavigate}: {onNavigate?: () => void}) {
  const [query, setQuery] = React.useState('')
  const needle = query.trim().toLowerCase()

  const groups = CATEGORIES.map(category => ({
    ...category,
    entries: needle
      ? category.entries.filter(
          e =>
            e.title.toLowerCase().includes(needle) ||
            e.exports?.some(x => x.toLowerCase().includes(needle)),
        )
      : category.entries,
  })).filter(category => category.entries.length > 0)

  return (
    <aside className={classes.sidebar}>
      <NavLink to="/" className={classes.brand} onClick={onNavigate}>
        <img className={classes.brandMark} src={mascot} alt="" width={32} height={32} />
        <span className={classes.brandText}>
          <strong className="zap-content-semibold">Charizard UI</strong>
          <span className={clsx(classes.brandSub, 'zap-subcontent-regular')}>
            ZenAdmin Design System
          </span>
        </span>
      </NavLink>

      <div className={classes.filter}>
        <span className={classes.filterIcon}>
          <SearchIcon />
        </span>
        <input
          className={clsx(classes.filterInput, 'zap-subcontent-regular')}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Filter components"
          aria-label="Filter components"
        />
      </div>

      <nav className={classes.nav}>
        <NavLink
          to="/"
          end
          onClick={onNavigate}
          className={({isActive}) =>
            clsx(
              classes.link,
              classes.overviewLink,
              'zap-subcontent-medium',
              isActive && classes.linkActive,
            )
          }
        >
          Overview
        </NavLink>

        {groups.map(category => (
          <div key={category.name} className={classes.group}>
            <div className={clsx(classes.groupTitle, 'zap-caption-semibold')}>{category.name}</div>
            {category.entries.map(entry => (
              <NavLink
                key={entry.slug}
                to={`/components/${entry.slug}`}
                onClick={onNavigate}
                className={({isActive}) =>
                  clsx(classes.link, 'zap-subcontent-medium', isActive && classes.linkActive)
                }
              >
                {entry.title}
                {!pageLoader(entry.slug) && (
                  <span className={clsx(classes.soon, 'zap-caption-semibold')}>soon</span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
        {groups.length === 0 && (
          <p className={clsx(classes.noResults, 'zap-subcontent-regular')}>
            No component matches “{query}”.
          </p>
        )}
      </nav>
    </aside>
  )
}
