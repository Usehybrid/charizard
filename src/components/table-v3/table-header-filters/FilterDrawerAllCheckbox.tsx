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

  const [state, send] = useMachine(
    checkbox.machine({
      // id: `all-${filterKey}`,
      id: `all`,
      checked,
      onCheckedChange: ({checked}: {checked: any}) => {
        setHasChanges(true)
        console.log('1')
        console.log('hits', allRef.current)
        if (allRef.current) return
        setFilterCheckedState((prevState: Record<string, any[]>) => {
          return {
            ...prevState,
            [filterKey]: prevState[filterKey].map(obj => ({...obj, checked})),
          }
        })

        allRef.current = false
      },
    }),
  )

  const api = checkbox.connect(state, send, normalizeProps)

  // Initialize the machine state based on the external `checked` prop
  // if (api.checked !== checked) {
  //   send({type: 'SET_CHECKED', checked})
  // }

  // console.log('HITS', allRef.current)

  // Ensure that `checked` state is controlled directly without side effects
  // api.setChecked(checked)

  React.useEffect(() => {
    console.log('2')
    console.log(api.checked, checked)

    if (api.checked !== checked) {
      allRef.current = true
      api.setChecked(checked)
    } else {
      allRef.current = false
    }
  }, [checked, api.checked])

  // console.log({c: checked, machineC: api.checked, machineSC: api.checkedState})

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
