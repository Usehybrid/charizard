import * as React from 'react'
import classes from './showcase.module.css'

interface DemoRowProps {
  /** Optional label rendered above the row's items. */
  label?: string
  children: React.ReactNode
}

/** Horizontal row of variant examples; wraps on small screens. */
export function DemoRow({label, children}: DemoRowProps) {
  return (
    <div className={classes.rowWrap}>
      {label && <div className={classes.rowLabel}>{label}</div>}
      <div className={classes.row}>{children}</div>
    </div>
  )
}

interface DemoItemProps {
  label?: string
  children: React.ReactNode
}

/** Single labeled example inside a DemoRow. */
export function DemoItem({label, children}: DemoItemProps) {
  return (
    <div className={classes.item}>
      <div>{children}</div>
      {label && <div className={classes.itemLabel}>{label}</div>}
    </div>
  )
}
