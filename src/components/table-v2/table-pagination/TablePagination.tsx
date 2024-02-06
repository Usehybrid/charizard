import * as React from 'react'
import * as pagination from '@zag-js/pagination'
import chevronLeft from '../../assets/chevron-left.svg'
import chevronRight from '../../assets/chevron-right.svg'
import threeDots from '../../assets/three-dots.svg'
import TableLimit from './TableLimit'
import classes from './table-pagination.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {TableV2Props} from '../TableV2'
import {SVG} from '../../svg'

interface TablePaginationProps {
  paginationConfig: TableV2Props['paginationConfig']
}

export default function TablePagination({paginationConfig}: TablePaginationProps) {
  if (!paginationConfig) return null
  // * table page is non zero indexed whereas the db is zero indexed
  const {setLimit, defaultLimit, metaData} = paginationConfig
  const [state, send] = useMachine(
    pagination.machine({
      id: 'hui-charizard-table',
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

  return (
    <div className={classes.box}>
      <TableLimit
        setLimit={setLimit}
        defaultLimit={defaultLimit}
        totalItems={metaData?.total_items}
      />
      {paginationApi.totalPages > 1 && (
        <nav {...paginationApi.rootProps}>
          <div className={classes.pageBoxes}>
            <div {...paginationApi.prevTriggerProps} className={classes.pageBox}>
              <SVG path={chevronLeft} svgClassName={classes.arrowIcon} />
            </div>
            {paginationApi.pages.map((page, i) => {
              if (page.type === 'page')
                return (
                  <div
                    key={page.value}
                    {...paginationApi.getItemProps(page)}
                    className={classes.pageBox}
                  >
                    {page.value}
                  </div>
                )
              else
                return (
                  <div
                    key={`ellipsis-${i}`}
                    {...paginationApi.getEllipsisProps({index: i})}
                    className={classes.pageBox}
                  >
                    <SVG path={threeDots} svgClassName={classes.arrowIcon} />
                  </div>
                )
            })}
            <div {...paginationApi.nextTriggerProps} className={classes.pageBox}>
              <SVG path={chevronRight} svgClassName={classes.arrowIcon} />
            </div>
          </div>
        </nav>
      )}
    </div>
  )
}
