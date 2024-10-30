// TableCheckbox.tsx
import * as React from 'react'
import classes from './styles.module.css'
import clsx from 'clsx'
import {CHECKBOX_COL_ID} from '../constants'
import type {Row} from '@tanstack/react-table'

export function TableCheckbox({
  indeterminate,
  row,
  isHeader,
  ...rest
}: {
  indeterminate: boolean
  row: Row<unknown>
  setSelectedRows?: any
  isHeader?: boolean
} & React.HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <span
      className={clsx(classes.checkboxSpan, indeterminate && classes.indeterminate)}
      style={{display: isHeader ? 'flex' : undefined}}
    >
      <input
        type="checkbox"
        ref={ref}
        className={clsx(
          classes.checkbox,
          row.id === CHECKBOX_COL_ID && classes.checkboxSelect,
          indeterminate && classes.indeterminateInput,
        )}
        {...rest}
      />
    </span>
  )
}
