import * as React from 'react'
import classes from './table-meta-header.module.css'
import {TableProps} from '../Table'
import TableSelectedActions from '../table-selected-actions'
import {Search} from '../../search'
import TableHeaderFilters from '../table-header-filters'
import clsx from 'clsx'
import {pluralize} from '../../../utils/text'
import TableFiltersDrawer from '../table-filters-drawer/TableFiltersDrawer'
import TableCustomCols from '../table-custom-cols'
import {Table} from '@tanstack/react-table'
import {useTableStore} from '../store'
import TableExport from '../table-export/TableExport'

interface TableMetaHeaderProps {
  rowSelectionConfig: TableProps['rowSelectionConfig']
  totalText: TableProps['totalText']
  searchConfig: TableProps['searchConfig']
  filterConfig: TableProps['filterConfig']
  customColumnConfig: TableProps['customColumnConfig']
  exportConfig: TableProps['exportConfig']
  rowSelection: {}
  setRowSelection: React.Dispatch<React.SetStateAction<{}>>
  table: Table<any>
  isCheckbox?: boolean
  isDropdownActions?: boolean
}

export default function TableMetaHeader({
  rowSelectionConfig,
  totalText,
  searchConfig,
  filterConfig,
  customColumnConfig,
  exportConfig,
  rowSelection,
  setRowSelection,
  table,
  isCheckbox,
  isDropdownActions,
}: TableMetaHeaderProps) {
  const hasRowActions = rowSelectionConfig?.actions && rowSelectionConfig.actions.length > 0
  const rowsSelected = Object.keys(rowSelection).length
  const isRowSelected = rowsSelected > 0
  const selectedText = `${rowsSelected} ${pluralize(
    rowsSelected,
    rowSelectionConfig?.entityName || '',
    `${rowSelectionConfig?.entityName}s`,
  )}`

  const headerFilter = filterConfig?.filters?.header ? filterConfig?.filters.header : null

  const resetAll = useTableStore(s => s.resetAllFilters)

  React.useEffect(() => {
    return () => {
      resetAll()
    }
  }, [])

  return (
    <div className={classes.box}>
      <div className={classes.texts}>
        <p className={clsx(classes.heading, 'zap-content-semibold')}>
          {isRowSelected ? selectedText : totalText} {isRowSelected ? 'Selected' : ''}
        </p>
        {hasRowActions && (
          <TableSelectedActions
            rowSelectionConfig={rowSelectionConfig}
            rowSelection={rowSelection}
          />
        )}
      </div>

      <div className={classes.actions}>
        {typeof searchConfig === 'object' && (
          <div className={classes.search}>
            <Search
              id="table-search"
              search={searchConfig.search}
              setSearch={searchConfig.setSearch}
              placeholder={searchConfig.placeholder}
              clearIconClearFn={() => setRowSelection({})}
              customStyles={{
                customInputStyles: {borderRadius: '8px', height: '28px'},
                customIconStyles: {top: '4px'},
              }}
            />
          </div>
        )}

        {typeof filterConfig === 'object' && !!headerFilter && (
          <TableHeaderFilters filterConfig={filterConfig} filters={headerFilter} />
        )}

        {typeof filterConfig === 'object' &&
          !filterConfig.isLoading &&
          !!filterConfig.filters?.drawer?.length && (
            <TableFiltersDrawer filterConfig={filterConfig} />
          )}

        {typeof customColumnConfig === 'object' && (
          <TableCustomCols
            customColumnConfig={customColumnConfig}
            table={table}
            isCheckbox={isCheckbox}
            isDropdownActions={isDropdownActions}
          />
        )}

        {typeof exportConfig === 'object' && <TableExport exportConfig={exportConfig} />}
      </div>
    </div>
  )
}