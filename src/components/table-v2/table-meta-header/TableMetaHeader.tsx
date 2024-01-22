import * as React from 'react'
import classes from './table-meta-header.module.css'
import {TableV2Props} from '../TableV2'
import TableSelectedActions from '../table-selected-actions'
import {Search} from '../../search'
import {pluralize} from '../../../utils/text'

interface TableMetaHeaderProps {
  rowSelectionConfig: TableV2Props['rowSelectionConfig']
  totalText: TableV2Props['totalText']
  searchConfig: TableV2Props['searchConfig']
  filterConfig: TableV2Props['filterConfig']
  rowSelection: {}
  setRowSelection: React.Dispatch<React.SetStateAction<{}>>
}

export default function TableMetaHeader({
  rowSelectionConfig,
  totalText,
  searchConfig,
  filterConfig,
  rowSelection,
  setRowSelection,
}: TableMetaHeaderProps) {
  const hasRowActions = rowSelectionConfig?.actions && rowSelectionConfig.actions.length > 0

  const rowsSelected = Object.keys(rowSelection).length

  const isRowSelected = rowsSelected > 0

  const selectedText = `${rowsSelected} ${pluralize(
    rowsSelected,
    rowSelectionConfig?.entityName || '',
    `${rowSelectionConfig?.entityName}s`,
  )}`

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

      <div>
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
  )
}
