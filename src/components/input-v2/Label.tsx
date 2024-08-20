import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import {LabelPropsV2, INPUT_COMPONENTS} from './types'
import {TooltipV2} from '../tooltip-v2'
import {SVG} from '../svg'
import infoCircleIcon from '../assets/info-circle.svg'

export function LabelV2({
  className = '',
  info = '',
  disabled = false,
  required = false,
  tooltipProps = {},
  children,
  ...props
}: LabelPropsV2) {
  const id = React.useId()

  return (
    <label
      {...props}
      className={clsx(
        'zap-content-regular',
        classes.label,
        disabled && classes.disabled,
        className,
      )}
    >
      {children}
      {required && <span className={clsx('zap-content-medium ', classes.required)}>*</span>}
      {!!info && (
        <TooltipV2
          {...tooltipProps}
          id={id}
          trigger={
            <SVG
              path={infoCircleIcon}
              spanClassName={classes.infoIconContainer}
              svgClassName={classes.infoIcon}
            />
          }
          content={info}
        />
      )}
    </label>
  )
}

LabelV2.displayName = INPUT_COMPONENTS.LABEL
