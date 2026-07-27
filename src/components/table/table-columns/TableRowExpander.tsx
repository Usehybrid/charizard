import clsx from 'clsx'
import chevronRight from '../../assets/chevron-right.svg'
import classes from './styles.module.css'
import {SVG} from '../../svg'
import type {Row} from '@tanstack/react-table'

interface TableRowExpanderProps {
  row: Row<any>
  /** Accessible label prefix, e.g. "order" → "Expand order" / "Collapse order". */
  entityName?: string
}

/**
 * Expand/collapse toggle for a parent row. Renders nothing for rows that have no
 * sub-rows, so a single-item order doesn't get a control that does nothing.
 */
export function TableRowExpander({row, entityName}: TableRowExpanderProps) {
  if (!row.getCanExpand()) return <span className={classes.expanderPlaceholder} />

  const isExpanded = row.getIsExpanded()
  const label = `${isExpanded ? 'Collapse' : 'Expand'} ${entityName || 'row'}`

  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={isExpanded}
      title={label}
      className={clsx('zap-reset-btn', classes.expander)}
      onClick={event => {
        /* Rows can be clickable in a consumer's cell — don't trigger both. */
        event.stopPropagation()
        row.toggleExpanded()
      }}
    >
      <SVG
        path={chevronRight}
        width={14}
        height={14}
        svgClassName={clsx(classes.expanderIcon, isExpanded && classes.expanderIconOpen)}
      />
    </button>
  )
}
