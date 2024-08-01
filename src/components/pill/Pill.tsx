import * as React from 'react'
import clsx from 'clsx'
import classes from './pill.module.css'
import {statusMap} from '../badge'

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
