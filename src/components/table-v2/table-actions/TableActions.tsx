import classes from './styles.module.css'
import {Button} from '../../button'
import {TableV2Props} from '../TableV2'

interface TableActionsProps {
  actionsConfig: TableV2Props['actionsConfig']
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
      <Button.ActionsDropdown menuItems={items} data={data} isTable />
    </div>
  )
}
