import chevronDown from '../../assets/chevron-down.svg'
import classes from './table-selected-actions.module.css'
import {TableProps} from '../Table'
import {SVG} from '../../svg'
import {Button, BUTTON_VARIANT} from '../../button'

interface TableSelectedActionsProps {
  rowSelectionConfig: TableProps['rowSelectionConfig']
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
  return (
    <>
      {isCheckbox && Object.keys(rowSelection).length > 0 && (
        <div className={classes.selectedActions}>
          <div className={classes.selectedInfo}>{Object.keys(rowSelection).length}</div>

          <div className={classes.selectedAction}>
            {iconSrc && (
              <div>
                <SVG path={iconSrc || ''} svgClassName={classes.selectedIcon} />
              </div>
            )}

            <Button.MenuButton
              variant={BUTTON_VARIANT.SECONDARY}
              size="sm"
              isCustomTrigger
              menuItems={
                actions?.map(action => ({
                  label: action.text,
                  onClick: action.onClick,
                  iconSrc: action.icon,
                })) || []
              }
              positionerProps={{placement: 'bottom-start'}}
            >
              <Button variant={BUTTON_VARIANT.SECONDARY} size="sm">
                Actions
                <SVG
                  svgClassName={classes.actionsBtnIcon}
                  path={chevronDown}
                  spanClassName={classes.actionsBtnIconSpan}
                />
              </Button>
            </Button.MenuButton>
          </div>
        </div>
      )}
    </>
  )
}
