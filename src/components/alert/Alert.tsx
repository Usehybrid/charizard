import * as React from 'react'
import classes from './styles.module.css'
import clsx from 'clsx'
import {SVG} from '../svg'
import info from '../assets/info.svg'
import success from '../assets/success.svg'
import close from '../assets/close.svg'
import down from '../assets/chevron-down.svg'
import up from '../assets/chevron-up.svg'

export enum ALERT_TYPES {
  DEFAULT = 'default',
  POSITIVE = 'positive',
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
}

export function Alert({alertType, actionType, header, body}: AlertPropTypes) {
  const [hideAlert, setHideAlert] = React.useState(false)
  const [showDropdown, setShowDropdown] = React.useState(false)

  React.useEffect(() => {
    setHideAlert(false)
  }, [header])

  return (
    !hideAlert && (
      <div
        className={classes.alert}
        style={{
          backgroundColor: alertTypeMap[alertType].bg,
          borderColor: alertTypeMap[alertType].color,
          gap: actionType === ALERT_ACTION_TYPES.SHOW_MORE && !showDropdown ? 0 : '16px',
          opacity: actionType === ALERT_ACTION_TYPES.SHOW_MORE && !showDropdown ? '0.5' : '1',
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
              if (actionType === ALERT_ACTION_TYPES.CLOSE) setHideAlert(true)
              else setShowDropdown(e => !e)
            }}
          >
            <SVG
              customSvgStyles={{
                width: '16px',
                height: '16px',
              }}
              path={actionType === ALERT_ACTION_TYPES.CLOSE ? close : showDropdown ? up : down}
            />
          </div>
        </div>
        {actionType === ALERT_ACTION_TYPES.SHOW_MORE && showDropdown && (
          <>
            <div className={clsx(classes.dividerSection, {[classes.open]: showDropdown})}>
              <div className={classes.divider}></div>
            </div>
            <div className={clsx(classes.alertDropDownBody, {[classes.open]: showDropdown})}>
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
  [ALERT_TYPES.DEFAULT]: {bg: 'var(--fill-selection)', color: 'var(--p-p50)', icon: info},
  [ALERT_TYPES.POSITIVE]: {
    bg: 'var(--status-success-s10)',
    color: 'var(--status-success-s70)',
    icon: success,
  },
}
