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
   * Checkbox checked
   */
  checked?: boolean
  /**
   * Checkbox indeterminate state
   */
  indeterminate?: boolean
}

export function Checkbox({
  id,
  name,
  children,
  onChange,
  checked = false,
  indeterminate = false,
}: CheckboxProps) {
  return (
    <label className={classes.checkbox} htmlFor={id}>
      <input
        type="checkbox"
        checked={checked}
        className={classes.checkboxInput}
        name={name}
        id={id}
        onChange={onChange}
      />
      <div className={clsx(classes.checkboxBox, {[classes.indeterminate]: indeterminate})}></div>
      <span>{children}</span>
    </label>
  )
}
