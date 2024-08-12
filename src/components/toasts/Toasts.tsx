import 'react-toastify/dist/ReactToastify.css'
import * as React from 'react'
import clsx from 'clsx'
import classes from './toasts.module.css'
import successIcon from '../assets/toasts/success.svg'
import errorIcon from '../assets/toasts/error.svg'
import warningIcon from '../assets/toasts/warning.svg'
import infoIcon from '../assets/toasts/info.svg'
import closeIcon from '../assets/close.svg'
import {toast, Id, ToastOptions} from 'react-toastify'
import {SVG} from '../svg'
import {ToastCloseButtonProps} from './types'

type ToastType = ({msg, options}: {msg: string | React.ReactElement; options?: ToastOptions}) => Id

export const toastSuccess: ToastType = ({msg, options}) =>
  toast.success(msg, {
    position: 'top-right',
    autoClose: 1800,
    ...options,
    icon: (
      <SVG
        path={successIcon}
        svgClassName={clsx(classes.icon, classes.success)}
        spanClassName={classes.iconSpan}
      />
    ),
  })

export const toastError: ToastType = ({msg, options}) =>
  toast.error(msg, {
    position: 'top-right',
    autoClose: 1800,
    ...options,
    icon: (
      <SVG
        path={errorIcon}
        svgClassName={clsx(classes.icon, classes.error)}
        spanClassName={classes.iconSpan}
      />
    ),
  })

export const toastInfo: ToastType = ({msg, options}) =>
  toast.info(msg, {
    position: 'top-right',
    autoClose: 1800,
    ...options,
    icon: (
      <SVG
        path={infoIcon}
        svgClassName={clsx(classes.icon, classes.info)}
        spanClassName={classes.iconSpan}
      />
    ),
  })

export const toastWarning: ToastType = ({msg, options}) =>
  toast.warning(msg, {
    position: 'top-right',
    autoClose: 1800,
    ...options,
    icon: (
      <SVG
        path={warningIcon}
        svgClassName={clsx(classes.icon, classes.warning)}
        spanClassName={classes.iconSpan}
      />
    ),
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
