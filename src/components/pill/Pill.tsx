import * as React from 'react'
import clsx from 'clsx'
import classes from './pill.module.css'

export enum PILL_STATUS {
  DEFAULT = 'default',
  NEUTRAL = 'neutral',
  POSITIVE = 'positive',
  WARNING = 'warning',
  NEGATIVE = 'negative',
  HIGHLIGHT = 'highlight',
}

interface PillProps {
  status?: PILL_STATUS
  children: React.ReactNode
}

const statusMap = {
  [PILL_STATUS.NEUTRAL]: {bg: 'var(--dark-d10)', color: 'var(--dark-d70)'},
  [PILL_STATUS.DEFAULT]: {bg: 'var(--p-p10)', color: 'var(--p-p50)'},
  [PILL_STATUS.POSITIVE]: {bg: 'var(--status-success-s10)', color: 'var(--status-success-s70)'},
  [PILL_STATUS.HIGHLIGHT]: {bg: 'var(--status-info-i10)', color: 'var(--status-info-i70)'},
  [PILL_STATUS.WARNING]: {bg: 'var(--status-warning-w10)', color: 'var(--status-warning-w70)'},
  [PILL_STATUS.NEGATIVE]: {bg: 'var(--status-error-e10)', color: 'var(--status-error-e70)'},
}

export function Pill({status = PILL_STATUS.DEFAULT, children}: PillProps) {
  return (
    <div
      className={clsx(classes.box, 'zap-caption-medium')}
      style={{
        backgroundColor: statusMap[status].bg,
        color: statusMap[status].color,
      }}
    >
      {children}
    </div>
  )
}
