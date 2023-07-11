import * as checkbox from '@zag-js/checkbox'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {SetFilterOptions} from '../types'

export default function FilterCheckbox({
  label,
  value,
  setFilterOptions,
  checked,
}: {
  label: string
  value: string
  setFilterOptions: SetFilterOptions
  checked: boolean
}) {
  const [state, send] = useMachine(
    checkbox.machine({
      id: value,
      name: label,
      checked: checked,
      onChange: ({checked}) => {
        setFilterOptions(state => {
          const newState = [...state]
          newState.forEach(obj => {
            obj.options.forEach(option => {
              if (option.value === value) {
                option.checked = Boolean(checked)
                return
              }
            })
          })
          return newState
        })
      },
    }),
  )

  const api = checkbox.connect(state, send, normalizeProps)

  return (
    <label {...api.rootProps} className={classes.optionLabel}>
      <div {...api.controlProps} />
      <span {...api.labelProps}>{label}</span>
      <input {...api.inputProps} />
    </label>
  )
}
