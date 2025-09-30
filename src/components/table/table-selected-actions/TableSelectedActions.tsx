import classes from './table-selected-actions.module.css'
import {SVG} from '../../svg'
import {TableProps} from '../Table'
import {BUTTON_SIZE, BUTTON_VARIANT, Button} from '../../button'

interface TableSelectedActionsProps {
  rowSelectionConfig: TableProps['rowSelectionConfig']
  rowSelection: {}
  setRowSelection: React.Dispatch<React.SetStateAction<{}>>
}

export default function TableSelectedActions({
  rowSelectionConfig,
  rowSelection,
  setRowSelection,
}: TableSelectedActionsProps) {
  if (!rowSelectionConfig || Object.keys(rowSelection).length === 0) return null

  const {isCheckbox, isRadio, actions} = rowSelectionConfig
  const showDropdown = actions?.length && actions.length > 2
  const firstAction = actions?.length ? actions[0] : null

  if (isRadio) {
    return (
      <Button
        onClick={() => setRowSelection({})}
        variant={BUTTON_VARIANT.SECONDARY}
        size={BUTTON_SIZE.SMALL}
      >
        Clear Selection
      </Button>
    )
  }

  if (isCheckbox) {
    return (
      <>
        {showDropdown ? (
          <Button.GroupAction
            variant={BUTTON_VARIANT.SECONDARY}
            size={BUTTON_SIZE.SMALL}
            menuItems={actions.slice(1)}
            positionerProps={{placement: 'bottom-end'}}
            onClick={async () => {
              await firstAction?.onClick()
              setRowSelection({})
            }}
          >
            <SVG
              svgClassName={classes.btnIcon}
              path={firstAction?.iconSrc || ''}
              spanClassName={classes.btnIconSpan}
            />
            {firstAction?.label}
          </Button.GroupAction>
        ) : (
          <div className={classes.selectedActions}>
            {actions?.map(action => (
              <Button
                onClick={async () => {
                  await action.onClick()
                  setRowSelection({})
                }}
                variant={BUTTON_VARIANT.SECONDARY}
                size={BUTTON_SIZE.SMALL}
                key={action.label}
              >
                <SVG path={action.iconSrc} svgClassName={classes.btnIcon} />
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </>
    )
  }

  return null
}
