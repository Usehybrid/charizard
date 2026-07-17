import clsx from 'clsx'
import {NavLink} from 'react-router'
import {CATEGORIES} from '../manifest'
import {pageLoader} from '../page-modules'
import classes from './layout.module.css'

export function Sidebar() {
  return (
    <aside className={classes.sidebar}>
      <NavLink to="/" className={classes.brand}>
        <span className={classes.brandMark}>🔥</span>
        <span>
          <strong>Charizard</strong>
          <em className={classes.brandSub}>ZenAdmin Design System</em>
        </span>
      </NavLink>

      <nav className={classes.nav}>
        {CATEGORIES.map(category => (
          <div key={category.name} className={classes.group}>
            <div className={classes.groupTitle}>{category.name}</div>
            {category.entries.map(entry => (
              <NavLink
                key={entry.slug}
                to={`/components/${entry.slug}`}
                className={({isActive}) => clsx(classes.link, isActive && classes.linkActive)}
              >
                {entry.title}
                {!pageLoader(entry.slug) && <span className={classes.soon}>soon</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
