import * as checkbox from '@zag-js/checkbox'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'

interface TableCheckboxProps {
  //   value: string
  //   checked: boolean
  row?: any
  header?: any
  selectAll?: boolean
  setSelectAll?: React.Dispatch<React.SetStateAction<boolean>>
  setCurrSelectedRows?: any
  selectedRowsRef?: any
}

export function TableCheckbox({
  //   value,
  //   checked,
  selectAll = false,
  setSelectAll,
  row,
  header,
  setCurrSelectedRows,
  selectedRowsRef,
}: TableCheckboxProps) {
  console.log(selectedRowsRef.current)
  const [state, send] = useMachine(
    checkbox.machine({
      id: row?.id || header?.id,
      name: row?.original.id,
      checked: selectAll ? true : undefined,
      onChange: ({checked}) => {
        // if (!setSelectAll) return

        // if (checked && header) {
        //   setSelectAll(true)
        // } else {
        //   setSelectAll(false)
        // }

        if (!setSelectAll) {
          // setCurrSelectedRows([row.original])

          selectedRowsRef.current = [row.original]
          return
        }

        // console.log('hits')

        if (checked && header) {
          setSelectAll(true)
        } else {
          setSelectAll(false)
        }
        // setCurrSelectedRows((s: any) => [...s, row.original])
        selectedRowsRef.current = [...selectedRowsRef.current, row.original]
      },
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
