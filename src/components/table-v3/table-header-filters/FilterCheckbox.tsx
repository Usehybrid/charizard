import * as checkbox from '@zag-js/checkbox'
import ReactCountryFlag from 'react-country-flag'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {TableStore} from '../store'
import clsx from 'clsx'

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
    <label {...api.getRootProps()} className={clsx(classes.optionLabel, 'zap-subcontent-medium')}>
      <div {...api.getControlProps()} />
      <span {...api.getLabelProps()}>
        {countryCode && (
          <ReactCountryFlag
            countryCode={countryCode || 'IN'}
            style={{
              fontSize: '15px',
              lineHeight: '15px',
              marginLeft: '-5px',
              marginRight: '7px',
              verticalAlign: 'unset',
            }}
          />
        )}

        {customName ? <div dangerouslySetInnerHTML={{__html: customName}}></div> : label}
      </span>
      <input {...api.getHiddenInputProps()} />
    </label>
  )
}
