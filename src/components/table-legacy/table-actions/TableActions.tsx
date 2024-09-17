import classes from './styles.module.css'
import {Button} from '../../button'
import {TableLegacyProps} from '../TableLegacy'

type TableActionsProps = {
  actionsConfig: TableLegacyProps['actionsConfig']
  data: any
}

export default function TableActions({actionsConfig, data}: TableActionsProps) {
  if (!actionsConfig) return null
  const {menuItems = [], isDropdownActions, key, customComp} = actionsConfig
  if (!isDropdownActions) return null

  const filteredMenuItems = actionsConfig.menuItems?.filter(item => {
    return typeof item.filterFn === 'function' ? item.filterFn(data) : true
  })

  if (!filteredMenuItems?.length) return null

  const items = menuItems.map(item => ({
    ...item,
    disabled: typeof item.disabled === 'function' ? item.disabled(data) : false,
  }))

  if (!key && !customComp)
    return (
      <div className={classes.box}>
        <Button.ActionsDropdown menuItems={items} data={data} />
      </div>
    )

  return (
    <div className={classes.box}>
      <Button.ActionsDropdown menuItems={items} data={data} variant="small" />
      {customComp ? (
        customComp(data)
      ) : key && data[key] ? (
        <div className={classes.label}>{data[key]}</div>
      ) : null}
    </div>
  )
}
