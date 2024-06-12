import * as React from 'react'

import * as checkbox from '@zag-js/checkbox'
import classes from './table-custom-cols.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {OptionsProp} from './TableCustomCols'
import clsx from 'clsx'

type CustomColCheckboxProps = Pick<OptionsProp, 'setCheckedState'> & {
  id: string
  label: string
  checked: boolean
  disabled?: boolean
}

export default function CustomColCheckbox({
  id,
  label,
  checked,
  setCheckedState,
  disabled = false,
}: CustomColCheckboxProps) {
  const [state, send] = useMachine(
    checkbox.machine({
      id: React.useId(),
      disabled,
      checked,
      onCheckedChange(details) {
        setCheckedState(oldState => {
          let newState = [...oldState]
          if (id === 'all') {
            newState = newState.map(obj => ({...obj, checked: !!details.checked}))
          } else {
            newState[newState.findIndex(obj => obj.id === id)].checked = !!details.checked
          }
          return newState
        })
      },
    }),
  )

  const api = checkbox.connect(state, send, normalizeProps)
  return (
    <label
      {...api.getRootProps()}
      className={clsx(classes.optionLabel, disabled && classes.optionDis)}
    >
      <div {...api.getControlProps()} className={classes.checkbox} />
      <span {...api.getLabelProps()}>{label}</span>
      <input {...api.getHiddenInputProps()} />
    </label>
  )
}
