import * as React from 'react'
import clsx from 'clsx'
import classes from './table-meta-header.module.css'
import TableExport from '../table-export/TableExport'
import TableFiltersDrawer from '../table-filters-drawer/TableFiltersDrawer'
import TableHeaderFilters from '../table-header-filters'
import TableCustomCols from '../table-custom-cols'
import TableSelectedActions from '../table-selected-actions'
import TableHeaderActions from '../table-header-filters/TableHeaderActions'
import {TableProps} from '../Table'
import {Search} from '../../search'
import {SINGLE_VALUE_FILTER_TYPES, useTableStore} from '../store'
import {pluralize} from '../../../utils'
import type {Table} from '@tanstack/react-table'

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
  customActionItems?: React.ReactElement[]
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
  customActionItems,
}: TableMetaHeaderProps) {
  const hasRowActions = rowSelectionConfig?.actions && rowSelectionConfig.actions.length > 0
  const hasRadioSelection = rowSelectionConfig?.isRadio && Object.keys(rowSelection).length > 0
  const rowsSelected = Object.keys(rowSelection).length
  const isRowSelected = rowsSelected > 0
  const selectedText = `${rowsSelected} ${pluralize(
    rowsSelected,
    rowSelectionConfig?.entityName || '',
    `${rowSelectionConfig?.entityName}s`,
  )}`

  const filters = [
    ...(filterConfig?.filters?.header || []),
    ...(filterConfig?.filters?.drawer || []),
  ]

  const resetAll = useTableStore(s => s.resetAllFilters)
  const setDefaultFilters = useTableStore(s => s.setDefaultFilters)

  React.useEffect(() => {
    return () => {
      resetAll()
    }
  }, [])

  React.useEffect(() => {
    if (filterConfig?.isLoading) return

    const mapFn = (filter: any) => {
      const isMulti = !SINGLE_VALUE_FILTER_TYPES.includes(filter.type)
      let defaultValues = isMulti ? ([] as string[]) : ''
      const filterDefaultValue = filterConfig?.initialFilters?.[filter.key] as string
      if (filterDefaultValue) {
        defaultValues = isMulti ? filterDefaultValue.split(',') : filterDefaultValue
      }
      return {
        key: filter.key,
        values: defaultValues,
        type: filter.type,
      }
    }

    setDefaultFilters([...filters?.map(mapFn)])
  }, [filters?.length, filterConfig?.initialFilters])

  React.useEffect(() => {
    if (searchConfig?.search) {
      setRowSelection({})
    }
  }, [searchConfig?.search])

  return (
    <div className={classes.box}>
      <div className={classes.texts}>
        <p className={clsx(classes.heading, 'zap-content-semibold')}>
          {isRowSelected ? selectedText : totalText} {isRowSelected ? 'Selected' : ''}
        </p>
        {(hasRowActions || hasRadioSelection) && (
          <TableSelectedActions
            rowSelectionConfig={rowSelectionConfig}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        )}
      </div>

      <div className={classes.actions}>
        {typeof filterConfig === 'object' &&
          !filterConfig.isLoading &&
          !!filterConfig.filters?.header?.length && (
            <TableHeaderFilters
              setRowSelection={setRowSelection}
              filterConfig={filterConfig}
              showTabs
            />
          )}
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

        {typeof filterConfig === 'object' &&
          !filterConfig.isLoading &&
          !!filterConfig.filters?.header?.length && (
            <TableHeaderFilters setRowSelection={setRowSelection} filterConfig={filterConfig} />
          )}

        {typeof filterConfig === 'object' &&
          !filterConfig.isLoading &&
          !!filterConfig.filters?.drawer?.length && (
            <TableFiltersDrawer setRowSelection={setRowSelection} filterConfig={filterConfig} />
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

        {customActionItems && customActionItems.length > 0 && (
          <TableHeaderActions customActionItems={customActionItems} />
        )}
      </div>
    </div>
  )
}
