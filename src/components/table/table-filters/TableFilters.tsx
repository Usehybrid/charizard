import * as React from 'react'

import TableFilter from './TableFilter'
import filterLines from '../../assets/filter-lines.svg'
import classes from './styles.module.css'
import {FilterConfig, InternalTableFilters, SetInternalTableFilters} from '../types'
import useDeepCompareEffect from 'use-deep-compare-effect'

interface TableFiltersProps {
  filterConfig: FilterConfig
  tableFilters: InternalTableFilters[]
  setTableFilters: SetInternalTableFilters
}

export default function TableFilters({
  filterConfig,
  tableFilters,
  setTableFilters,
}: TableFiltersProps) {
  const {filters, setFilters, isLoading, isError} = filterConfig
  if (!filters || !filters.length) return null

  useDeepCompareEffect(() => {
    console.log('extra')

    console.log(tableFilters)

    tableFilters.forEach(filter => {
      if (!filter.values.length) return
      let stringifiedQuery = ''

      filter.values.forEach(value => {
        // stringifiedQuery += `${filter.key}=${value}`
        setFilters({filterType: filter.key, value})
      })
    })
  }, [tableFilters])

  if (isError) return <div className={classes.filtersInfo}>Error getting filters</div>

  if (isLoading) return <div className={classes.filtersInfo}>Getting filters...</div>

  return (
    <div className={classes.filters}>
      <img src={filterLines} alt="filter lines" className={classes.filterIcon} />
      {filters.map((filter, idx) => (
        <TableFilter
          key={filter.id}
          idx={idx}
          filter={filter}
          tableFilters={tableFilters}
          setTableFilters={setTableFilters}
        />
      ))}
    </div>
  )
}
