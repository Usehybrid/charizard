import chevronDown from '../../assets/chevron-down.svg'
import classes from './table-selected-actions.module.css'

import {SVG} from '../../svg'
import {Button, BUTTON_VARIANT} from '../../button'
import {TableV2Props} from '../TableV2'

interface TableSelectedActionsProps {
  rowSelectionConfig: TableV2Props['rowSelectionConfig']
  rowSelection: {}
}

export default function TableSelectedActions({
  rowSelectionConfig,
  rowSelection,
}: TableSelectedActionsProps) {
  if (
    !rowSelectionConfig ||
    !rowSelectionConfig.isCheckbox ||
    Object.keys(rowSelection).length === 0
  )
    return null

  const {isCheckbox, actions, iconSrc} = rowSelectionConfig

  const showDropdown = actions?.length && actions.length > 2

  const firstAction = actions?.length ? actions[0] : null

  console.log({showDropdown})
  return (
    <>
      {isCheckbox && Object.keys(rowSelection).length > 0 && (
        <>
          {showDropdown ? (
            <Button.MenuButton
              variant={BUTTON_VARIANT.GHOST}
              size="sm"
              menuItems={
                actions
                  ?.map(action => ({
                    label: action.text,
                    onClick: action.onClick,
                    iconSrc: action.icon,
                  }))
                  .slice(1) || []
              }
              positionerProps={{placement: 'bottom-end'}}
              onClick={firstAction?.onClick}
            >
              <SVG
                svgClassName={classes.btnIcon}
                path={firstAction?.icon || ''}
                spanClassName={classes.btnIconSpan}
              />
              {firstAction?.text}
            </Button.MenuButton>
          ) : (
            <div className={classes.selectedActions}>
              {actions?.map(action => (
                <Button onClick={action.onClick} variant={BUTTON_VARIANT.GHOST} size="sm">
                  <SVG path={action.icon} svgClassName={classes.btnIcon} />
                  {action.text}
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}
