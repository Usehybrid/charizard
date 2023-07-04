import clsx from 'clsx'
import classes from './styles.module.scss'
import {Inputs} from './types'

interface InputLabelProps {
  children: React.ReactNode
  customClasses?: string[] | string
  customStyles?: Record<string, string>
  required?: boolean
  htmlFor?: string
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
