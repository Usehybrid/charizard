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
  [PILL_STATUS.NEUTRAL]: {bg: 'var(--surface-muted)', color: 'var(--text-primary)'},
  [PILL_STATUS.DEFAULT]: {bg: 'var(--fill-selection)', color: 'var(--action-text)'},
  [PILL_STATUS.POSITIVE]: {
    bg: 'var(--feedback-success-bg)',
    color: 'var(--feedback-success-text)',
  },
  [PILL_STATUS.HIGHLIGHT]: {bg: 'var(--feedback-info-bg)', color: 'var(--feedback-info-text)'},
  [PILL_STATUS.WARNING]: {
    bg: 'var(--feedback-warning-bg)',
    color: 'var(--feedback-warning-text)',
  },
  [PILL_STATUS.NEGATIVE]: {bg: 'var(--feedback-error-bg)', color: 'var(--feedback-error-text)'},
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
