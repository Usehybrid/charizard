import * as React from 'react'

import * as checkbox from '@zag-js/checkbox'
import classes from './table-custom-cols.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {OptionsProp} from './TableCustomCols'

type CustomColCheckboxProps = Pick<OptionsProp, 'setCheckedState'> & {
  id: string
  label: string
  checked: boolean
}

export default function CustomColCheckbox({
  id,
  label,
  checked,
  setCheckedState,
}: CustomColCheckboxProps) {
  const [state, send] = useMachine(
    checkbox.machine({
      id: React.useId(),
      checked,
      onCheckedChange(details) {
        setCheckedState(oldState => {
          const newState = [...oldState]
          newState[newState.findIndex(obj => obj.id === id)].checked = !!details.checked
          return newState
        })
      },
    }),
  )

  const api = checkbox.connect(state, send, normalizeProps)
  return (
    <label {...api.rootProps} className={classes.optionLabel}>
      <div {...api.controlProps} className={classes.checkbox} />
      <span {...api.labelProps}>{label}</span>
      <input {...api.hiddenInputProps} />
    </label>
  )
}
