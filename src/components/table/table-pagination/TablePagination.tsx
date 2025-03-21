import * as React from 'react'
import * as pagination from '@zag-js/pagination'
import clsx from 'clsx'
import TableLimit from './TableLimit'
import TableEllipses from './TableEllipses'
import chevronRight from '../../assets/chevron-right.svg'
import chevronLeft from '../../assets/chevron-left.svg'
import classes from './table-pagination.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {TableProps} from '../Table'
import {SVG} from '../../svg'

interface TablePaginationProps {
  paginationConfig: TableProps['paginationConfig']
}

export function TablePagination({paginationConfig}: TablePaginationProps) {
  if (!paginationConfig) return null
  // * table page is non zero indexed whereas the db is zero indexed
  const {setLimit, limit, metaData} = paginationConfig

  const service = useMachine(pagination.machine, {
    id: 'zap-charizard-table-pagination',
    count: metaData?.total_items || 0,
    onPageChange(details) {
      paginationConfig?.setPage(details.page - 1)
    },
    pageSize: paginationConfig.limit,
  })

  const paginationApi = pagination.connect(service, normalizeProps)

  React.useEffect(() => {
    // Set the page when the component first renders or if the pagination page changes
    paginationApi.setPage(paginationConfig.page + 1)
  }, [paginationConfig.page])

  // No longer need to use setCount in an effect
  // The count is now reactively updated via props to useMachine
  React.useEffect(() => {
    // Explicitly update pageSize when limit changes
    paginationApi.setPageSize(paginationConfig.limit)

    // Reset the page number when the limit changes, only if the current page is invalid
    const maxPage = Math.ceil((metaData?.total_items || 0) / paginationConfig.limit)
    if (paginationConfig.page + 1 > maxPage) {
      paginationApi.setPage(1) // Reset to first page if current page exceeds total pages
    }
  }, [limit, metaData?.total_items])

  const actualPageNo = metaData?.page_no ?? 0
  const totalItems = metaData?.total_items ?? 0
  const itemsOnPage = metaData?.items_on_page ?? limit
  const startItem = actualPageNo * limit + 1
  const endItem = Math.min(startItem + itemsOnPage - 1, totalItems)

  return (
    <div className={classes.box}>
      <TableLimit
        setLimit={setLimit}
        limit={limit}
        itemsOnPage={metaData?.items_on_page}
        totalItems={metaData?.total_items}
      />
      {!!totalItems && (
        <p className={clsx(classes.meta, 'zap-subcontent-medium')}>
          {startItem} - {endItem} out of {totalItems}
        </p>
      )}
      {paginationApi.totalPages > 1 && (
        <nav {...paginationApi.getRootProps()}>
          <div className={classes.pageBoxes}>
            <div
              {...paginationApi.getPrevTriggerProps()}
              className={clsx(classes.pageBox, 'zap-button-small')}
            >
              <SVG path={chevronLeft} svgClassName={classes.arrowIcon} />
            </div>
            {paginationApi.pages.map((page, i) => {
              if (page.type === 'page')
                return (
                  <div
                    key={page.value}
                    {...paginationApi.getItemProps(page)}
                    className={clsx(classes.pageBox, 'zap-button-small')}
                  >
                    {page.value}
                  </div>
                )
              else
                return (
                  <React.Fragment key={`ellipsis-${i}`}>
                    <TableEllipses paginationApi={paginationApi} i={i} />
                  </React.Fragment>
                )
            })}
            <div
              {...paginationApi.getNextTriggerProps()}
              className={clsx(classes.pageBox, 'zap-button-small')}
            >
              <SVG path={chevronRight} svgClassName={classes.arrowIcon} />
            </div>
          </div>
        </nav>
      )}
    </div>
  )
}
