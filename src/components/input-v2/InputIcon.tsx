import clsx from 'clsx'
import classes from './styles.module.css'
import {InputIconProps, INPUT_COMPONENTS} from './types'
import {SVG} from '../svg'

export function InputLeftIcon({
  icon,
  onClick,
  iconStyles,
  disabled = false,
  className,
}: InputIconProps) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={clsx(
          'zap-reset-btn',
          classes.inputIconButton,
          classes.left,
          disabled && classes.disabled,
          className,
        )}
        style={iconStyles}
        disabled={disabled}
      >
        <SVG
          path={icon}
          spanClassName={classes.inputIconWrapper}
          svgClassName={classes.inputIcon}
        />
      </button>
    )
  }
  return (
    <SVG
      path={icon}
      spanClassName={clsx(
        classes.inputIconContainer,
        classes.leftIcon,
        disabled && classes.disabled,
      )}
      svgClassName={classes.inputIcon}
    />
  )
}

export function InputRightIcon({
  icon,
  onClick,
  iconStyles,
  disabled = false,
  className,
}: InputIconProps) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={clsx(
          'zap-reset-btn',
          classes.inputIconButton,
          classes.right,
          disabled && classes.disabled,
          className,
        )}
        style={iconStyles}
        disabled={disabled}
      >
        <SVG
          path={icon}
          spanClassName={classes.inputIconWrapper}
          svgClassName={classes.inputIcon}
        />
      </button>
    )
  }
  return (
    <SVG
      path={icon}
      spanClassName={clsx(
        classes.inputIconContainer,
        classes.rightIcon,
        disabled && classes.disabled,
      )}
      svgClassName={classes.inputIcon}
    />
  )
}

InputLeftIcon.displayName = INPUT_COMPONENTS.LEFT_ICON
InputRightIcon.displayName = INPUT_COMPONENTS.RIGHT_ICON
