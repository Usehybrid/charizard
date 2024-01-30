import * as React from 'react'
import classes from './table-pagination.module.css'
import clsx from 'clsx'
import {TableV2Props} from '../TableV2'

interface TablePaginationProps {
  paginationConfig?: TableV2Props['paginationConfig']
}

export default function TablePagination({paginationConfig}: TablePaginationProps) {
  const handleGoToFirstPage = () => {}
  const handleGoToLastPage = () => {}

  const handleBack = () => {}
  const handleNext = () => {}

  return (
    <div className={classes.box}>
      <div className={classes.left}>
        Showing
        {<span>10</span>}
        out of 123 results
      </div>

      {/* <select
        value={table.getState().pagination.pageSize}
        onChange={e => {
          table.setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select> */}

      <div className={classes.pageBoxes}>
        <button
          className={clsx('hybr1d-ui-reset-btn', classes.pageBox)}
          onClick={handleGoToFirstPage}
          // disabled={}
        >
          {'<<'}
        </button>
        <button
          className={clsx('hybr1d-ui-reset-btn', classes.pageBox)}
          onClick={handleBack}
          //   disabled={{}}
        >
          {'<'}
        </button>
        <button
          className={clsx('hybr1d-ui-reset-btn', classes.pageBox)}
          onClick={handleNext}
          //   disabled={{}}
        >
          {'>'}
        </button>
        <button
          className={clsx('hybr1d-ui-reset-btn', classes.pageBox)}
          onClick={handleGoToLastPage}
          //   disabled={{}}
        >
          {'>>'}
        </button>
      </div>
    </div>
  )
}
