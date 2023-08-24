/**
 * @author Soham Sarkar <soham@hybr1d.io>
 */

import * as React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useDeepCompareEffect from 'use-deep-compare-effect'
import clsx from 'clsx'
import TableFilters from './table-filters'
import TableLoader from './table-loader'
import TableSelectors from './table-selectors'
import TableEmpty from './table-empty'
import TableActions from './table-actions'
import chevronDown from '../assets/chevron-down.svg'
import chevronUp from '../assets/chevron-up.svg'
import classes from './styles.module.css'
import {useReactTable, getCoreRowModel, flexRender} from '@tanstack/react-table'
import {Search} from '../search'
import {Button, ButtonVariant} from '../button'
import {SVG} from '../svg'
import {TableCheckbox} from './table-columns'
import {TableRadio} from './table-columns'
import {CHECKBOX_COL_ID, DROPDOWN_COL_ID, RADIO_COL_ID} from './constants'
import type {SortingState, Table, VisibilityState} from '@tanstack/react-table'
import type {FilterConfig} from './types'

export type TableProps = {
  // the table data
  data: any
  // table column definition with column api from tanstack
  columns: any
  // column for actions dropdown in the row
  actionsConfig?: {
    isDropdownActions?: boolean
    // menu list for the dropdown
    menuItems?: {label: string; iconSrc?: string; onClick: any; filterFn?: any}[]
    key?: string
    customComp?: React.ReactNode
  }
  // api loading/refetching states
  loaderConfig: {
    text?: string
    isFetching: boolean
    isError: boolean
    errMsg?: string
  }
  // table search
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
   *
   */
  filterConfig?: FilterConfig
  totalText?: string
  rowSelectionConfig?: {
    isCheckbox?: boolean
    isRadio?: boolean
    actions?: {
      icon: string
      text: string
      onClick: any
    }[]
    setSelectedRows?: React.Dispatch<React.SetStateAction<any>>
    iconSrc?: string
    shouldClear?: boolean
  }
  selectorConfig?: {
    selectors: {name: string; onClick: any}[]
  }
  paginationConfig?: {
    metaData: {
      total_items: number
      items_on_page: number
    }
    loader: React.ReactNode
    fetchNextPage: () => void
    height?: string
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
}

// todo
// * figure out clearing of row selection after overlay closes
// * responsiveness
// * active filter popover in filter

export function Table({
  data,
  loaderConfig,
  columns,
  filterConfig,
  sortConfig,
  rowSelectionConfig = {
    isCheckbox: false,
    isRadio: false,
  },
  actionsConfig = {
    isDropdownActions: false,
    key: '',
  },
  searchConfig,
  totalText,
  selectorConfig,
  paginationConfig,
  emptyStateConfig,
  headerText,
}: TableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  // used for checkbox visibility
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // account for search state here itself
  const isEmpty = !loaderConfig.isFetching && !loaderConfig.isError && !data.length

  const {isCheckbox, isRadio, actions, setSelectedRows, iconSrc} = rowSelectionConfig

  useDeepCompareEffect(() => {
    if (!sortConfig || !sorting.length) return
    const {setSortOrd, setSortBy, sortMap} = sortConfig
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
      size: 55,
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
      size: 55,
    },
    ...columns,
    {
      id: DROPDOWN_COL_ID,

      cell: (props: any) => (
        <TableActions
          actionsConfig={actionsConfig}
          id={props.row.original.id || 'dropdown-actions'}
          data={props.row.original}
        />
      ),
      header: 'Actions',
      maxSize: 150,
    },
  ]

  const table = useReactTable({
    data,
    columns: _columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    manualSorting: true,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: isRadio ? false : true,
    manualPagination: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
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
    setRowSelection({})
  }, [searchConfig?.search])

  return (
    <div className={classes.box}>
      {!loaderConfig.isError && (
        <div className={classes.header}>
          {!headerText && (
            <div className={classes.meta}>
              <div className={classes.total}>{totalText}</div>
              {typeof filterConfig === 'object' && <TableFilters filterConfig={filterConfig} />}
            </div>
          )}

          {headerText && <div className={classes.headerTxt}>{headerText}</div>}

          <div className={classes.selectorGrp}>
            {typeof selectorConfig === 'object' && (
              <TableSelectors selectorConfig={selectorConfig} />
            )}
            {typeof searchConfig === 'object' && (
              <div className={classes.search}>
                <Search
                  id="table-search"
                  search={searchConfig.search}
                  setSearch={searchConfig.setSearch}
                  placeholder={searchConfig.placeholder}
                  clearIconClearFn={() => setRowSelection({})}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {isCheckbox && Object.keys(rowSelection).length > 0 && (
        <div className={classes.selectedActions}>
          <div className={classes.selectedAction}>
            <div>
              <SVG path={iconSrc || ''} svgClassName={classes.selectedIcon} />
            </div>
            {actions?.map((action, idx) => (
              <Button
                key={idx}
                variant={ButtonVariant.SECONDARY}
                size="sm"
                customStyles={{color: 'var(--gray-700)'}}
                onClick={() => {
                  action.onClick()
                }}
              >
                {action.icon && <SVG path={action.icon} svgClassName={classes.actionsBtnIcon} />}
                {action.text}
              </Button>
            ))}
          </div>

          <div className={classes.selectedInfo}>{Object.keys(rowSelection).length} selected</div>
        </div>
      )}
      {paginationConfig ? (
        <InfiniteScroll
          dataLength={data.length}
          next={paginationConfig.fetchNextPage}
          hasMore={data?.length < paginationConfig.metaData?.total_items}
          loader={paginationConfig.loader}
          height={paginationConfig.height}
        >
          <TableComp
            table={table}
            isCheckbox={isCheckbox}
            isRadio={isRadio}
            loaderConfig={loaderConfig}
            isEmpty={isEmpty}
            emptyStateConfig={emptyStateConfig}
            search={searchConfig?.search}
          />
        </InfiniteScroll>
      ) : (
        <TableComp
          table={table}
          isCheckbox={isCheckbox}
          isRadio={isRadio}
          loaderConfig={loaderConfig}
          isEmpty={isEmpty}
          emptyStateConfig={emptyStateConfig}
          search={searchConfig?.search}
        />
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
  isEmpty,
  search,
}: {
  table: Table<any>
  isCheckbox?: boolean
  isRadio?: boolean
  loaderConfig: TableProps['loaderConfig']
  emptyStateConfig: TableProps['emptyStateConfig']
  search?: string
  isEmpty: boolean
}) {
  return (
    <table className={classes.table}>
      <thead className={classes.tableHead}>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className={classes.tableRow}>
            {headerGroup.headers.map(header => {
              if (header.index === 0) {
                console.log(header)
              }
              return (
                <th
                  key={header.id}
                  className={classes.tableHeader}
                  style={{
                    width: header.getSize() === Number.MAX_SAFE_INTEGER ? 'auto' : header.getSize(),
                    paddingRight: header.id === DROPDOWN_COL_ID ? '20px' : undefined,
                    paddingLeft:
                      header.index === 0 &&
                      header.id !== CHECKBOX_COL_ID &&
                      header.id !== RADIO_COL_ID
                        ? '20px'
                        : undefined,
                    // minWidth: header.getSize === Number.MAX_SAFE_INTEGER ? 'auto' : header.getSize(),
                    // maxWidth: header.getSize() === Number.MAX_SAFE_INTEGER ? 'auto' : header.getSize(),
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: header.id === DROPDOWN_COL_ID ? 'flex-end' : undefined,
                        },
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: (
                          <SVG
                            path={chevronUp}
                            spanClassName={classes.tableHeaderSortSpan}
                            svgClassName={classes.tableHeaderSort}
                          />
                        ),
                        desc: (
                          <SVG
                            path={chevronDown}
                            spanClassName={classes.tableHeaderSortSpan}
                            svgClassName={classes.tableHeaderSort}
                          />
                        ),
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
          {table.getRowModel().rows.map((row, idx) => (
            <tr key={row.id} className={classes.tableRow}>
              {row.getVisibleCells().map(cell => {
                const isSelectionCell =
                  (isCheckbox || isRadio) &&
                  (cell.id === `${idx}_${RADIO_COL_ID}` || cell.id === `${idx}_${CHECKBOX_COL_ID}`)
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
                      verticalAlign: isSelectionCell ? 'middle' : undefined,
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

      <tfoot className={classes.tableFoot}>
        {table.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id} className={classes.tableRow}>
            {footerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.footer, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  )
}
