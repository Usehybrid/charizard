import * as React from 'react'
import clsx from 'clsx'
import infoCircleIcon from '../assets/info-circle.svg'
import classes from './styles.module.css'
import {Inputs} from './types'
import {SVG} from '../svg'
import {Tooltip} from '../tooltip'

type InputLabelProps = {
  /**
   * Children of the input label
   */
  children: React.ReactNode
  /**
   * Custom classes to be applied to the input label
   */
  customClasses?: string[] | string
  /**
   * Custom styles to be applied to the input label
   */
  customStyles?: Record<string, string>
  /**
   * Whether the input is required
   */
  required?: boolean
  /**
   * htmlFor attribute of the input label
   */
  htmlFor?: string
  /**
   * Rest props to be applied to the input label
   */
  restprops?: any
  /**
   * info text
   */
  infoText?: string
  /**
   * info text tooltip styles
   */
  infoTextTooltipStyles?: React.CSSProperties
}

export function InputLabel({
  children,
  customClasses,
  customStyles,
  required = false,
  htmlFor,
  restprops = {},
  infoText,
  infoTextTooltipStyles = {},
}: InputLabelProps) {
  const tooltipId = React.useId()

  return (
    <div className={classes.inputLabelContainer}>
      <label
        htmlFor={htmlFor}
        className={clsx(classes.inputLabel, customClasses, required && classes.required)}
        style={customStyles}
        {...restprops}
      >
        <span>{children}</span>
      </label>
      {infoText && (
        <Tooltip>
          <Tooltip.Trigger>
            <SVG path={infoCircleIcon} svgClassName={classes.infoCircleSvg} />
          </Tooltip.Trigger>
          <Tooltip.Content positionerStyles={infoTextTooltipStyles}>{infoText}</Tooltip.Content>
        </Tooltip>
      )}
    </div>
  )
}

InputLabel.displayName = Inputs.INPUT_LABEL
InputLabel.id = Inputs.INPUT_LABEL
