import * as React from 'react'
import clsx from 'clsx'
import multiplyIcon from '../assets/multiply.svg'
import classes from './badge.module.css'
import {SVG} from '../svg'

export enum BADGE_STATUS {
  DEFAULT = 'default',
  NEUTRAL = 'neutral',
  POSITIVE = 'positive',
  WARNING = 'warning',
  NEGATIVE = 'negative',
  HIGHLIGHT = 'highlight',
}

export enum BADGE_HIGHLIGHT {
  ICON = 'icon',
  DOT = 'dot',
  NONE = 'none',
}

interface BadgeProps {
  highlight?: BADGE_HIGHLIGHT
  status?: BADGE_STATUS
  selected?: boolean
  children: React.ReactNode
  icon?: string
}

export function Badge({
  highlight = BADGE_HIGHLIGHT.NONE,
  status = BADGE_STATUS.DEFAULT,
  selected = false,
  children,
  icon,
}: BadgeProps) {
  const isCDNIcon = icon ? icon.includes('https://') : false

  return (
    <div
      className={clsx(classes.box, 'zap-caption-medium')}
      style={{
        backgroundColor: statusMap[status].bg,
        color: statusMap[status].color,
      }}
    >
      {highlight === BADGE_HIGHLIGHT.DOT && (
        <span className={classes.dot} style={{backgroundColor: statusMap[status].color}} />
      )}
      {highlight === BADGE_HIGHLIGHT.ICON && icon ? (
        isCDNIcon ? (
          <img style={{fill: statusMap[status].color, width: '20px', height: '20px'}} src={icon} />
        ) : (
          <SVG
            path={icon as string}
            customSvgStyles={{fill: statusMap[status].color, width: '20px', height: '20px'}}
            customSpanStyles={{marginLeft: '-2px'}}
          />
        )
      ) : null}
      {children}
      {selected && <SVG path={multiplyIcon} svgClassName={classes.icon} />}
    </div>
  )
}

export const statusMap = {
  [BADGE_STATUS.NEUTRAL]: {bg: 'var(--dark-d10)', color: 'var(--dark-d70)'},
  [BADGE_STATUS.DEFAULT]: {bg: 'var(--p-p10)', color: 'var(--p-p70)'},
  [BADGE_STATUS.POSITIVE]: {bg: 'var(--status-success-s10)', color: 'var(--status-success-s70)'},
  [BADGE_STATUS.HIGHLIGHT]: {bg: 'var(--status-info-i10)', color: 'var(--status-info-i70)'},
  [BADGE_STATUS.WARNING]: {bg: 'var(--status-warning-w10)', color: 'var(--status-warning-w70)'},
  [BADGE_STATUS.NEGATIVE]: {bg: 'var(--status-error-e10)', color: 'var(--status-error-e70)'},
}
