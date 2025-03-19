import * as React from 'react'
import * as checkbox from '@zag-js/checkbox'
import clsx from 'clsx'
import classes from './table-custom-cols.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {OptionsProp} from './TableCustomCols'

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
  const onCheckedChange = React.useCallback(
    (details: checkbox.CheckedChangeDetails) => {
      if (disabled) return
      setCheckedState(oldState => {
        let newState = [...oldState]
        if (id === 'all') {
          if (details.checked) {
            newState = newState.map(obj => ({...obj, checked: !!details.checked}))
          } else {
            const allChecked = !newState.find(item => !item.checked)
            if (allChecked) {
              newState = newState.map(obj => ({...obj, checked: !!details.checked}))
            }
          }
        } else {
          newState[newState.findIndex(obj => obj.id === id)].checked = !!details.checked
        }
        return newState
      })
    },
    [id, setCheckedState],
  )

  const service = useMachine(checkbox.machine, {
    id: React.useId(),
    disabled,
    checked,
    onCheckedChange,
  })
  const api = checkbox.connect(service, normalizeProps)

  React.useEffect(() => {
    api.setChecked(checked)
  }, [checked, api])

  return (
    <label
      {...api.getRootProps()}
      className={clsx(classes.optionLabel, disabled && classes.optionDis)}
    >
      <div {...api.getControlProps()} className={classes.checkbox} />
      <span {...api.getLabelProps()} className="zap-content-medium">
        {label}
      </span>
      <input {...api.getHiddenInputProps()} />
    </label>
  )
}
