import * as React from 'react'
import clsx from 'clsx'
import infoCircleIcon from '../assets/info-circle.svg'
import classes from './styles.module.css'
import {Inputs} from './types'
import {SVG} from '../svg'
import {Tooltip, TooltipContent, TooltipTrigger} from '../tooltip'

interface InputLabelProps {
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
}

export function InputLabel({
  children,
  customClasses,
  customStyles,
  required = false,
  htmlFor,
  restprops = {},
  infoText,
}: InputLabelProps) {
  // const tooltipId = React.useId()

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
        <Tooltip tooltipId={'infotext-tooltip'}>
          <TooltipTrigger>
            <SVG path={infoCircleIcon} svgClassName={classes.infoCircleSvg} />
          </TooltipTrigger>
          <TooltipContent>{infoText}</TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

InputLabel.displayName = Inputs.INPUT_LABEL
InputLabel.id = Inputs.INPUT_LABEL
