import * as checkbox from '@zag-js/checkbox'
import ReactCountryFlag from 'react-country-flag'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {useTableStore} from '../store'

export default function FilterDrawerAllCheckbox({
  value,
  checked,
  filterKey,
  setFilterCheckedState,
  idx,
}: {
  value: string
  checked: boolean
  filterKey: string

  setFilterCheckedState: any
  idx: number
}) {
  // console.log(tableFilters)
  const [state, send] = useMachine(
    checkbox.machine({
      id: value,
      name: `${filterKey}-All`,
      checked: checked,
      onCheckedChange: ({checked}: {checked: any}) => {
        // console.log(checked)
        setFilterCheckedState((s: Record<string, any[]>) => {
          const n = {...s}
          n[filterKey][idx] = {value, checked}
          return n
        })
      },
    }),
  )

  const api = checkbox.connect(state, send, normalizeProps)

  return (
    <label {...api.rootProps} className={classes.optionLabel}>
      <div {...api.controlProps} />
      <span {...api.labelProps} style={{fontWeight: 500}}>
        All
      </span>
      <input {...api.hiddenInputProps} />
    </label>
  )
}
