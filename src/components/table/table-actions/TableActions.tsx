import classes from './styles.module.css'
import {Button} from '../../button'
import {TableProps} from '../Table'

type TableActionsProps = {
  actionsConfig: TableProps['actionsConfig']
  data: any
  id: string
}

export default function TableActions({actionsConfig, data, id}: TableActionsProps) {
  if (!actionsConfig) return null
  const {menuItems = [], isDropdownActions, key, customComp} = actionsConfig
  if (!isDropdownActions) return null

  if (!key && !customComp)
    return <Button.ActionsDropdown menuItems={menuItems} data={data} id={id} />

  return (
    <div className={classes.box}>
      <Button.ActionsDropdown menuItems={menuItems} data={data} id={id} />
      {customComp ? (
        customComp
      ) : key && data[key] ? (
        <div className={classes.label}>{data[key]}</div>
      ) : null}
    </div>
  )
}
