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
import type {CustomColCheckedState, TableCustomColumns} from '../types'
import {GroupedSelection} from './GroupedSelection'
import {useDisclosure} from '../../../hooks'

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
}
export type TableCustomColsVariant = 'default' | 'selection'

export default function TableCustomCols({
  customColumnConfig,
  table,
  isCheckbox,
  isDropdownActions,
}: TableCustomColsProps) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {columns, isPending, isError, handleSaveColumns} = customColumnConfig
  const [checkedState, setCheckedState] = React.useState<TableCustomColumns['checked_state']>([])
  const [search, setSearch] = React.useState('')

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
    configureTable(columns?.checked_state || [])
  }, [isPending, isError])

  const draggableCols = checkedState.filter(c => c.checked)
  const nonDraggableCols = checkedState.filter(c => !c.checked)

  const configureTable = (_checkedState: TableCustomColumns['checked_state']) => {
    _checkedState.forEach(obj => {
      const col = table.getColumn(obj.id)
      col?.toggleVisibility(obj.checked)
    })

    table.setColumnOrder(() => {
      const orderableCols = _checkedState.map(obj => obj.id)
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
  }

  const handleSave = () => {
    configureTable(checkedState)
    handleSaveColumns(checkedState)
    onClose()
  }

  const filteredNonDragCols = nonDraggableCols.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase()),
  )

  const footerBtn = [
    {
      btnText: 'Cancel',
      onClick: onClose,
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
          <DrawerV2 isOpen={isOpen} title="Columns" onClose={onClose} size="sm" buttons={footerBtn}>
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
