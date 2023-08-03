/**
 * @author Soham Sarkar <soham@hybr1d.io>
 */

import * as React from 'react'
import classes from './styles.module.css'

export function TableCheckbox({
  indeterminate,
  row,
  ...rest
}: {indeterminate?: boolean; row?: any} & React.HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <span className={classes.checkboxSpan}>
      <input type="checkbox" ref={ref} className={classes.checkbox + ' cursor-pointer'} {...rest} />
    </span>
  )
}
