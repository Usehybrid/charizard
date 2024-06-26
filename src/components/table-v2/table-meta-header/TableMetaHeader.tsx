import * as React from 'react'
import classes from './table-meta-header.module.css'
import {TableV2Props} from '../TableV2'
import TableSelectedActions from '../table-selected-actions'
import {Search} from '../../search'
import TableHeaderFilters from '../table-header-filters'
import viewColIcon from '../../assets/view-columns.svg'
import fileDownloadIcon from '../../assets/file-download.svg'
import clsx from 'clsx'
import {pluralize} from '../../../utils/text'
import {SVG} from '../../svg'
import TableFiltersDrawer from '../table-filters-drawer'
import TableCustomCols from '../table-custom-cols'
import {Table} from '@tanstack/react-table'
import {useTableStore} from '../store'

interface TableMetaHeaderProps {
  rowSelectionConfig: TableV2Props['rowSelectionConfig']
  totalText: TableV2Props['totalText']
  searchConfig: TableV2Props['searchConfig']
  filterConfig: TableV2Props['filterConfig']
  customColumnConfig: TableV2Props['customColumnConfig']
  exportConfig: TableV2Props['exportConfig']
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
        <p className={classes.heading}>
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

        {typeof exportConfig === 'object' && (
          <div className={classes.actionCommon}>
            <SVG path={fileDownloadIcon} width={22} height={22} />
          </div>
        )}
      </div>
    </div>
  )
}
