import * as React from 'react'
import clsx from 'clsx'
import TableFilters from './table-filters'
import TableLoader from './table-loader'
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
import type {SortingState} from '@tanstack/react-table'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {SVG} from '../svg'
import chevronDown from '../assets/chevron-down.svg'
import chevronUp from '../assets/chevron-up.svg'

export interface TableProps {
  data: any
  columns: any
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
  sortConfig?: {
    sortBy: string
    setSortBy: any
    sortOrd: 'asc' | 'desc' | ''
    setSortOrd: any
    sortMap: Record<string, string>
  }
  filterConfig?: {
    defaultFilterOptions?: FilterOptions[]
  }
  totalText: string
}

export function Table({
  data,
  loaderConfig,
  columns,
  filterConfig,
  sortConfig,
  isCheckboxActions = false,
  isDropdownActions = false,
  actionsConfig,
  searchConfig,
  totalText,
}: TableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [filterOptions, setFilterOptions] = React.useState<FilterOptions[]>(
    filterConfig?.defaultFilterOptions ?? [],
  )
  // used for checkbox
  const [selectAll, setSelectAll] = React.useState(false)
  // const [currSelectedRows, setCurrSelectedRows] = React.useState([])

  const selectedRowsRef = React.useRef([])

  useDeepCompareEffect(() => {
    if (!sortConfig || !sorting.length) return
    const {setSortOrd, setSortBy, sortMap} = sortConfig
    console.log(sorting, sortMap)

    setSortBy(sortMap[sorting[0].id])
    setSortOrd(sorting[0].desc ? 'desc' : 'asc')
    return () => {
      // setSortOrd('')
    }
  }, [sorting])

  const _columns = [
    isCheckboxActions && {
      id: 'checkbox actions',
      cell: (props: any) => (
        <TableCheckbox
          row={props.row}
          selectAll={selectAll}
          // setCurrSelectedRows={setCurrSelectedRows}
          selectedRowsRef={selectedRowsRef}
        />
      ),
      header: (props: any) => (
        <TableCheckbox
          header={props.header}
          selectAll={selectAll}
          setSelectAll={setSelectAll}
          // setCurrSelectedRows={setCurrSelectedRows}
          selectedRowsRef={selectedRowsRef}
        />
      ),
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
    state: {
      sorting,
    },
    manualSorting: true,
    onSortingChange: setSorting,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className={classes.box}>
      <div className={classes.header}>
        <div className={classes.meta}>
          <div className={classes.total}>{totalText}</div>

          <TableFilters
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            defaultFilterOptions={filterConfig?.defaultFilterOptions ?? []}
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
                <th
                  key={header.id}
                  className={clsx(classes.tableHeader)}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}

                  {/* Add a sort direction indicator */}

                  {{
                    // asc: (
                    //   <SVG
                    //     path={chevronUp}
                    //     customSvgStyles={{width: '18px', height: '18px'}}
                    //     customSpanStyles={{width: '20px', height: '20px', marginLeft: '3px'}}
                    //   />
                    // ),
                    // desc: (
                    //   <SVG
                    //     path={chevronDown}
                    //     customSvgStyles={{width: '18px', height: '18px'}}
                    //     customSpanStyles={{width: '20px', height: '20px', marginLeft: '3px'}}
                    //   />
                    // ),
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
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
