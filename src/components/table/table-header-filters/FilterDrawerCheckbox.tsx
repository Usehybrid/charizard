import * as React from 'react'
import * as checkbox from '@zag-js/checkbox'
import ReactCountryFlag from 'react-country-flag'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'

export default function FilterDrawerCheckbox({
  label,
  value,
  checked,
  filterKey,
  countryCode,
  customName,
  setFilterCheckedState,
  idx,
  setHasChanges,
}: {
  label: string
  value: string
  checked: boolean
  filterKey: string
  countryCode?: string
  customName?: string
  setFilterCheckedState: any
  idx: number
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>
}) {
  React.useEffect(() => {
    if (api.checked !== checked) {
      api.setChecked(checked)
    }
  }, [checked])

  const service = useMachine(checkbox.machine, {
    id: value,
    name: label,
    checked,
    onCheckedChange: ({checked}: {checked: any}) => {
      setHasChanges(true)

      setFilterCheckedState((prevState: Record<string, any[]>) => {
        const updatedState = {...prevState}
        updatedState[filterKey][idx] = {label, value, checked}

        // // If a single checkbox is unchecked, ensure "All" is unchecked
        if (!checked) {
          updatedState[filterKey] = updatedState[filterKey].map((item, index) =>
            index === -1 ? {...item, checked: false} : item,
          )
        }
        return updatedState
      })
    },
  })

  const api = checkbox.connect(service, normalizeProps)

  return (
    <label {...api.getRootProps()} className={classes.optionLabel}>
      <div {...api.getControlProps()} />
      <span {...api.getLabelProps()} className={'zap-content-medium'}>
        {countryCode && (
          <ReactCountryFlag
            countryCode={countryCode}
            style={{
              fontSize: '15px',
              lineHeight: '15px',
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
