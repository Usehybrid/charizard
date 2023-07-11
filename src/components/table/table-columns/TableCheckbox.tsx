import * as checkbox from '@zag-js/checkbox'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'

export function TableCheckbox({
  //   value,
  //   checked,
  row,
  header,
}: {
  //   value: string
  //   checked: boolean
  row?: any
  header?: any
}) {
  console.log({row, header})
  const [state, send] = useMachine(
    checkbox.machine({
      id: row?.id || header?.id,
      //   name: label,
      //   checked: checked,
      //   onChange: ({checked}) => {},
    }),
  )

  const api = checkbox.connect(state, send, normalizeProps)

  return (
    <label {...api.rootProps} className={classes.optionLabel}>
      <div {...api.controlProps} />
      <input {...api.inputProps} />
    </label>
  )
}
