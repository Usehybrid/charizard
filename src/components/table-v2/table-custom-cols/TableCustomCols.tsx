import * as React from 'react'
import * as dialog from '@zag-js/dialog'
import clsx from 'clsx'
import CustomColCheckbox from './CustomColCheckbox'
import viewColIcon from '../../assets/view-columns.svg'
import closeIcon from '../../assets/close.svg'
import classes from './table-custom-cols.module.css'
import {Table} from '@tanstack/react-table'
import {useMachine, normalizeProps, Portal} from '@zag-js/react'
import {SVG} from '../../svg'
import {BUTTON_VARIANT, Button} from '../../button'
import {Search} from '../../search'
import {TableV2Props} from '../TableV2'
import {SortableList} from './sortable/SortableList'
import {CHECKBOX_COL_ID, DROPDOWN_COL_ID, RADIO_COL_ID} from '../constants'
import {TableCustomColumns} from '../types'
import {Loader} from '../../loader'

interface TableCustomColsProps {
  customColumnConfig: {
    description?: string
    columns?: TableCustomColumns
    isPending: boolean
    isError: boolean
    handleSaveColumns: (columns: any) => Promise<void>
  }
  table: Table<any>
  isCheckbox?: boolean
  isDropdownActions?: boolean
}

export type CheckedState = {
  id: string
  label: string
  checked: boolean
}

export default function TableCustomCols({
  customColumnConfig,
  table,
  isCheckbox,
  isDropdownActions,
}: TableCustomColsProps) {
  const {columns, isPending, isError, handleSaveColumns} = customColumnConfig
  const [checkedState, setCheckedState] = React.useState<TableCustomColumns['checked_state']>([])
  const [search, setSearch] = React.useState('')

  console.log({checkedState})

  const [state, send] = useMachine(
    dialog.machine({
      id: 'charizard-table-custom-cols',
      onOpenChange(details) {
        if (!details.open) {
          // setCheckedState([])
          setSearch('')
        }
      },
      // todo debug the root cause in zag source code
      closeOnInteractOutside: false,
    }),
  )

  const api = dialog.connect(state, send, normalizeProps)

  // const enabledCols = table
  //   .getAllLeafColumns()
  //   .filter(
  //     c =>
  //       c.columnDef.enableHiding &&
  //       c.id !== CHECKBOX_COL_ID &&
  //       c.id !== RADIO_COL_ID &&
  //       c.id !== DROPDOWN_COL_ID,
  //   )

  const disabledCols = table
    .getAllLeafColumns()
    .filter(
      c =>
        !c.columnDef.enableHiding &&
        c.id !== CHECKBOX_COL_ID &&
        c.id !== RADIO_COL_ID &&
        c.id !== DROPDOWN_COL_ID,
    )

  React.useEffect(() => {
    if (isError || isPending) return
    setCheckedState(columns?.checked_state || [])
  }, [isPending, isError])

  const draggableCols = checkedState.filter(c => c.checked)
  const nonDraggableCols = checkedState.filter(c => !c.checked)
  // console.log(nonDraggableCols)

  const handleSave = () => {
    checkedState.forEach(obj => {
      const col = table.getColumn(obj.id)
      col?.toggleVisibility(obj.checked)
    })

    table.setColumnOrder(() => {
      const orderableCols = checkedState.map(obj => obj.id)
      const arr = [
        isCheckbox ? CHECKBOX_COL_ID : RADIO_COL_ID,
        ...orderableCols,
        isDropdownActions ? DROPDOWN_COL_ID : undefined,
      ].filter(Boolean) as string[]

      disabledCols.forEach(col => {
        arr.splice(col.getIndex(), 0, col.id)
      })

      return arr
    })
    handleSaveColumns(checkedState)
    api.setOpen(false)
  }

  const filteredNonDragCols = nonDraggableCols.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <>
      <button {...api.triggerProps} className={clsx('hybr1d-ui-reset-btn', classes.actionCommon)}>
        <SVG path={viewColIcon} width={22} height={22} />
      </button>
      {api.open && (
        <Portal>
          <div {...api.backdropProps} className={classes.backdrop} />
          <div {...api.positionerProps} style={{...api.positionerProps.style}}>
            <div {...api.contentProps} className={classes.content}>
              <h2 {...api.titleProps} className={classes.title}>
                <div>
                  <span>Columns</span>
                  <p {...api.descriptionProps} className={classes.desc}>
                    {customColumnConfig?.description || `Description here`}
                  </p>
                </div>
                <button {...api.closeTriggerProps} type="button" className="hybr1d-ui-reset-btn">
                  <SVG
                    path={closeIcon}
                    svgClassName={classes.closeIcon}
                    spanClassName={classes.closeIconSpan}
                  />
                </button>
              </h2>

              {isError ? (
                <div className={classes.error}>Something went wrong, please try again later.</div>
              ) : isPending ? (
                <Loader />
              ) : (
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
                    <CustomColCheckbox
                      label={'All'}
                      id={'all'}
                      checked={nonDraggableCols.length === 0}
                      setCheckedState={setCheckedState}
                    />
                  </div>

                  {disabledCols.map(column => (
                    <div key={column.id} className={clsx(classes.option, classes.optionDisabled)}>
                      <CustomColCheckbox
                        label={column.columnDef.header as string}
                        id={column.id}
                        checked={true}
                        disabled
                        setCheckedState={setCheckedState}
                      />
                    </div>
                  ))}

                  <>
                    {draggableCols.length > 0 && <p className={classes.info}>Selected</p>}
                    <SortableList
                      items={checkedState}
                      onChange={setCheckedState}
                      search={search}
                      renderItem={column => (
                        <SortableList.Item
                          id={column.id}
                          isHidden={
                            !!search.length &&
                            !column.label.toLowerCase().includes(search.toLowerCase())
                          }
                        >
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

                  <Options
                    cols={filteredNonDragCols}
                    text="Not Selected"
                    textCn={classes.info2}
                    checkedState={checkedState}
                    setCheckedState={setCheckedState}
                  />
                </div>
              )}

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
