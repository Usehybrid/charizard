import clsx from 'clsx'
import classes from './styles.module.scss'
import {HTMLInputTypeAttribute} from 'react'
import {Inputs} from './types'

interface InputProps {
  customClasses?: string[] | string
  customStyles?: Record<string, string>
  type?: HTMLInputTypeAttribute | 'textarea'
  placeholder?: string
  name?: string
  id?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, arg?: any) => void
  disabled?: boolean
  restprops?: any
  rows?: number
  cols?: number
  errorMsg?: string
}

export function Input({
  customClasses,
  customStyles,
  type = 'text',
  placeholder = 'Placeholder',
  name,
  id,
  value,
  onChange,
  disabled = false,
  restprops,
  rows = 2,
  cols,
  errorMsg,
}: InputProps) {
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
          style={customStyles}
          type={type}
          className={clsx(classes.input, errorMsg && classes.error, customClasses)}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...restprops}
        />
      )}
      {errorMsg && <p className={classes.errorMsg}>{errorMsg}</p>}
    </div>
  )
}

Input.displayName = Inputs.INPUT
Input.id = Inputs.INPUT
