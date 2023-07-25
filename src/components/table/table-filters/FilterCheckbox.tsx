import * as checkbox from '@zag-js/checkbox'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {InternalTableFilters, SetInternalTableFilters} from '../types'

export default function FilterCheckbox({
  label,
  value,
  setTableFilters,
  checked,
  filterKey,
}: {
  label: string
  value: string
  setTableFilters: SetInternalTableFilters
  checked: boolean
  filterKey: string
}) {
  const [state, send] = useMachine(
    checkbox.machine({
      id: value,
      name: label,
      checked: checked,
      onChange: ({checked}) => {
        // sync internal table state
        setTableFilters(prevState => {
          const newState = prevState.map(obj => {
            if (obj.key === filterKey) {
              if (checked) {
                return {...obj, values: [...obj.values, value]}
              } else {
                return {...obj, values: obj.values.filter(objValue => objValue !== value)}
              }
            }
            return obj
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
