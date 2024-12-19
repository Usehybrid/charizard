import classes from './styles.module.css'
import {TableProps} from '../Table'
import {BUTTON_SIZE, BUTTON_VARIANT, Button} from '../../button'

interface TableActionsProps {
  actionsConfig: TableProps['actionsConfig']
  data: any
}

export default function TableActions({actionsConfig, data}: TableActionsProps) {
  if (!actionsConfig) return null
  const {menuItems = [], isDropdownActions} = actionsConfig
  if (!isDropdownActions) return null

  const filteredMenuItems = actionsConfig.menuItems?.filter(item => {
    return typeof item.filterFn === 'function' ? item.filterFn(data) : true
  })

  if (!filteredMenuItems?.length) return null

  const items = menuItems.map(item => ({
    ...item,
    disabled: typeof item.disabled === 'function' ? item.disabled(data) : false,
  }))

  return (
    <div className={classes.box}>
      <Button.ActionsDropdown
        menuItems={items}
        variant={BUTTON_VARIANT.TERTIARY}
        size={BUTTON_SIZE.SMALL}
        isTable
        customData={data}
      />
    </div>
  )
}
