import * as React from 'react'
import clsx from 'clsx'
import TableFilters from './table-filters'
import classes from './styles.module.css'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table'
import {Search} from '../search'
import {FilterOptions} from './types'
import {TableCheckbox} from './table-columns'
import {Button} from '../button'
import TableLoader from './table-loader/TableLoader'

export interface TableProps {
  data: any
  columns: any

  sortBy?: string
  sortOrd?: 'asc' | 'desc' | ''
  defaultFilterOptions?: FilterOptions[]
  isCheckboxActions?: boolean
  isDropdownActions?: boolean
  actionsConfig: {
    menuItems: {label: string; iconSrc?: string; onClick: any}[]
  }
  loaderConfig: {
    fetchingData: boolean
    text?: string
  }
  searchConfig?: {
    placeholder?: string
    search: string
    setSearch: any
  }
  metaData?: {
    total_items: number
    page_no: number
    items_on_page: number
  }
  totalText: string
}

export function Table({
  data,
  loaderConfig,
  columns,
  defaultFilterOptions,
  isCheckboxActions = false,
  isDropdownActions = false,
  actionsConfig,
  searchConfig,
  totalText,
  metaData,
}: TableProps) {
  const [filterOptions, setFilterOptions] = React.useState<FilterOptions[]>(
    defaultFilterOptions ?? [],
  )

  const _columns = [
    isCheckboxActions && {
      id: 'checkbox actions',
      cell: (props: any) => <TableCheckbox row={props.row} />,
      header: (props: any) => <TableCheckbox header={props.header} />,
    },
    ...columns,
    isDropdownActions && {
      id: 'dropdown actions',
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
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  let isSorting = true
  let sortOrd = 'desc'

  return (
    <div className={classes.box}>
      <div className={classes.header}>
        <div className={classes.meta}>
          <div className={classes.total}>{totalText}</div>

          <TableFilters
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            defaultFilterOptions={defaultFilterOptions ?? []}
          />
        </div>
        <div className={classes.search}>
          <Search
            id="table-search"
            search={searchConfig?.search}
            setSearch={searchConfig?.setSearch}
            placeholder={searchConfig?.placeholder}
          />
        </div>
      </div>

      <div className={classes.selectedActions}></div>

      <table className={classes.table}>
        <thead className={clsx(classes.tableHead, isCheckboxActions && classes.tableHead2)}>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className={classes.tableRow}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className={clsx(classes.tableHeader)}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {loaderConfig.fetchingData ? (
          <TableLoader text={loaderConfig.text} />
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
    </div>
  )
}
