import * as React from 'react'
import classes from './styles.module.css'
import Tick from './assets/Tick.svg'
import Cross from './assets/Cross.svg'
import {SVG} from '../svg'

export enum STATUS_STATUS {
  DISABLED = 'disabled',
  ENABLED = 'enabled',
  INFO = 'info',
  WARNING = 'warning',
  NODATA = 'no-data',
  CANCEL = 'cancel',
  DONE = 'done',
}

const statusMap = {
  [STATUS_STATUS.DISABLED]: {bg: 'var(--dark-d70)', icon: ''},
  [STATUS_STATUS.ENABLED]: {bg: 'var(--status-success-s50)', icon: ''},
  [STATUS_STATUS.INFO]: {bg: 'var(--p-p50)', icon: ''},
  [STATUS_STATUS.WARNING]: {bg: 'var(--status-warning-w50)', icon: ''},
  [STATUS_STATUS.NODATA]: {bg: 'var(--status-error-e50)', icon: ''},
  [STATUS_STATUS.CANCEL]: {bg: 'var(--p-p70)', icon: Cross},
  [STATUS_STATUS.DONE]: {bg: 'var(--p-p70)', icon: Tick},
}

interface StatusProps {
  status?: STATUS_STATUS
  children: React.ReactNode
}

export function Status({status = STATUS_STATUS.INFO, children}: StatusProps) {
  return (
    <div className={classes.statusContainer}>
      {[STATUS_STATUS.CANCEL, STATUS_STATUS.DONE].includes(status) ? (
        <SVG
          path={statusMap[status].icon}
          customSvgStyles={{
            width: '16px',
            height: '16px',
          }}
        />
      ) : (
        <span className={classes.dot} style={{backgroundColor: statusMap[status].bg}} />
      )}
      {children}
    </div>
  )
}
