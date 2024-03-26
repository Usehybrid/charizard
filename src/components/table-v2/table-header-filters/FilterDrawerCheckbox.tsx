import * as React from 'react'
import * as checkbox from '@zag-js/checkbox'
import ReactCountryFlag from 'react-country-flag'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
// import {useTableStore} from '../store'

export default function FilterDrawerCheckbox({
  label,
  value,
  checked,
  filterKey,
  countryCode,
  customName,
  setFilterCheckedState,
  idx,
}: {
  label: string
  value: string
  checked: boolean
  filterKey: string
  countryCode?: string
  customName?: string
  setFilterCheckedState: any
  idx: number
}) {
  // React.useEffect(() => {
  //   // effect to keep the 'All' checkbox changes in sync with the actual initialState
  //   if (api.isChecked !== checked) {
  //     api.setChecked(checked)
  //   }
  // }, [checked])

  const [state, send] = useMachine(
    checkbox.machine({
      id: value,
      name: label,
      checked,
      onCheckedChange: ({checked}: {checked: any}) => {
        if (value === 'all') {
          setFilterCheckedState((prevState: Record<string, any[]>) => {
            return {
              ...prevState,
              [filterKey]: prevState[filterKey].map(obj => ({...obj, checked})),
            }
          })
        } else {
          setFilterCheckedState((s: Record<string, any[]>) => {
            const n = {...s}
            n[filterKey][idx] = {label, value, checked}
            return n
          })
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
              verticalAlign: 'unset',
            }}
          />
        )}

        {customName ? <div dangerouslySetInnerHTML={{__html: customName}}></div> : label}
      </span>
      <input {...api.hiddenInputProps} />
    </label>
  )
}
