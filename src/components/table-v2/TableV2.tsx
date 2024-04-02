import * as React from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import clsx from 'clsx'
import TableLoader from './table-loader'
import TableEmpty from './table-empty'
import TableMetaHeader from './table-meta-header'
import TableActions from './table-actions'
import TablePagination from './table-pagination'
import sortIcon from '../assets/sorting.svg'
import sortAscIcon from '../assets/sort-asc.svg'
import sortDescIcon from '../assets/sort-desc.svg'
import classes from './styles.module.css'
import {useReactTable, getCoreRowModel, flexRender} from '@tanstack/react-table'
import {SVG} from '../svg'
import {TableCheckbox} from './table-columns'
import {TableRadio} from './table-columns'
import {CHECKBOX_COL_ID, DROPDOWN_COL_ID, RADIO_COL_ID} from './constants'
import type {
  Column,
  ColumnOrderState,
  ColumnPinningState,
  SortingState,
  Table,
  VisibilityState,
} from '@tanstack/react-table'
import type {FilterConfig} from './types'

export interface TableV2Props {
  // the table data
  data: any
  // table column definition with column api from tanstack
  columns: any
  /**
   * column for actions dropdown in the last row
   */
  actionsConfig?: {
    isDropdownActions?: boolean
    // menu list for the dropdown
    menuItems?: {
      label: string
      iconSrc?: string
      onClick: any
      filterFn?: any
      disabled?: boolean | ((data: any) => boolean)
    }[]
  }
  // api loading/refetching states
  loaderConfig: {
    text?: string
    isFetching: boolean
    isError: boolean
    errMsg?: string
  }
  /**
   * table search
   */
  searchConfig?: {
    placeholder?: string
    search: string
    setSearch: any
  }
  /**
   * table sorting
   * @param sortBy used for
   */
  sortConfig?: {
    sortBy: string
    setSortBy: any
    sortOrd: 'asc' | 'desc' | ''
    setSortOrd: any
    sortMap: Record<string, string>
  }
  /**
   * table filtering, data comes from an api
   */
  filterConfig?: FilterConfig
  totalText?: string
  /**
   * Row checkbox or radio selection config
   *
   * @param rowIdKey: needed to keep the selected rows when search is being used server side https://tanstack.com/table/v8/docs/guide/row-selection#useful-row-ids
   * @param entityName: singular format of entity name
   */
  rowSelectionConfig?: {
    isCheckbox?: boolean
    isRadio?: boolean
    entityName: string
    actions?: {
      icon: string
      text: string
      onClick: any
    }[]
    setSelectedRows?: React.Dispatch<React.SetStateAction<any>>
    iconSrc?: string
    clearOnSearch?: boolean
    rowIdKey: string
    rowSelection?: {}
    setRowSelection?: React.Dispatch<React.SetStateAction<{}>>
  }
  paginationConfig?: {
    metaData?: {
      total_items: number
      items_on_page: number
      page_no: number
    }
    page: number
    setPage: (page: number) => void
    limit: number
    setLimit: (limit: number) => void
    defaultLimit: string
  }
  emptyStateConfig?: {
    icon: string
    isCustom?: {
      value: boolean
      component: React.ReactNode
    }
    title: string
    desc: string
    btnText: string
    onClick: any
    columns: number
    emptySearchTitle?: string
  }
  headerText?: string
  tableStyleConfig?: {
    maxHeight?: string
    stickyIds?: string[]
    // idxNextToLeftStickyID:
  }
  /**
   * custom columns
   */
  customColumnConfig?: {
    description?: string
  }
  /**
   * export config (csv)
   */
  exportConfig?: {}
}

// todo
// * min size and max size of table not working
// * handle undefined filter (while loading)
// * use deferred while value when data is being re-fetched for total row count flickering issue
// * figure out clearing of row selection after overlay closes
// * responsiveness
// * sync all the table states with url (automatic reset state in table when route changes (or sync filter with url) (p1))
// * empty state center aligned
// ?p1: DATE FILTER https://www.figma.com/file/gVfOsoM56qfu6BmwQ9XEaR/SaaS-V1.1?node-id=60%3A6727&mode=dev
//? Single filter https://www.figma.com/file/gVfOsoM56qfu6BmwQ9XEaR/SaaS-V1.1?node-id=60%3A6383&mode=dev

export function TableV2({
  data,
  loaderConfig,
  columns,
  filterConfig,
  sortConfig,
  rowSelectionConfig = {
    isCheckbox: false,
    isRadio: false,
    clearOnSearch: true,
    entityName: '',
    rowIdKey: 'id',
  },
  actionsConfig = {
    isDropdownActions: false,
  },
  searchConfig,
  totalText,
  paginationConfig,
  emptyStateConfig,
  headerText,
  tableStyleConfig,
  customColumnConfig,
  exportConfig,
}: TableV2Props) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  // used for checkbox visibility
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([])
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({
    left: tableStyleConfig?.stickyIds
      ? [RADIO_COL_ID, CHECKBOX_COL_ID, ...tableStyleConfig?.stickyIds]
      : [RADIO_COL_ID, CHECKBOX_COL_ID],
    right: [DROPDOWN_COL_ID],
  })
  const [rowSelection, setRowSelection] = React.useState({})

  // account for search state here itself
  const isEmpty = !loaderConfig.isFetching && !loaderConfig.isError && !data.length

  const {isCheckbox, isRadio, setSelectedRows} = rowSelectionConfig

  useDeepCompareEffect(() => {
    if (!sortConfig) return
    const {setSortOrd, setSortBy, sortMap} = sortConfig
    if (!sorting.length) {
      setSortBy('')
      setSortOrd('')
      return
    }
    setSortBy(sortMap[sorting[0].id])
    setSortOrd(sorting[0].desc ? 'desc' : 'asc')
  }, [sorting])

  useDeepCompareEffect(() => {
    if (!rowSelectionConfig || !setSelectedRows) return
    const rows = table.getSelectedRowModel().rows.map(row => row.original)
    setSelectedRows([...rows])
  }, [rowSelection])

  const _columns = [
    {
      id: CHECKBOX_COL_ID,
      header: (props: any) => (
        <TableCheckbox
          {...{
            checked: props.table.getIsAllRowsSelected(),
            indeterminate: props.table.getIsSomeRowsSelected(),
            onChange: props.table.getToggleAllRowsSelectedHandler(),
            row: props.header,
            isHeader: true,
          }}
        />
      ),
      cell: ({row}: {row: any}) => (
        <TableCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
            row,
          }}
        />
      ),
      size: 40,
      enablePinning: false,
      // enableHiding: false,
    },
    {
      id: RADIO_COL_ID,
      cell: ({row}: {row: any}) => (
        <TableRadio
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),

            row,
          }}
        />
      ),
      size: 40,
      // enableHiding: false,
    },
    ...columns,
    {
      id: DROPDOWN_COL_ID,
      cell: (props: any) => (
        <TableActions actionsConfig={actionsConfig} data={props.row.original} />
      ),
      header: 'Actions',
      size: 70,
      enablePinning: true,
      // enableHiding: true,
    },
  ]

  const table = useReactTable({
    data,
    columns: _columns,
    state: {
      sorting,
      columnVisibility,
      columnOrder,
      rowSelection: rowSelectionConfig?.rowSelection || rowSelection,
      columnPinning,
    },
    manualSorting: true,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    enableRowSelection: true,
    onRowSelectionChange: rowSelectionConfig?.setRowSelection || setRowSelection,
    enableMultiRowSelection: isRadio ? false : true,
    manualPagination: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      // minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      enablePinning: false,
      enableSorting: false,
      // maxSize: Number.MAX_SAFE_INTEGER,
    },
    getRowId: rowSelectionConfig?.rowIdKey
      ? (row: any) => row[rowSelectionConfig?.rowIdKey as string]
      : undefined,
  })

  React.useLayoutEffect(() => {
    if (isCheckbox && isRadio)
      throw new Error(
        'Hybrid UI<Table>: Can not use both checkbox and radio columns, please use only one',
      )
  }, [])

  // hide checkbox column
  React.useLayoutEffect(() => {
    if (isCheckbox) return
    table.getColumn(CHECKBOX_COL_ID)?.toggleVisibility(false)
  }, [])

  // hide checkbox column
  React.useLayoutEffect(() => {
    if (isRadio) return
    table.getColumn(RADIO_COL_ID)?.toggleVisibility(false)
  }, [])

  // hide actions dropdown column
  React.useLayoutEffect(() => {
    if (actionsConfig.isDropdownActions) return
    table.getColumn(DROPDOWN_COL_ID)?.toggleVisibility(false)
  }, [])

  React.useEffect(() => {
    if (!rowSelectionConfig?.clearOnSearch) return
    setRowSelection({})
  }, [searchConfig?.search])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      <div className={classes.box}>
        {!loaderConfig.isError && (
          <TableMetaHeader
            rowSelectionConfig={rowSelectionConfig}
            searchConfig={searchConfig}
            totalText={totalText}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            filterConfig={filterConfig}
            customColumnConfig={customColumnConfig}
            exportConfig={exportConfig}
            table={table}
            isCheckbox={isCheckbox}
            isDropdownActions={actionsConfig.isDropdownActions}
          />
        )}
        <TableComp
          table={table}
          isCheckbox={isCheckbox}
          isRadio={isRadio}
          loaderConfig={loaderConfig}
          isEmpty={isEmpty}
          emptyStateConfig={emptyStateConfig}
          search={searchConfig?.search}
          tableStyleConfig={tableStyleConfig}
        />
      </div>
      {typeof paginationConfig === 'object' && !!paginationConfig.metaData && (
        <TablePagination paginationConfig={paginationConfig} />
      )}
    </div>
  )
}

function TableComp({
  table,
  isCheckbox,
  isRadio,
  loaderConfig,
  emptyStateConfig,
  tableStyleConfig,
  isEmpty,
  search,
}: {
  table: Table<any>
  isCheckbox?: boolean
  isRadio?: boolean
  loaderConfig: TableV2Props['loaderConfig']
  emptyStateConfig: TableV2Props['emptyStateConfig']
  tableStyleConfig: TableV2Props['tableStyleConfig']
  search?: string
  isEmpty: boolean
}) {
  const [showLeftShadow, setShowLeftShadow] = React.useState(false)
  const [showRightShadow, setShowRightShadow] = React.useState(false)
  const tableContainerRef = React.useRef(null)

  console.log({showLeftShadow, showRightShadow})

  const handleScroll = () => {
    if (tableContainerRef.current) {
      const {scrollLeft, scrollWidth, clientWidth} = tableContainerRef.current
      setShowLeftShadow(scrollLeft > 0)
      setShowRightShadow(scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth)
    }
  }

  return (
    <div
      className={classes.tableScrollContainer}
      id="hui-table-scroll-container"
      style={{overflowY: 'scroll', maxHeight: tableStyleConfig?.maxHeight}}
      ref={tableContainerRef}
      onScroll={handleScroll}
    >
      <table className={classes.table}>
        <thead className={classes.tableHead}>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className={classes.tableRow}>
              {headerGroup.headers.map((header, idx, _headers) => {
                let isNextToPinnedCol = false
                if (tableStyleConfig?.stickyIds?.length) {
                  if (tableStyleConfig.stickyIds.includes(_headers[idx - 1]?.id))
                    isNextToPinnedCol = true
                }
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={clsx(
                      classes.tableHeader,
                      header.column.getCanSort() && classes.tableHeaderSort,
                    )}
                    style={{
                      width:
                        header.getSize() === Number.MAX_SAFE_INTEGER ? 'auto' : header.getSize(),
                      paddingRight: header.id === DROPDOWN_COL_ID ? '10px' : undefined,
                      paddingLeft:
                        header.index === 0 &&
                        header.id !== CHECKBOX_COL_ID &&
                        header.id !== RADIO_COL_ID
                          ? '10px'
                          : isNextToPinnedCol
                            ? '15px'
                            : undefined,

                      ...getCommonPinningStyles(
                        header.column,
                        showLeftShadow,
                        showRightShadow,
                        true,
                      ),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          onClick: header.column.getToggleSortingHandler(),
                          style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: header.id === DROPDOWN_COL_ID ? 'center' : undefined,
                          },
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: (
                            <SVG path={sortAscIcon} spanClassName={classes.tableHeaderSortSpan} />
                          ),
                          desc: (
                            <SVG path={sortDescIcon} spanClassName={classes.tableHeaderSortSpan} />
                          ),
                          false: header.column.getCanSort() ? (
                            <SVG
                              path={sortIcon}
                              spanClassName={classes.tableHeaderSortSpan}
                              svgClassName={classes.tableHeaderSort}
                            />
                          ) : null,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>

        {loaderConfig.isFetching ? (
          <TableLoader text={loaderConfig.text} isError={loaderConfig.isError} />
        ) : isEmpty ? (
          <TableEmpty emptyStateConfig={emptyStateConfig} search={search} />
        ) : (
          <tbody className={classes.tableBody}>
            {table.getRowModel().rows.map((row, idx, _rows) => (
              <tr key={row.id} className={classes.tableRow}>
                {row.getVisibleCells().map((cell, idx2, cells) => {
                  const isSelectionCell =
                    (isCheckbox || isRadio) &&
                    (cell.id === `${idx}_${RADIO_COL_ID}` ||
                      cell.id === `${idx}_${CHECKBOX_COL_ID}`)

                  let isPrevPinned = false
                  if (tableStyleConfig?.stickyIds?.length) {
                    isPrevPinned = cells[idx2 - 1]?.column.getCanPin()
                  }

                  return (
                    <td
                      key={cell.id}
                      className={clsx(
                        classes.tableData,
                        (isCheckbox || isRadio) && classes.tableDataWithSelection,
                      )}
                      style={{
                        width:
                          cell.column.getSize() === Number.MAX_SAFE_INTEGER
                            ? 'auto'
                            : cell.column.getSize(),
                        backgroundColor: 'white',
                        verticalAlign: isSelectionCell ? 'middle' : undefined,
                        paddingLeft: isPrevPinned ? '15px' : undefined,
                        ...getCommonPinningStyles(cell.column, showLeftShadow, showRightShadow),
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        )}

        {loaderConfig.isError && (
          <tbody style={{height: '200px'}}>
            <tr>
              <td colSpan={emptyStateConfig?.columns} style={{textAlign: 'center'}}>
                {loaderConfig.errMsg || 'Error getting data, please try again later.'}
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  )
}

const getCommonPinningStyles = (
  column: Column<any>,
  showLeftShadow: boolean,
  showRightShadow: boolean,
  isHeader?: boolean,
): React.CSSProperties => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right')

  const leftShadow = 'drop-shadow(3px 0px 10px rgba(0, 0, 0, 0.07))'
  const rightShadow = 'drop-shadow(-3px 0px 10px rgba(0, 0, 0, 0.07))'

  return {
    filter:
      isLastLeftPinnedColumn && showLeftShadow
        ? leftShadow
        : isFirstRightPinnedColumn && showRightShadow
          ? rightShadow
          : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : undefined,
    // zIndex: isPinned ? (column.id === DROPDOWN_COL_ID ? 4 : 2) : 0,
    zIndex: isPinned ? 2 : 0,
    backgroundColor: isHeader ? `var(--neutral-arch-10)` : '#ffffff',
    marginRight: isLastLeftPinnedColumn ? '20px' : undefined,
  }
}
