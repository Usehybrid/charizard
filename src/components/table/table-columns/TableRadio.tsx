/**
 * @author Soham Sarkar <soham@hybr1d.io>
 */

import * as React from 'react'
import classes from './styles.module.css'
import clsx from 'clsx'
import {CHECKBOX_COL_ID} from '../constants'
import type {Row} from '@tanstack/react-table'

export function TableRadio({
  indeterminate,
  row,
  ...rest
}: {
  indeterminate: boolean
  row: Row<unknown>
  setSelectedRows?: any
} & React.HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <span className={classes.checkboxSpan}>
      <input
        type="radio"
        ref={ref}
        className={clsx(classes.checkbox, row.id === CHECKBOX_COL_ID && classes.checkboxSelect)}
        {...rest}
      />
    </span>
  )
}
