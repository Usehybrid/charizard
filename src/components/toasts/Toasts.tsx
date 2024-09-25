import * as React from 'react'
import clsx from 'clsx'
import classes from './toasts.module.css'
import successIcon from '../assets/toasts/success.svg'
import errorIcon from '../assets/toasts/error.svg'
import warningIcon from '../assets/toasts/warning.svg'
import infoIcon from '../assets/toasts/info.svg'
import closeIcon from '../assets/close.svg'
import {toast, type ToastPosition, type Id, type ToastOptions} from 'react-toastify'
import {SVG} from '../svg'
import {ToastCloseButtonProps} from './types'

type IToastOptions = ToastOptions & CommonOptions
type ToastTypeArgs = {msg: string; info?: string; options?: IToastOptions}

type ToastType = ({msg, info, options}: ToastTypeArgs) => Id

const commonOptions = {
  position: 'top-right' as const,
  autoClose: 1800,
  hideProgressBar: true,
}

function ToastMessage({
  msg,
  info,
}: // type,
Pick<ToastTypeArgs, 'msg' | 'info'> & {type: 'success' | 'error' | 'warning' | 'info'}) {
  return (
    <div className={clsx(classes.toastMessageBox)}>
      <h4 className={clsx(classes.toastMessage, 'zap-content-medium')}>{msg}</h4>
      <p className={clsx(classes.toastInfo, 'zap-content-regular')}>{info}</p>
    </div>
  )
}

export const toastSuccess: ToastType = ({msg, info, options}) => {
  return toast.success(<ToastMessage {...{msg, info, type: 'success'}} />, {
    ...commonOptions,
    icon: (
      <SVG
        path={successIcon}
        svgClassName={clsx(classes.icon, classes.success)}
        spanClassName={classes.iconSpan}
      />
    ),
    ...options,
  })
}

export const toastError: ToastType = ({msg, info, options}) =>
  toast.error(<ToastMessage {...{msg, info, type: 'error'}} />, {
    ...commonOptions,
    icon: (
      <SVG
        path={errorIcon}
        svgClassName={clsx(classes.icon, classes.error)}
        spanClassName={classes.iconSpan}
      />
    ),
    ...options,
  })

export const toastInfo: ToastType = ({msg, info, options}) =>
  toast.info(<ToastMessage {...{msg, info, type: 'info'}} />, {
    ...commonOptions,
    icon: (
      <SVG
        path={infoIcon}
        svgClassName={clsx(classes.icon, classes.info)}
        spanClassName={classes.iconSpan}
      />
    ),
    ...options,
  })

export const toastWarning: ToastType = ({msg, info, options}) =>
  toast.warning(<ToastMessage {...{msg, info, type: 'warning'}} />, {
    ...commonOptions,
    icon: (
      <SVG
        path={warningIcon}
        svgClassName={clsx(classes.icon, classes.warning)}
        spanClassName={classes.iconSpan}
      />
    ),
    ...options,
  })

export function ToastCloseButton({closeToast}: ToastCloseButtonProps) {
  return (
    <button className={classes.closeToastBtn} onClick={closeToast}>
      <SVG
        path={closeIcon}
        svgClassName={classes.closeIcon}
        spanClassName={classes.closeIconSpan}
      />
    </button>
  )
}

interface CommonOptions {
  /**
   * Set the delay in ms to close the toast automatically.
   * Use `false` to prevent the toast from closing.
   * `Default: 5000`
   */
  autoClose?: number | false
  /**
   * Set the default position to use.
   * `One of: 'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'`
   * `Default: 'top-right'`
   */
  position?: ToastPosition
  /**
   * Set id to handle multiple container
   */
  containerId?: Id
  /**
   * Fired when clicking inside toaster
   */
  onClick?: (event: React.MouseEvent) => void
}
