import * as React from 'react'
import * as dialog from '@zag-js/dialog'
import clsx from 'clsx'
import CustomColCheckbox from './CustomColCheckbox'
import viewColIcon from '../../assets/view-columns.svg'
import closeIcon from '../../assets/close.svg'
import classes from './table-custom-cols.module.css'
import {DndContext} from '@dnd-kit/core'
import {Table} from '@tanstack/react-table'
import {useMachine, normalizeProps, Portal} from '@zag-js/react'
import {SVG} from '../../svg'
import {BUTTON_VARIANT, Button} from '../../button'
import {Search} from '../../search'
import {TableV2Props} from '../TableV2'
import Droppable from './Dropable'
import Draggable from './Draggable'
import {SortableList} from './sortable/SortableList'

interface TableCustomColsProps {
  customColumnConfig: TableV2Props['customColumnConfig']
  table: Table<any>
}

export type CheckedState = {
  id: string
  label: string
  checked: boolean
}

export default function TableCustomCols({customColumnConfig, table}: TableCustomColsProps) {
  const [checkedState, setCheckedState] = React.useState<CheckedState[]>([])
  const [search, setSearch] = React.useState('')

  const [state, send] = useMachine(
    dialog.machine({
      id: 'charizard-table-custom-cols',
      onOpenChange(details) {
        if (!details.open) {
          // setCheckedState([])
        }
      },
    }),
  )

  const api = dialog.connect(state, send, normalizeProps)

  const enabledCols = table.getAllLeafColumns().filter(c => c.columnDef.enableHiding)

  React.useEffect(() => {
    setCheckedState(() => {
      const arr = enabledCols.map(c => ({
        id: c.id,
        checked: c.getIsVisible(),
        label: typeof c.columnDef.header === 'string' ? c.columnDef.header : '',
      }))
      return arr
    })
  }, [])

  const draggableCols = checkedState.filter(c => c.checked)
  const nonDraggableCols = checkedState.filter(c => !c.checked)

  const handleSave = () => {
    checkedState.forEach(obj => {
      const col = table.getColumn(obj.id)
      col?.toggleVisibility(obj.checked)
    })

    api.close()
  }

  const [isDropped, setIsDropped] = React.useState(false)

  function handleDragEnd(event: any) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true)
    }
  }

  return (
    <>
      <button {...api.triggerProps} className={clsx('hybr1d-ui-reset-btn', classes.actionCommon)}>
        <SVG path={viewColIcon} width={22} height={22} />
      </button>
      {api.isOpen && (
        <Portal>
          <div {...api.backdropProps} className={classes.backdrop} />
          <div {...api.positionerProps} style={{...api.positionerProps.style}}>
            <div {...api.contentProps} className={classes.content}>
              <h2 {...api.titleProps} className={classes.title}>
                <div>
                  <span>Columns</span>
                  <p {...api.descriptionProps} className={classes.desc}>
                    Description here
                  </p>
                </div>
                <button
                  {...api.closeTriggerProps}
                  type="button"
                  // onClick={api?.close}
                  className="hybr1d-ui-reset-btn"
                >
                  <SVG
                    path={closeIcon}
                    svgClassName={classes.closeIcon}
                    spanClassName={classes.closeIconSpan}
                  />
                </button>
              </h2>

              <div className={classes.colBox}>
                <div className={classes.dropdownSearch}>
                  <Search
                    id="table-custom-column-search"
                    search={search}
                    setSearch={setSearch}
                    placeholder={'Search columns'}
                  />
                </div>

                <div className={classes.option}>
                  <label className={classes.optionLabel}>
                    <input
                      {...{
                        type: 'checkbox',
                        checked: table.getIsAllColumnsVisible(),
                        onChange: table.getToggleAllColumnsVisibilityHandler(),
                        className: classes.checkbox,
                      }}
                    />{' '}
                    All
                  </label>
                </div>

                <>
                  {draggableCols.length > 0 && <p className={classes.info}>Selected</p>}
                  <SortableList
                    // items={draggableCols}
                    items={checkedState}
                    onChange={setCheckedState}
                    renderItem={column => (
                      <SortableList.Item id={column.id}>
                        <CustomColCheckbox
                          label={column.label}
                          id={column.id}
                          checked={
                            checkedState[checkedState.findIndex(obj => obj.id === column.id)]
                              .checked
                          }
                          setCheckedState={setCheckedState}
                        />
                        <SortableList.DragHandle />
                      </SortableList.Item>
                    )}
                  />
                </>
                {/* <Options
                  cols={draggableCols}
                  text="Selected"
                  textCn={classes.info}
                  checkedState={checkedState}
                  setCheckedState={setCheckedState}
                /> */}

                <Options
                  cols={nonDraggableCols}
                  text="Not Selected"
                  textCn={classes.info2}
                  checkedState={checkedState}
                  setCheckedState={setCheckedState}
                />
              </div>

              <div className={classes.footer}>
                <Button {...api.closeTriggerProps} variant={BUTTON_VARIANT.SECONDARY}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}

export interface OptionsProp {
  cols: CheckedState[]
  text: string
  textCn: string
  checkedState: CheckedState[]
  setCheckedState: React.Dispatch<React.SetStateAction<CheckedState[]>>
  isDraggable?: boolean
}

function Options({cols, text, textCn, checkedState, setCheckedState}: OptionsProp) {
  return (
    <>
      {cols.length > 0 && <p className={textCn}>{text}</p>}
      {cols.map((column: CheckedState) => {
        return (
          <div key={column.id} className={classes.option}>
            <CustomColCheckbox
              label={column.label}
              id={column.id}
              checked={checkedState[checkedState.findIndex(obj => obj.id === column.id)].checked}
              setCheckedState={setCheckedState}
            />
          </div>
        )
      })}
    </>
  )
}
