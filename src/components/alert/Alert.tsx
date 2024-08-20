import * as React from 'react'
import {AlertPropTypes} from './types'
import classes from './styles.module.css'
import clsx from 'clsx'

export enum ALERT_TYPES {
  DEFAULT = 'default',
  POSITIVE = 'positive',
}

export enum ALERT_ACTION_TYPES {
  CLOSE = 'close',
  SHOW_MORE = 'show-more',
}

const Images = {
  Info: new URL('../assets/info.svg', import.meta.url).href,
  Success: new URL('../assets/success.svg', import.meta.url).href,
  Close: new URL('../assets/close.svg', import.meta.url).href,
  Down: new URL('../assets/chevron-down.svg', import.meta.url).href,
  Up: new URL('../assets/chevron-up.svg', import.meta.url).href,
}

export function Alert({alertType, actionType, header, body}: AlertPropTypes) {
  const [hideAlert, setHideAlert] = React.useState(false)
  const [showDropdown, setShowDropdown] = React.useState(false)

  return (
    <div
      className={classes.alert}
      style={{
        backgroundColor: alertTypeMap[alertType].bg,
        borderColor: alertTypeMap[alertType].color,
        gap: actionType === ALERT_ACTION_TYPES.SHOW_MORE && !showDropdown ? 0 : '16px',
        display: hideAlert ? 'none' : 'flex',
        opacity: actionType === ALERT_ACTION_TYPES.SHOW_MORE && !showDropdown ? '0.5' : '1',
      }}
    >
      <div className={classes.alertHeader}>
        <div className={classes.icons}>
          <img
            style={{
              fill: alertTypeMap[alertType].color,
              width: '16px',
              height: '16px',
            }}
            src={alertTypeMap[alertType].icon}
          />
        </div>
        <div style={{color: alertTypeMap[alertType].color}}>{header}</div>
        <div className={classes.icons}>
          <img
            style={{
              width: '16px',
              height: '16px',
            }}
            onClick={() => {
              if (actionType === ALERT_ACTION_TYPES.CLOSE) setHideAlert(true)
              else setShowDropdown(e => !e)
            }}
            src={
              actionType === ALERT_ACTION_TYPES.CLOSE
                ? Images.Close
                : showDropdown
                  ? Images.Up
                  : Images.Down
            }
          />
        </div>
      </div>
      {actionType === ALERT_ACTION_TYPES.SHOW_MORE && (
        <div className={clsx(classes.dividerSection, {[classes.open]: showDropdown})}>
          <div className={classes.divider}></div>
        </div>
      )}
      {actionType === ALERT_ACTION_TYPES.SHOW_MORE ? (
        <div className={clsx(classes.alertDropDownBody, {[classes.open]: showDropdown})}>
          <div></div>
          <div>{body}</div>
          <div></div>
        </div>
      ) : (
        <div className={classes.alertBody}>
          <div></div>
          <div>{body}</div>
          <div></div>
        </div>
      )}
    </div>
  )
}

export const alertTypeMap: {
  [key: string]: {bg: string; color: string; icon: string}
} = {
  [ALERT_TYPES.DEFAULT]: {bg: 'var(--p-p10)', color: 'var(--p-p50)', icon: Images.Info},
  [ALERT_TYPES.POSITIVE]: {
    bg: 'var(--status-success-s10)',
    color: 'var(--status-success-s70)',
    icon: Images.Success,
  },
}
