import * as React from 'react'
import * as checkbox from '@zag-js/checkbox'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'

export default function FilterDrawerAllCheckbox({
  checked,
  filterKey,
  setFilterCheckedState,
  setHasChanges,
}: {
  checked: boolean
  filterKey: string
  setFilterCheckedState: any
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const allRef = React.useRef(false)

  const service = useMachine(checkbox.machine, {
    id: `all`,
    checked,
    onCheckedChange: ({checked}: {checked: any}) => {
      setHasChanges(true)
      if (allRef.current) return
      setFilterCheckedState((prevState: Record<string, any[]>) => {
        return {
          ...prevState,
          [filterKey]: prevState[filterKey].map(obj => ({...obj, checked})),
        }
      })

      allRef.current = false
    },
  })

  const api = checkbox.connect(service, normalizeProps)

  React.useEffect(() => {
    if (api.checked !== checked) {
      allRef.current = true
      api.setChecked(checked)
    } else {
      allRef.current = false
    }
  }, [checked, api.checked])

  return (
    <label {...api.getRootProps()} className={classes.optionLabel}>
      <div {...api.getControlProps()} />
      <span {...api.getLabelProps()} className={'zap-content-semibold'}>
        All
      </span>
      <input {...api.getHiddenInputProps()} />
    </label>
  )
}
