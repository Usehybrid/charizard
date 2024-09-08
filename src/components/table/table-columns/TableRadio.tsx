import * as React from 'react'
import classes from './styles.module.css'
import clsx from 'clsx'
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

  // React.useEffect(() => {
  //   if (typeof indeterminate === 'boolean') {
  //     ref.current.indeterminate = !rest.checked && indeterminate
  //   }
  // }, [ref, indeterminate])

  React.useEffect(() => {
    ref.current.indeterminate = indeterminate
  }, [ref, indeterminate])

  return (
    <span className={classes.radioSpan}>
      <input
        type="radio"
        ref={ref}
        // className={clsx(classes.radio, row.id === RADIO_COL_ID && classes.checkboxSelect)}
        className={clsx(classes.radio)}
        {...rest}
      />
    </span>
  )
}
