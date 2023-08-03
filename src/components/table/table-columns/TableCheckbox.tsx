import * as React from 'react'
import * as checkbox from '@zag-js/checkbox'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'

export type TableCheckboxProps = {
  row?: any
  indeterminate?: any
  checked?: boolean
  disabled?: boolean
  onChange?: any
}

export function TableCheckbox({
  indeterminate,
  row,
  checked,
  onChange,
  disabled,
}: TableCheckboxProps) {
  const ref = React.useRef<HTMLInputElement>(null!)
  const [state, send] = useMachine(
    checkbox.machine({
      // @ts-ignore
      indeterminate: indeterminate,
      id: row?.id,
      name: row?.original.id,
      checked: checked,
      disabled: disabled,
      onChange: ({checked}) => {
        onChange()
      },
    }),
  )

  const api = checkbox.connect(state, send, normalizeProps)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      // @ts-ignore
      ref.current.indeterminate = !checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <label {...api.rootProps} className={classes.optionLabel}>
      <div {...api.controlProps} />
      <input {...api.inputProps} ref={ref} />
    </label>
  )
}
