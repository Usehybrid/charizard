import * as checkbox from '@zag-js/checkbox'
import ReactCountryFlag from 'react-country-flag'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {TableStore} from '../store'

export default function FilterCheckbox({
  label,
  value,
  addFilters,
  removeFilters,
  checked,
  filterKey,
  filterDispatch,
  countryCode,
  customName,
}: {
  label: string
  value: string
  checked: boolean
  filterKey: string
  addFilters: TableStore['addFilters']
  removeFilters: TableStore['removeFilters']
  filterDispatch: (value: any) => void
  countryCode?: string
  customName?: string
}) {
  const [state, send] = useMachine(
    checkbox.machine({
      id: value,
      name: label,
      checked: checked,
      onCheckedChange: ({checked}: {checked: any}) => {
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
      <span {...api.labelProps}>
        {countryCode && (
          <ReactCountryFlag
            countryCode={countryCode || 'IN'}
            style={{
              fontSize: '15px',
              lineHeight: '15px',
              marginLeft: '-5px',
              marginRight: '7px',
            }}
          />
        )}

        {customName ? <div dangerouslySetInnerHTML={{__html: customName}}></div> : label}
      </span>
      <input {...api.hiddenInputProps} />
    </label>
  )
}
