import clsx from 'clsx'
import classes from './styles.module.css'
import {type ColumnDef, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'

interface TableSubRowsProps {
  /** Column defs written against the child shape, not the parent's. */
  columns: ColumnDef<any, any>[]
  data: any[]
  caption?: string
  /**
   * The row these children belong to, exposed to their column defs as
   * `table.options.meta.parent`. Some child fields only make sense next to the
   * parent's — a line amount needs the order's currency, for instance.
   */
  parent?: any
}

/**
 * The nested table an expanded row reveals (an order's items, an invoice's
 * lines).
 *
 * It is a table of its own rather than more rows in the parent's body, because a
 * child describes different things than its parent and so needs its own headers.
 * Kept deliberately plain — no sorting, pinning, selection or pagination: a child
 * set is small and already scoped to one parent, so those controls would only add
 * state to reset every time a row collapses.
 */
export function TableSubRows({columns, data, caption, parent}: TableSubRowsProps) {
  const table = useReactTable({
    data,
    columns,
    meta: {parent},
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {size: Number.MAX_SAFE_INTEGER, enableSorting: false},
  })

  return (
    <div className={classes.box}>
      {caption && <div className={clsx(classes.caption, 'zap-subcontent-medium')}>{caption}</div>}

      <table className={classes.subTable}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className={clsx(classes.subTableHeader, 'zap-subcontent-medium')}
                  style={{
                    width: header.getSize() === Number.MAX_SAFE_INTEGER ? 'auto' : header.getSize(),
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className={classes.subTableRow}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className={clsx(classes.subTableData, 'zap-content-regular')}
                  style={{
                    width:
                      cell.column.getSize() === Number.MAX_SAFE_INTEGER
                        ? 'auto'
                        : cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
