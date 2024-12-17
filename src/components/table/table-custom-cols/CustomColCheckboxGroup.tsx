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

type CheckboxChangeDetails = {
  checked: boolean
}

export default function CustomColCheckboxGroup({
  id,
  label,
  checked,
  setCheckedState,
  disabled = false,
}: CustomColCheckboxProps) {
  // Create a memoized callback for state updates
  const onCheckedChange = React.useCallback(
    (details: CheckboxChangeDetails) => {
      setCheckedState(oldState => {
        // Always return a new array to ensure React detects the change
        const newState = oldState.map(obj => ({...obj}))

        if (id === 'all') {
          // Handle "select all" case
          if (details.checked) {
            // Check all items
            return newState.map(obj => ({...obj, checked: true}))
          } else {
            // Only uncheck all if everything was checked
            const allChecked = !newState.find(item => !item.checked)
            if (allChecked) {
              return newState.map(obj => ({...obj, checked: false}))
            }
            return newState
          }
        } else {
          // Handle individual checkbox case
          const itemIndex = newState.findIndex(obj => obj.id === id)
          if (itemIndex !== -1) {
            newState[itemIndex] = {
              ...newState[itemIndex],
              checked: details.checked,
            }
          }
          return newState
        }
      })
    },
    [id, setCheckedState],
  )

  // Create checkbox machine with unique ID
  const checkboxId = React.useId()
  const [state, send] = useMachine(
    checkbox.machine({
      id: checkboxId,
      disabled,
      checked,
      onCheckedChange,
    }),
  )

  const api = checkbox.connect(state, send, normalizeProps)

  // Synchronize checkbox state with props
  React.useEffect(() => {
    const isOutOfSync = api.checked !== checked
    if (isOutOfSync) {
      api.setChecked(checked)
    }
  }, [api, checked])

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
