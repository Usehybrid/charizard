import * as React from 'react'
import * as pagination from '@zag-js/pagination'
import clsx from 'clsx'
import TableLimit from './TableLimit'
import TableEllipses from './TableEllipses'
import chevronRight from '../../assets/chevron-right.svg'
import chevronLeft from '../../assets/chevron-left.svg'
import classes from './table-pagination.module.css'
import {useMachine, normalizeProps, Portal} from '@zag-js/react'
import {TableV3Props} from '../TableV3'
import {SVG} from '../../svg'

interface TablePaginationProps {
  paginationConfig: TableV3Props['paginationConfig']
}

export function TablePagination({paginationConfig}: TablePaginationProps) {
  if (!paginationConfig) return null
  // * table page is non zero indexed whereas the db is zero indexed
  const {setLimit, limit, metaData} = paginationConfig

  const [state, send] = useMachine(
    pagination.machine({
      id: 'zap-charizard-table-pagination',
      count: metaData?.total_items || 0,
      onPageChange(details) {
        paginationConfig?.setPage(details.page - 1)
      },
      pageSize: paginationConfig.limit,
    }),
  )

  const paginationApi = pagination.connect(state, send, normalizeProps)

  React.useEffect(() => {
    paginationApi.setPage(paginationConfig.page + 1)
  }, [])

  React.useEffect(() => {
    // used to rerender the component after searching and filtering in the table
    paginationApi.setCount(metaData?.total_items || 0)
  }, [metaData?.total_items])

  const actualPageNo = metaData?.page_no ? metaData.page_no + 1 : 0

  return (
    <div className={classes.box}>
      <TableLimit
        setLimit={setLimit}
        limit={limit}
        totalItems={metaData?.total_items}
        itemsOnPage={metaData?.items_on_page}
      />
      <p className={clsx(classes.meta, 'zap-subcontent-medium')}>
        {actualPageNo + 1} - {actualPageNo * (metaData?.items_on_page || 0)} out of{' '}
        {`${metaData?.total_items}`}
      </p>
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
