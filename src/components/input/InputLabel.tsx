import clsx from 'clsx'
import classes from './styles.module.css'
import {Inputs} from './types'

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
}

export function InputLabel({
  children,
  customClasses,
  customStyles,
  required = false,
  htmlFor,
  restprops,
}: InputLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(classes.inputLabel, customClasses, required && classes.required)}
      style={customStyles}
      {...restprops}
    >
      {children}
    </label>
  )
}

InputLabel.displayName = Inputs.INPUT_LABEL
InputLabel.id = Inputs.INPUT_LABEL
