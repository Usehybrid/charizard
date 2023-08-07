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
import chevronDown from '../assets/chevron-down.svg'
import chevronUp from '../assets/chevron-up.svg'
import classes from './styles.module.css'
import {useReactTable, getCoreRowModel, flexRender} from '@tanstack/react-table'
import {Search} from '../search'
import {Button, ButtonVariant} from '../button'
import {SVG} from '../svg'
import {TableCheckbox} from './table-columns'
import {CHECKBOX_COL_ID, DROPDOWN_COL_ID} from './constants'
import type {SortingState, Table, VisibilityState} from '@tanstack/react-table'
import type {FilterConfig} from './types'
import TableEmpty from './table-empty'

export type TableProps = {
  data: any
  columns: any
  isDropdownActions?: boolean
  actionsConfig: {
    menuItems: {label: string; iconSrc?: string; onClick: any}[]
  }
  loaderConfig: {
    text?: string
    isFetching: boolean
    isError: boolean
    errMsg?: string
  }
  searchConfig?: {
    placeholder?: string
    search: string
    setSearch: any
  }
  sortConfig?: {
    sortBy: string
    setSortBy: any
    sortOrd: 'asc' | 'desc' | ''
    setSortOrd: any
    sortMap: Record<string, string>
  }
  filterConfig?: FilterConfig
  totalText: string
  checkboxConfig?: {
    isCheckboxActions?: boolean
    actions?: {
      icon: string
      text: string
      onClick: any
    }[]
    setSelectedRows?: React.Dispatch<React.SetStateAction<any>>
    iconSrc?: string
  }
  selectorConfig?: {
    selectors: {name: string; onClick: any}[]
  }
  paginationConfig?: {
    metaData: {
      total_items: number
    }
    loader: React.ReactNode
    fetchNextPage: () => void
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
  }
}
// todo
//* 5. fix action dropdown style
//* 6. fix uncheck row
//* 8. add radio option

//* 3. Pagination height fix
//* 4. label prop for under actions dropdown

export function Table({
  data,
  loaderConfig,
  columns,
  filterConfig,
  sortConfig,
  checkboxConfig = {
    isCheckboxActions: false,
  },
  isDropdownActions = false,
  actionsConfig,
  searchConfig,
  totalText,
  selectorConfig,
  paginationConfig,
  emptyStateConfig,
}: TableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  // used for checkbox visibility
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const isEmpty = !loaderConfig.isFetching && !loaderConfig.isError && !data.length

  const {isCheckboxActions, actions, setSelectedRows, iconSrc} = checkboxConfig

  useDeepCompareEffect(() => {
    if (!sortConfig || !sorting.length) return
    const {setSortOrd, setSortBy, sortMap} = sortConfig
    setSortBy(sortMap[sorting[0].id])
    setSortOrd(sorting[0].desc ? 'desc' : 'asc')
    return () => {
      // setSortOrd('')
    }
  }, [sorting])

  useDeepCompareEffect(() => {
    if (!checkboxConfig || !setSelectedRows) return
    const rows = table.getSelectedRowModel().rows.map(row => row.original)
    setSelectedRows((s: any[]) => [...rows])
  }, [rowSelection])

  const _columns = [
    {
      id: CHECKBOX_COL_ID,
      header: (props: any) => (
        <TableCheckbox
          row={props.header}
          {...{
            checked: props.table.getIsAllRowsSelected(),
            indeterminate: props.table.getIsSomeRowsSelected(),
            onChange: props.table.getToggleAllRowsSelectedHandler(),
          }}
          // setSelectedRows={setSelectedRows}
        />
      ),
      cell: ({row}: {row: any}) => (
        <TableCheckbox
          row={row}
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
          // setSelectedRows={setSelectedRows}
        />
      ),
    },
    ...columns,
    {
      id: DROPDOWN_COL_ID,
      cell: (props: any) => (
        <Button.ActionsDropdown
          menuItems={actionsConfig?.menuItems}
          data={props.row.original}
          id={props.row.original.id || 'dropdown-action'}
        />
      ),
      header: 'Actions',
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
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
  })

  // hide checkbox column
  React.useLayoutEffect(() => {
    if (isCheckboxActions) return
    table.getColumn(CHECKBOX_COL_ID)?.toggleVisibility(false)
  }, [])

  // hide actions dropdown column
  React.useLayoutEffect(() => {
    if (isDropdownActions) return
    table.getColumn(DROPDOWN_COL_ID)?.toggleVisibility(false)
  }, [])

  return (
    <div className={classes.box}>
      {!loaderConfig.isError && (
        <div className={classes.header}>
          <div className={classes.meta}>
            <div className={classes.total}>{totalText}</div>
            {typeof filterConfig === 'object' && <TableFilters filterConfig={filterConfig} />}
          </div>

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
                />
              </div>
            )}
          </div>
        </div>
      )}

      {isCheckboxActions && Object.keys(rowSelection).length > 0 && (
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
                onClick={action.onClick}
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
        >
          <TableComp
            table={table}
            isCheckboxActions={isCheckboxActions}
            loaderConfig={loaderConfig}
            isEmpty={isEmpty}
            emptyStateConfig={emptyStateConfig}
          />
        </InfiniteScroll>
      ) : (
        <TableComp
          table={table}
          isCheckboxActions={isCheckboxActions}
          loaderConfig={loaderConfig}
          isEmpty={isEmpty}
          emptyStateConfig={emptyStateConfig}
        />
      )}
    </div>
  )
}

function TableComp({
  table,
  isCheckboxActions,
  loaderConfig,
  emptyStateConfig,
  isEmpty,
}: {
  table: Table<unknown>
  isCheckboxActions?: boolean
  loaderConfig: TableProps['loaderConfig']
  emptyStateConfig: TableProps['emptyStateConfig']
  isEmpty: boolean
}) {
  return (
    <table className={classes.table}>
      <thead className={clsx(classes.tableHead, isCheckboxActions && classes.tableHead2)}>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className={classes.tableRow}>
            {headerGroup.headers.map(header => {
              const HeaderDef = header.column.columnDef.header
              return (
                <th key={header.id} className={clsx(classes.tableHeader)}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
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
        <TableLoader
          text={loaderConfig.text}
          isError={loaderConfig.isError}
          isFetching={loaderConfig.isFetching}
        />
      ) : isEmpty ? (
        <TableEmpty emptyStateConfig={emptyStateConfig} />
      ) : (
        <tbody className={classes.tableBody}>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className={classes.tableRow}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className={classes.tableData}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
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
