import classes from './styles.module.css'
import {BUTTON_V2_SIZE, ButtonV2} from '../../button-v2'
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
        <ButtonV2.ActionsDropdown menuItems={items} />
      </div>
    )

  return (
    <div className={classes.box}>
      <ButtonV2.ActionsDropdown menuItems={items} size={BUTTON_V2_SIZE.SMALL} />
      {customComp ? (
        customComp(data)
      ) : key && data[key] ? (
        <div className={classes.label}>{data[key]}</div>
      ) : null}
    </div>
  )
}
