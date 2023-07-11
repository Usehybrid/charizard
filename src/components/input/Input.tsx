import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.scss'
import {HTMLInputTypeAttribute} from 'react'
import {Inputs} from './types'

interface InputProps {
  /**
   * Custom classes to be applied to the input
   */
  customClasses?: string[] | string
  /**
   * Custom styles to be applied to the input
   */
  customStyles?: Record<string, string>
  /**
   * Type of the input
   */
  type?: HTMLInputTypeAttribute | 'textarea'
  /**
   * Placeholder of the input
   */
  placeholder?: string
  /**
   * Name of the input
   */
  name?: string
  /**
   * Id of the input
   */
  id?: string
  /**
   * Value of the input
   */
  value?: string | number
  /**
   * On change handler of the input
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, arg?: any) => void
  /**
   * whether the input is disabled or not
   */
  disabled?: boolean
  /**
   * Rest props of the input
   */
  restprops?: any
  /**
   * Number of rows of the textarea
   */
  rows?: number
  /**
   * Number of cols of the textarea
   */
  cols?: number
  /**
   * Error message of the input
   */
  errorMsg?: string | false
}

export function Input({
  customClasses,
  customStyles,
  name,
  id,
  value,
  onChange,
  restprops,
  cols,
  errorMsg,
  disabled = false,
  rows = 2,
  type = 'text',
  placeholder = 'Placeholder',
}: InputProps) {
  // ref to show picker
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <div className={classes.inputWrapper}>
      {type === 'textarea' ? (
        <textarea
          rows={rows}
          cols={cols}
          style={customStyles}
          className={clsx(classes.textarea, errorMsg && classes.error, customClasses)}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...restprops}
        ></textarea>
      ) : (
        <input
          ref={inputRef}
          style={customStyles}
          type={type}
          className={clsx(classes.input, errorMsg && classes.error, customClasses)}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onClick={() => inputRef.current?.showPicker()}
          {...restprops}
        />
      )}
      {errorMsg && <p className={classes.errorMsg}>{errorMsg}</p>}
    </div>
  )
}

Input.displayName = Inputs.INPUT
Input.id = Inputs.INPUT
