import * as React from 'react'
import * as select from '@zag-js/select'
import * as pagination from '@zag-js/pagination'
import clsx from 'clsx'
import chevronLeft from '../../assets/chevron-left.svg'
import chevronRight from '../../assets/chevron-right.svg'
import threeDots from '../../assets/three-dots.svg'
import TableLimit from './TableLimit'
import classes from './table-pagination.module.css'
import {useMachine, normalizeProps, Portal} from '@zag-js/react'
import {TableV2Props} from '../TableV2'
import {SVG} from '../../svg'

interface TablePaginationProps {
  paginationConfig: TableV2Props['paginationConfig']
}

export default function TablePagination({paginationConfig}: TablePaginationProps) {
  if (!paginationConfig) return null
  const {setLimit, defaultLimit, metaData} = paginationConfig
  const [state, send] = useMachine(
    pagination.machine({
      id: React.useId(),
      count: metaData?.total_items || 0,
      onPageChange(details) {
        paginationConfig?.setPage(details.page - 1)
      },
    }),
  )

  const paginationApi = pagination.connect(state, send, normalizeProps)

  console.log(paginationApi, 'pAPI')

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
