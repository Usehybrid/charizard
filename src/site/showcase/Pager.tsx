import clsx from 'clsx'
import {Link} from 'react-router'
import {ALL_COMPONENTS} from '../manifest'
import {ArrowRightIcon} from './icons'
import classes from './pager.module.css'

/** Previous/next links in sidebar order, so the docs read front-to-back. */
export function Pager({slug}: {slug: string}) {
  const index = ALL_COMPONENTS.findIndex(c => c.slug === slug)
  if (index === -1) return null
  const previous = ALL_COMPONENTS[index - 1]
  const next = ALL_COMPONENTS[index + 1]

  return (
    <nav className={classes.root} aria-label="Pagination">
      {previous ? (
        <Link to={`/components/${previous.slug}`} className={clsx(classes.link, classes.previous)}>
          <span className={classes.reversed}>
            <ArrowRightIcon />
          </span>
          <span className={classes.text}>
            <span className={clsx(classes.label, 'zap-caption-semibold')}>Previous</span>
            <span className="zap-subcontent-semibold">{previous.title}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link to={`/components/${next.slug}`} className={clsx(classes.link, classes.next)}>
          <span className={classes.text}>
            <span className={clsx(classes.label, 'zap-caption-semibold')}>Next</span>
            <span className="zap-subcontent-semibold">{next.title}</span>
          </span>
          <ArrowRightIcon />
        </Link>
      )}
    </nav>
  )
}
