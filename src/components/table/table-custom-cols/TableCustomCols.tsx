import * as React from 'react'
import clsx from 'clsx'
import CustomColCheckbox from './CustomColCheckbox'
import viewColIcon from '../../assets/views/view-table-list.svg'
import classes from './table-custom-cols.module.css'
import {Table} from '@tanstack/react-table'
import {Portal} from '@zag-js/react'
import {useDisclosure} from '../../../hooks'
import {SVG} from '../../svg'
import {Search} from '../../search'
import {Loader} from '../../loader'
import {DrawerV2} from '../../drawer-v2'
import {BUTTON_VARIANT} from '../../button'
import {CHECKBOX_COL_ID, DROPDOWN_COL_ID, RADIO_COL_ID} from '../constants'
import {SortableList} from './sortable/SortableList'
import {GroupedSelection} from './GroupedSelection'
import type {CustomColCheckedState, TableCustomColumns} from '../types'

interface TableCustomColsProps {
  customColumnConfig: {
    description?: string
    columns?: TableCustomColumns
    isPending: boolean
    isError: boolean
    handleSaveColumns: (columns: any) => Promise<void>
    variant?: TableCustomColsVariant
    onCloseListener?: any
    onMountListener?: any
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
  const {isOpen, onOpen, onClose: _onClose} = useDisclosure()
  const {
    columns,
    isPending,
    isError,
    handleSaveColumns,
    onCloseListener,
    variant,
    onMountListener,
  } = customColumnConfig
  const [checkedState, setCheckedState] = React.useState<TableCustomColumns['checked_state']>([])
  const [search, setSearch] = React.useState('')

  // Keep track of initial state for selection variant
  const initialStateRef = React.useRef<TableCustomColumns['checked_state']>([])

  const onClose = () => {
    if (variant === 'selection' && initialStateRef.current.length > 0) {
      setCheckedState(structuredClone(initialStateRef.current))
      configureTable(initialStateRef.current)
    }
    if (typeof onCloseListener === 'function') {
      onCloseListener(checkedState, setCheckedState)
    }
    _onClose()
    setSearch('')
  }

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
    const initialState = columns?.checked_state || []
    setCheckedState(initialState)
    if (variant === 'selection') {
      // Store initial state for selection variant
      initialStateRef.current = structuredClone(initialState)
    }
    configureTable(initialState)
  }, [isPending, isError, variant])

  React.useEffect(() => {
    if (typeof onMountListener === 'function') {
      onMountListener(setCheckedState, checkedState)
    }
  }, [])

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
    if (variant === 'selection') {
      // Update initial state reference on save for selection variant
      initialStateRef.current = structuredClone(checkedState)
    }
    handleSaveColumns(checkedState)
    _onClose()
    setSearch('')
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
