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

interface BaseBadgeProps {
  highlight?: BADGE_HIGHLIGHT
  status?: BADGE_STATUS
  children: React.ReactNode
}

interface IconBadgeProps extends BaseBadgeProps {
  icon: string
  customSvgStyles?: React.CSSProperties
}

interface NonIconBadgeProps extends BaseBadgeProps {
  icon?: never
  customSvgStyles?: never
}

interface SelectableBadgeProps extends BaseBadgeProps {
  selected: true
  onClick: () => void
}

interface NonSelectableBadgeProps extends BaseBadgeProps {
  selected?: false
  onClick?: never
}

type BadgeProps = (IconBadgeProps | NonIconBadgeProps) &
  (SelectableBadgeProps | NonSelectableBadgeProps)

export function Badge({
  highlight = BADGE_HIGHLIGHT.NONE,
  status = BADGE_STATUS.DEFAULT,
  selected = false,
  children,
  icon,
  customSvgStyles = {},
  onClick,
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
          <img
            style={{
              fill: statusMap[status].color,
              width: '20px',
              height: '20px',
              ...customSvgStyles,
            }}
            src={icon}
          />
        ) : (
          <SVG
            path={icon as string}
            customSvgStyles={{
              fill: statusMap[status].color,
              width: '20px',
              height: '20px',
              ...customSvgStyles,
            }}
            customSpanStyles={{marginLeft: '-2px'}}
          />
        )
      ) : null}
      {children}
      {selected && (
        <div onClick={onClick}>
          <SVG path={multiplyIcon} svgClassName={classes.icon} />
        </div>
      )}
    </div>
  )
}

export const statusMap = {
  [BADGE_STATUS.NEUTRAL]: {bg: 'var(--surface-muted)', color: 'var(--text-primary)'},
  [BADGE_STATUS.DEFAULT]: {bg: 'var(--fill-selection)', color: 'var(--action-text)'},
  [BADGE_STATUS.POSITIVE]: {
    bg: 'var(--feedback-success-bg)',
    color: 'var(--feedback-success-text)',
  },
  [BADGE_STATUS.HIGHLIGHT]: {bg: 'var(--feedback-info-bg)', color: 'var(--feedback-info-text)'},
  [BADGE_STATUS.WARNING]: {
    bg: 'var(--feedback-warning-bg)',
    color: 'var(--feedback-warning-text)',
  },
  [BADGE_STATUS.NEGATIVE]: {bg: 'var(--feedback-error-bg)', color: 'var(--feedback-error-text)'},
}
