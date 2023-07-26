import * as checkbox from '@zag-js/checkbox'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {InternalTableFilters, SetInternalTableFilters} from '../types'
import {TableStore} from '../store'

export default function FilterCheckbox({
  label,
  value,
  addFilters,
  removeFilters,
  checked,
  filterKey,
  filterDispatch,
}: {
  label: string
  value: string
  checked: boolean
  filterKey: string
  addFilters: TableStore['addFilters']
  removeFilters: TableStore['removeFilters']
  filterDispatch: (value: any) => void
}) {
  const [state, send] = useMachine(
    checkbox.machine({
      id: value,
      name: label,
      checked: checked,
      onChange: ({checked}) => {
        // sync internal table state
        if (checked) {
          addFilters(filterKey, value, filterDispatch)
        } else {
          removeFilters(filterKey, value, filterDispatch)
        }
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
