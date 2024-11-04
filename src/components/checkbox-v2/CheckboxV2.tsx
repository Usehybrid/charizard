import * as React from 'react'
import {useEffect, useRef} from 'react'
import classes from './checkbox.module.css'
import clsx from 'clsx'

interface CheckboxProps {
  label: string
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
  className?: string
}

export function CheckboxV2({
  label,
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  className,
}: CheckboxProps) {
  const checkboxRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked)
    }
  }

  return (
    <label className={clsx(classes.checkboxContainer, disabled && classes.disabled, className)}>
      <input
        ref={checkboxRef}
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        disabled={disabled}
        className={classes.hiddenCheckbox}
      />
      <span
        className={clsx(classes.customCheckbox, disabled && classes.disabledCheckbox)}
        data-state={indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'}
      />
      <span
        className={clsx(
          classes.checkboxLabel,
          'zap-content-medium',
          disabled && classes.disabledLabel,
        )}
      >
        {label}
      </span>
    </label>
  )
}
