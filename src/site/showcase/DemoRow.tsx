import * as React from 'react'
import clsx from 'clsx'
import classes from './showcase.module.css'

interface DemoRowProps {
  /** Optional label rendered above the row's items. */
  label?: string
  /** Vertically centre the items instead of top-aligning them. */
  align?: 'top' | 'center'
  children: React.ReactNode
}

/** Horizontal row of variant examples; wraps on small screens. */
export function DemoRow({label, align = 'top', children}: DemoRowProps) {
  return (
    <div className={classes.rowWrap}>
      {label && <div className={clsx(classes.rowLabel, 'zap-caption-semibold')}>{label}</div>}
      <div className={clsx(classes.row, align === 'center' && classes.rowCentered)}>{children}</div>
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
      {label && <div className={clsx(classes.itemLabel, 'zap-subcontent-regular')}>{label}</div>}
    </div>
  )
}
