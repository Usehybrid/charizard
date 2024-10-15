import clsx from 'clsx'
import classes from './styles.module.css'
import {InputIconProps, INPUT_COMPONENTS} from './types'
import {SVG} from '../svg'

/**
 * InputLeftIcon renders an icon on the left side of an input field.
 * If `onClick` is provided, the icon is rendered as a button.
 *
 * @param {InputIconProps} props - The properties for the InputLeftIcon component.
 * @param {string} props.icon - The SVG path for the icon to display.
 * @param {() => void} [props.onClick] - Optional click handler for the icon. When provided, the icon is rendered as a button.
 * @param {React.CSSProperties} [props.iconStyles] - Optional inline styles to apply to the icon.
 * @param {boolean} [props.disabled=false] - Whether the icon or button is disabled.
 * @param {string} [props.className] - Additional class names to apply to the icon container.
 *
 * @returns {JSX.Element} The rendered InputLeftIcon component.
 *
 * @example
 *  <InputGroupV2>
 *   <InputLeftIcon icon={...} />
 *   <InputV2 />
 * </InputGroupV2>
 */
export function InputLeftIcon({
  icon,
  onClick,
  iconStyles,
  disabled = false,
  className = '',
  svgClassName = '',
  spanClassName = '',
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
          spanClassName={clsx(classes.inputIconWrapper, spanClassName)}
          svgClassName={clsx(classes.inputIcon, svgClassName)}
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
        spanClassName,
        disabled && classes.disabled,
      )}
      svgClassName={clsx(classes.inputIcon, svgClassName)}
      customSpanStyles={iconStyles}
    />
  )
}

/**
 * InputRightIcon renders an icon on the right side of an input field.
 * If `onClick` is provided, the icon is rendered as a button.
 *
 * @param {InputIconProps} props - The properties for the InputRightIcon component.
 * @param {string} props.icon - The SVG path for the icon to display.
 * @param {() => void} [props.onClick] - Optional click handler for the icon. When provided, the icon is rendered as a button.
 * @param {React.CSSProperties} [props.iconStyles] - Optional inline styles to apply to the icon.
 * @param {boolean} [props.disabled=false] - Whether the icon or button is disabled.
 * @param {string} [props.className] - Additional class names to apply to the icon container.
 *
 * @returns {JSX.Element} The rendered InputRightIcon component.
 *
 * @example
 *  <InputGroupV2>
 *   <InputV2 />
 *   <InputRightIcon icon={...} />
 * </InputGroupV2>
 */
export function InputRightIcon({
  icon,
  onClick,
  iconStyles,
  disabled = false,
  className = '',
  svgClassName = '',
  spanClassName = '',
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
          spanClassName={clsx(classes.inputIconWrapper, spanClassName)}
          svgClassName={clsx(classes.inputIcon, svgClassName)}
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
        spanClassName,
        disabled && classes.disabled,
      )}
      svgClassName={clsx(classes.inputIcon, svgClassName)}
      customSpanStyles={iconStyles}
    />
  )
}

InputLeftIcon.displayName = INPUT_COMPONENTS.LEFT_ICON
InputRightIcon.displayName = INPUT_COMPONENTS.RIGHT_ICON
