import * as React from 'react'
import classes from './checkbox.module.css'
import clsx from 'clsx'

interface CheckboxProps {
  label: string
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}

export const CheckboxV2: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  return (
    <label className={classes.checkboxContainer}>
      {/* Hidden Checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        disabled={disabled}
        className={classes.hiddenCheckbox}
      />
      {/* Custom Checkbox */}
      <span
        className={classes.customCheckbox}
        data-checked={
          disabled ? undefined : indeterminate ? 'indeterminate' : checked ? 'true' : 'false'
        }
      />
      {/* Label */}
      <span className={clsx(classes.checkboxLabel, 'zap-content-medium')}>{label}</span>
    </label>
  )
}
