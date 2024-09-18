import * as React from 'react'
import classes from './styles.module.css'
import clsx from 'clsx'
import {SVG} from '../svg'
import info from '../assets/info.svg'
import success from '../assets/success.svg'
import error from '../assets/toasts/error.svg'
import warning from '../assets/toasts/warning.svg'
import close from '../assets/close.svg'
import down from '../assets/chevron-down.svg'
import up from '../assets/chevron-up.svg'

export enum ALERT_TYPES {
  DEFAULT = 'default',
  NEUTRAL = 'neutral',
  POSITIVE = 'positive',
  WARNING = 'warning',
  NEGATIVE = 'negative',
  HIGHLIGHT = 'highlight',
}

export enum ALERT_ACTION_TYPES {
  CLOSE = 'close',
  SHOW_MORE = 'show-more',
}

interface AlertPropTypes {
  alertType: string
  actionType: string
  header: React.ReactNode
  body?: React.ReactNode
  hide?: boolean
  setHide?: React.Dispatch<React.SetStateAction<boolean>>
  showMore?: boolean
  setShowMore?: React.Dispatch<React.SetStateAction<boolean>>
}

export function Alert({
  alertType,
  actionType,
  header,
  body,
  hide,
  setHide,
  showMore,
  setShowMore,
}: AlertPropTypes) {
  return (
    !hide && (
      <div
        className={classes.alert}
        style={{
          backgroundColor: alertTypeMap[alertType].bg,
          borderColor: alertTypeMap[alertType].color,
          gap: actionType === ALERT_ACTION_TYPES.SHOW_MORE && !showMore ? 0 : '16px',
          opacity: actionType === ALERT_ACTION_TYPES.SHOW_MORE && !showMore ? '0.5' : '1',
        }}
      >
        <div className={classes.alertHeader}>
          <div className={classes.icons}>
            <SVG
              path={alertTypeMap[alertType].icon}
              customSvgStyles={{
                width: '16px',
                height: '16px',
              }}
            />
          </div>
          <div style={{color: alertTypeMap[alertType].color}}>{header}</div>
          <div
            className={classes.icons}
            onClick={() => {
              if (actionType === ALERT_ACTION_TYPES.CLOSE && setHide) setHide(true)
              else if (setShowMore) setShowMore(e => !e)
            }}
          >
            <SVG
              customSvgStyles={{
                width: '16px',
                height: '16px',
                cursor: 'pointer'
              }}
              path={actionType === ALERT_ACTION_TYPES.CLOSE ? close : showMore ? up : down}
            />
          </div>
        </div>
        {actionType === ALERT_ACTION_TYPES.SHOW_MORE && showMore && (
          <>
            <div className={clsx(classes.dividerSection, {[classes.open]: showMore})}>
              <div className={classes.divider}></div>
            </div>
            <div className={clsx(classes.alertDropDownBody, {[classes.open]: showMore})}>
              <div></div>
              <div>{body}</div>
              <div></div>
            </div>
          </>
        )}
        {actionType === ALERT_ACTION_TYPES.CLOSE && body && (
          <div className={classes.alertBody}>
            <div></div>
            <div>{body}</div>
            <div></div>
          </div>
        )}
      </div>
    )
  )
}

export const alertTypeMap: {
  [key: string]: {bg: string; color: string; icon: string}
} = {
  [ALERT_TYPES.NEUTRAL]: {bg: 'var(--dark-d10)', color: 'var(--dark-d70)', icon: info},
  [ALERT_TYPES.DEFAULT]: {bg: 'var(--p-p10)', color: 'var(--p-p70)', icon: info},
  [ALERT_TYPES.POSITIVE]: {
    bg: 'var(--status-success-s10)',
    color: 'var(--status-success-s70)',
    icon: success,
  },
  [ALERT_TYPES.WARNING]: {
    bg: 'var(--status-warning-w10)',
    color: 'var(--status-warning-w70)',
    icon: warning,
  },
  [ALERT_TYPES.NEGATIVE]: {
    bg: 'var(--status-error-e10)',
    color: 'var(--status-error-e70)',
    icon: error,
  },
  [ALERT_TYPES.HIGHLIGHT]: {
    bg: 'var(--status-info-i10)',
    color: 'var(--status-info-i70)',
    icon: info,
  },
}
