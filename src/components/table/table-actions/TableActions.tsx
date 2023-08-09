import classes from './styles.module.css'
import {Button} from '../../button'
import {TableProps} from '../Table'

type TableActionsProps = {
  actionsConfig: TableProps['actionsConfig']
  data: any
  id: string
}

export default function TableActions({actionsConfig, data, id}: TableActionsProps) {
  if (!actionsConfig) return
  const {menuItems = [], isDropdownActions, labelText, key} = actionsConfig
  if (!isDropdownActions) return

  if (!labelText) return <Button.ActionsDropdown menuItems={menuItems} data={data} id={id} />

  return (
    <div className={classes.box}>
      <div>
        <Button.ActionsDropdown menuItems={menuItems} data={data} id={id} />
      </div>

      <div className={classes.label}>{data[key]}</div>
    </div>
  )
}
