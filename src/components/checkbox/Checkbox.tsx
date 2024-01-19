import clsx from 'clsx'
import classes from './styles.module.css'

interface CheckboxProps {
  /**
   * Checkbox id
   */
  id: string
  /**
   * Checkbox name
   */
  name: string
  /**
   * children
   */
  children: React.ReactNode
  /**
   * handle checkbox clicked
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * custom classes
   */
  customClasses?: string
  /**
   * custom styles
   */
  customStyles?: React.CSSProperties
  /**
   * error message
   */
  errorMsg?: string
  /**
   * Checkbox checked
   */
  checked?: boolean
  /**
   * Checkbox indeterminate state
   */
  indeterminate?: boolean
  /**
   * Checkbox disabled
   */
  disabled?: boolean
}

export function Checkbox({
  id,
  name,
  children,
  onChange,
  customClasses,
  customStyles,
  errorMsg,
  checked = false,
  indeterminate = false,
  disabled = false,
}: CheckboxProps) {
  return (
    <>
      <label
        className={clsx(classes.checkbox, {[classes.disabled]: disabled}, customClasses)}
        style={customStyles}
        htmlFor={id}
      >
        <input
          type="checkbox"
          checked={checked}
          className={classes.checkboxInput}
          name={name}
          id={id}
          onChange={onChange}
          disabled={disabled}
        />
        <div
          className={clsx(
            classes.checkboxBox,
            {[classes.indeterminate]: indeterminate},
            {[classes.error]: errorMsg},
            {[classes.disabled]: disabled},
          )}
        ></div>
        <span>{children}</span>
      </label>
      {errorMsg && <p className={classes.errorMsg}>{errorMsg}</p>}
    </>
  )
}
