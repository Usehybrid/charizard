import * as React from 'react'
import * as checkbox from '@zag-js/checkbox'
import clsx from 'clsx'
import classes from './table-custom-cols.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'

interface GroupedCustomColCheckboxProps {
  id: string
  label: string
  checked: boolean
  disabled?: boolean
  onCheckChange: (checked: boolean) => void
}

export default function GroupedCustomColCheckbox({
  //   id,
  label,
  checked,
  onCheckChange,
  disabled = false,
}: GroupedCustomColCheckboxProps) {
  const onCheckedChange = React.useCallback(
    (details: {checked: boolean}) => {
      onCheckChange(!!details.checked)
    },
    [onCheckChange],
  )

  const [state, send] = useMachine(
    checkbox.machine({
      id: React.useId(),
      disabled,
      checked,
      onCheckedChange,
    }),
  )
  const api = checkbox.connect(state, send, normalizeProps)

  // Keep checkbox state in sync with parent
  React.useEffect(() => {
    api.setChecked(checked)
  }, [checked, api])

  return (
    <label
      {...api.getRootProps()}
      className={clsx(classes.optionLabel, disabled && classes.optionDis)}
    >
      <div {...api.getControlProps()} className={classes.checkbox} />
      <span {...api.getLabelProps()} className="zap-content-medium">
        {label}
      </span>
      <input {...api.getHiddenInputProps()} />
    </label>
  )
}
