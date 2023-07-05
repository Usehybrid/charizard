import * as React from 'react'

import classes from './styles.module.css'

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table'
import {Search} from '../search'
import TableFilters from './TableFilters'

export interface TableProps {
  data: any
  columns: any
  search?: string
  setSearch?: any
  sortBy?: string
  sortOrd?: 'asc' | 'desc' | ''
  // sortOrd?: '
  filterOptions?: FilterOptions[]
}

export type FilterOptions = {
  id: string
  name: string
  options: {
    name: string
    value: string
    checked: boolean
  }[]
}

const defaultFilterOptions = [
  {
    id: 'software-owner',
    name: 'Software Owner',
    options: [
      {
        name: 'Owner 1',
        value: 'o1',
        checked: false,
      },
      {
        name: 'Figma',
        value: '123-156a',
        checked: false,
      },
      {
        name: 'Figma1',
        value: '123-156a1',
        checked: false,
      },
      {
        name: 'Figmaf',
        value: '123-156aadf',
        checked: false,
      },
    ],
  },

  {
    id: 'software-name',
    name: 'Software Name',
    options: [
      {
        name: 'Figma',
        value: '123-156afdafd',
        checked: false,
      },
    ],
  },
]

// const filterOptions = [] as any
export function Table({data, columns, search, setSearch}: TableProps) {
  const [filterOptions, setFilterOptions] = React.useState<FilterOptions[]>(defaultFilterOptions)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  let isSorting = true
  let sortOrd = 'desc'

  return (
    <div className={classes.box}>
      <div className={classes.header}>
        <div className={classes.meta}>
          <div className={classes.total}>14 softwares</div>

          <TableFilters filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
        </div>
        <div className={classes.search}>
          <Search search={search} setSearch={setSearch} placeholder="Search by software name" />
        </div>
      </div>

      <table className={classes.table}>
        <thead className={classes.tableHead}>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className={classes.tableRow}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className={classes.tableHeader}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
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
