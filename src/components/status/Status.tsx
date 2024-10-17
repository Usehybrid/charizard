import * as React from 'react'
import classes from './styles.module.css'

export enum STATUS_STATUS {
  DISABLED = 'disabled',
  ENABLED = 'enabled',
  INFO = 'info',
  WARNING = 'warning',
  NODATA = 'no-data',
}

const statusMap = {
  [STATUS_STATUS.DISABLED]: {bg: 'var(--dark-d70)'},
  [STATUS_STATUS.ENABLED]: {bg: 'var(--status-success-s50)'},
  [STATUS_STATUS.INFO]: {bg: 'var(--p-p50)'},
  [STATUS_STATUS.WARNING]: {bg: 'var(--status-warning-w50)'},
  [STATUS_STATUS.NODATA]: {bg: 'var(--status-error-e50)'},
}

interface StatusProps {
  status?: STATUS_STATUS
  children: React.ReactNode
}

export function Status({status = STATUS_STATUS.INFO, children}: StatusProps) {
  return (
    <div className={classes.statusContainer}>
      <span className={classes.dot} style={{backgroundColor: statusMap[status].bg}} />
      {children}
    </div>
  )
}
