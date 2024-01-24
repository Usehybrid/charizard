import * as React from 'react'
import classes from './table-meta-header.module.css'
import {TableV2Props} from '../TableV2'
import TableSelectedActions from '../table-selected-actions'
import {Search} from '../../search'
import TableHeaderFilters from '../table-header-filters'
import viewColIcon from '../../assets/view-columns.svg'
import fileDownloadIcon from '../../assets/file-download.svg'
import filterIcon from '../../assets/filter-lines.svg'
import clsx from 'clsx'
import {pluralize} from '../../../utils/text'
import {SVG} from '../../svg'
import {useDisclosure} from '../../../utils/hooks/use-disclosure'
import TableFiltersDrawer from '../table-filters-drawer/TableFiltersDrawer'

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
  const {isOpen, onOpen, onClose} = useDisclosure()
  const hasRowActions = rowSelectionConfig?.actions && rowSelectionConfig.actions.length > 0

  const rowsSelected = Object.keys(rowSelection).length

  const isRowSelected = rowsSelected > 0

  const selectedText = `${rowsSelected} ${pluralize(
    rowsSelected,
    rowSelectionConfig?.entityName || '',
    `${rowSelectionConfig?.entityName}s`,
  )}`

  // console.log(filterConfig?.headerFilterIds, 'name')

  const headerFilter = filterConfig?.headerFilterIds
    ? filterConfig.filters.filter(f => filterConfig.headerFilterIds?.includes(f.id))
    : null

  console.log(headerFilter)

  return (
    <>
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

          {/* {typeof filterConfig === 'object' && (
            <div className={clsx(classes.actionCommon, classes.filterBtn)} onClick={onOpen}>
              <SVG path={filterIcon} width={22} height={22} />
              Filter
            </div>
          )} */}

          {typeof filterConfig === 'object' && <TableFiltersDrawer filterConfig={filterConfig} />}

          {
            // typeof customColumnConfig === 'object'

            <div className={classes.actionCommon}>
              <SVG path={viewColIcon} width={22} height={22} />
            </div>
          }

          {
            // typeof exportConfig === 'object'
            <div className={classes.actionCommon}>
              <SVG path={fileDownloadIcon} width={22} height={22} />
            </div>
          }
        </div>
      </div>
    </>
  )
}
