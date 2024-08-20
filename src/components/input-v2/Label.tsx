import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import {LabelPropsV2, INPUT_COMPONENTS} from './types'
import {TooltipV2} from '../tooltip-v2'
import {SVG} from '../svg'
import infoCircleIcon from '../assets/info-circle.svg'

/**
 * LabelV2 is a label component that can display additional information via a tooltip,
 * mark the field as required, and adjust styles based on the disabled state.
 *
 * @param {LabelPropsV2} props - The properties for the LabelV2 component.
 * @param {string} [props.className=''] - Additional class names to apply to the label element.
 * @param {string} [props.info=''] - Information text to be displayed in a tooltip. If provided, an info icon will appear next to the label.
 * @param {boolean} [props.disabled=false] - Whether the label and its associated input are disabled.
 * @param {boolean} [props.required=false] - Whether the associated input field is required. If true, an asterisk (*) will be displayed.
 * @param {object} [props.tooltipProps={}] - Optional props to pass to the TooltipV2 component.
 * @param {React.ReactNode} props.children - The content of the label, usually text.
 * @returns {JSX.Element} The rendered LabelV2 component.
 *
 * @example
 * <LabelV2 required info="This field is required">
 *   Username
 * </LabelV2>
 */
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
