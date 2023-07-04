import * as React from 'react'
import classes from './styles.module.css'
import filterLines from '../assets/filter-lines.svg'
import chevronDown from '../assets/chevron-down.svg'
import chevronUp from '../assets/chevron-up.svg'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table'
import {Search} from '../search'

export interface TableProps {
  data: any
  columns: any
  search?: string
  setSearch?: any
  sortBy?: string
  sortOrd?: 'asc' | 'desc' | ''
}

export function Table({data, columns, search, setSearch}: TableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  let isSorting = true
  let sortOrd = 'desc'

  const [s, setS] = React.useState('')

  return (
    <div className={classes.box}>
      <div className={classes.header}>
        <div className={classes.meta}>
          <div className={classes.total}>14 softwares</div>
          {isSorting && (
            <div className={classes.sort}>
              <img src={filterLines} alt="filter lines" className={classes.sortIcon} />
              <div className={classes.sortCol}>Software Owner</div>
              <img
                src={sortOrd === 'desc' ? chevronDown : chevronUp}
                alt="filter lines"
                className={classes.sortIcon2}
              />
            </div>
          )}
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
