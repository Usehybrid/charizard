import classes from './table-selected-actions.module.css'
import {SVG} from '../../svg'
import {TableProps} from '../Table'
import {BUTTON_V2_SIZE, BUTTON_V2_VARIANT, ButtonV2} from '../../button-v2'

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

  const {isCheckbox, actions} = rowSelectionConfig
  const showDropdown = actions?.length && actions.length > 2
  const firstAction = actions?.length ? actions[0] : null

  return (
    <>
      {isCheckbox && Object.keys(rowSelection).length > 0 && (
        <>
          {showDropdown ? (
            <ButtonV2.GroupAction
              variant={BUTTON_V2_VARIANT.SECONDARY}
              size={BUTTON_V2_SIZE.SMALL}
              menuItems={actions.slice(1)}
              positionerProps={{placement: 'bottom-end'}}
              onClick={firstAction?.onClick}
            >
              <SVG
                svgClassName={classes.btnIcon}
                path={firstAction?.iconSrc || ''}
                spanClassName={classes.btnIconSpan}
              />
              {firstAction?.label}
            </ButtonV2.GroupAction>
          ) : (
            <div className={classes.selectedActions}>
              {actions?.map(action => (
                <ButtonV2
                  onClick={action.onClick}
                  variant={BUTTON_V2_VARIANT.SECONDARY}
                  size={BUTTON_V2_SIZE.SMALL}
                  key={action.label}
                >
                  <SVG path={action.iconSrc} svgClassName={classes.btnIcon} />
                  {action.label}
                </ButtonV2>
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}
