import chevronDown from '../../assets/chevron-down.svg'
import classes from './table-selected-actions.module.css'
import {TableLegacyProps} from '../TableLegacy'
import {SVG} from '../../svg'
import {ButtonV2, BUTTON_V2_VARIANT, BUTTON_V2_SIZE} from '../../button-v2'

interface TableSelectedActionsProps {
  rowSelectionConfig: TableLegacyProps['rowSelectionConfig']
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
            <ButtonV2.GroupAction
              variant={BUTTON_V2_VARIANT.SECONDARY}
              size={BUTTON_V2_SIZE.SMALL}
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
              <ButtonV2 variant={BUTTON_V2_VARIANT.SECONDARY} size="sm">
                Actions
                <SVG
                  svgClassName={classes.actionsBtnIcon}
                  path={chevronDown}
                  spanClassName={classes.actionsBtnIconSpan}
                />
              </ButtonV2>
            </ButtonV2.GroupAction>
          </div>
        </div>
      )}
    </>
  )
}
