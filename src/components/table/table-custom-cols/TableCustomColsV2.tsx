import * as React from 'react'
import clsx from 'clsx'
import CustomColCheckbox from './CustomColCheckbox'
import viewColIcon from '../../assets/views/view-table-list.svg'
import classes from './table-custom-cols.module.css'
import {Table} from '@tanstack/react-table'
import {Portal} from '@zag-js/react'
import {SVG} from '../../svg'
import {Search} from '../../search'
import {SortableList} from './sortable/SortableList'
import {CHECKBOX_COL_ID, DROPDOWN_COL_ID, RADIO_COL_ID} from '../constants'
import {Loader} from '../../loader'
import {DrawerV2} from '../../drawer-v2'
import {BUTTON_VARIANT} from '../../button'
import {GroupedSelection} from './GroupedSelection'
import {useDisclosure} from '../../../hooks'
import type {TableProps} from '../Table'
import type {CustomColCheckedState, TableCustomColumns} from '../types'

interface TableCustomColsProps {
  customColumnConfig: {
    description?: string
    columns?: TableCustomColumns
    isPending: boolean
    isError: boolean
    handleSaveColumns: (columns: any) => Promise<void>
    variant?: TableCustomColsVariant
  }
  table: Table<any>
  isCheckbox?: boolean
  isDropdownActions?: boolean
  rowSelectionConfig: TableProps['rowSelectionConfig']
}
export type TableCustomColsVariant = 'default' | 'selection'

export default function TableCustomCols({
  customColumnConfig,
  table,
  isCheckbox,
  isDropdownActions,
  rowSelectionConfig,
}: TableCustomColsProps) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {columns, isPending, isError, handleSaveColumns} = customColumnConfig
  const [checkedState, setCheckedState] = React.useState<TableCustomColumns['checked_state']>([])
  const [search, setSearch] = React.useState('')

  const originalApiStateRef = React.useRef<TableCustomColumns['checked_state']>([])
  const prevCheckedStateRef = React.useRef<TableCustomColumns['checked_state']>([])

  const disabledCols = table
    .getAllLeafColumns()
    .filter(
      c =>
        !c.columnDef.enableHiding &&
        c.id !== CHECKBOX_COL_ID &&
        c.id !== RADIO_COL_ID &&
        c.id !== DROPDOWN_COL_ID,
    )

  // Update the API state effect
  React.useEffect(() => {
    if (isError || isPending) return
    if (columns?.checked_state) {
      // Store original API state
      originalApiStateRef.current = columns.checked_state
      setCheckedState(columns.checked_state)
      prevCheckedStateRef.current = columns.checked_state
      configureTable(columns.checked_state)
    }
  }, [columns?.checked_state, isPending, isError])
  const draggableCols = checkedState.filter(c => c.checked)
  const nonDraggableCols = checkedState.filter(c => !c.checked)

  const configureTable = React.useCallback(
    (_checkedState: TableCustomColumns['checked_state']) => {
      // First ensure selection column is visible
      if (rowSelectionConfig) {
        const selectionCol = table.getColumn(isCheckbox ? CHECKBOX_COL_ID : RADIO_COL_ID)
        if (selectionCol) {
          selectionCol.toggleVisibility(true)
        }
      }

      // Reset visibility only for configurable columns that aren't pinned
      table.getAllLeafColumns().forEach(col => {
        if (
          col.getCanHide() &&
          !col.columnDef.enablePinning && // Check for pinned columns
          col.id !== CHECKBOX_COL_ID &&
          col.id !== RADIO_COL_ID &&
          col.id !== DROPDOWN_COL_ID
        ) {
          col.toggleVisibility(false)
        }
      })

      // Then set visibility based on checked state
      _checkedState.forEach(obj => {
        const col = table.getColumn(obj.id)
        if (col && !col.columnDef.enablePinning) {
          // Don't toggle pinned columns
          col.toggleVisibility(obj.checked)
        }
      })

      // Set column order with selection column and pinned columns first
      table.setColumnOrder(() => {
        const orderableCols = _checkedState.map(obj => obj.id)
        const pinnedCols = table
          .getAllLeafColumns()
          .filter(col => col.columnDef.enablePinning)
          .map(col => col.id)

        const arr = [
          // Only include selection columns if rowSelectionConfig exists
          ...(rowSelectionConfig ? [isCheckbox ? CHECKBOX_COL_ID : RADIO_COL_ID] : []),
          ...pinnedCols,
          ...orderableCols.filter(id => !pinnedCols.includes(id)),
          isDropdownActions ? DROPDOWN_COL_ID : undefined,
        ].filter(Boolean) as string[]

        // Handle other disabled columns
        disabledCols.forEach(col => {
          if (!col.columnDef.enablePinning && col.getIndex() < arr.length) {
            arr.splice(col.getIndex(), 0, col.id)
          }
        })

        return arr
      })
    },
    [table, isCheckbox, isDropdownActions, disabledCols],
  )

  const handleSave = async () => {
    try {
      const currentCheckedState = [...checkedState]

      configureTable(currentCheckedState)
      await handleSaveColumns(currentCheckedState)
      prevCheckedStateRef.current = currentCheckedState
      onClose()
    } catch (error) {
      setCheckedState(prevCheckedStateRef.current)
      configureTable(prevCheckedStateRef.current)
      console.error('Error saving columns:', error)
    }
  }

  // Update handleClose to use original API state
  const handleClose = () => {
    // Reset to original API state
    setCheckedState(originalApiStateRef.current)
    configureTable(originalApiStateRef.current)
    onClose()
  }

  const filteredNonDragCols = nonDraggableCols.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase()),
  )

  const footerBtn = [
    {
      btnText: 'Cancel',
      onClick: handleClose,
      variant: BUTTON_VARIANT.TERTIARY,
    },
    {
      btnText: 'Save',
      onClick: handleSave,
    },
  ]

  return (
    <>
      <button onClick={onOpen} className={clsx('zap-reset-btn', classes.actionCommon)}>
        <SVG path={viewColIcon} width={16} height={16} />
      </button>
      <Portal>
        {isOpen && (
          <DrawerV2
            isOpen={isOpen}
            title="Columns"
            onClose={handleClose}
            size="sm"
            buttons={footerBtn}
          >
            {isError ? (
              <div className={classes.error}>Something went wrong, please try again later.</div>
            ) : isPending ? (
              <Loader />
            ) : (
              <div>
                <div className={classes.dropdownSearch}>
                  <Search
                    id="table-custom-column-search"
                    search={search}
                    setSearch={setSearch}
                    placeholder={'Search columns'}
                    customStyles={{customInputStyles: {borderRadius: '8px'}}}
                  />
                </div>
                {customColumnConfig?.variant === 'selection' ? (
                  <GroupedSelection
                    checkedState={checkedState}
                    setCheckedState={setCheckedState}
                    search={search}
                  />
                ) : (
                  <>
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
                  </>
                )}
              </div>
            )}
          </DrawerV2>
        )}
      </Portal>
    </>
  )
}

export interface OptionsProp {
  cols: CustomColCheckedState[]
  text: string
  textCn: string
  checkedState: CustomColCheckedState[]
  setCheckedState: React.Dispatch<React.SetStateAction<CustomColCheckedState[]>>
  isDraggable?: boolean
}

function Options({cols, text, textCn, checkedState, setCheckedState}: OptionsProp) {
  return (
    <>
      {cols.length > 0 && <p className={textCn}>{text}</p>}
      {cols.map((column: CustomColCheckedState) => {
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
