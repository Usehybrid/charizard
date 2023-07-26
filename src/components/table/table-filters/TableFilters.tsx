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

  useDeepCompareEffect(() => {
    if (!setFilters) return
    tableFilters.forEach(filter => {
      if (!filter.values.length) return
      filter.values.forEach(value => {
        setFilters({filterType: filter.key, value})
      })
    })
  }, [tableFilters])

  if (!filters || !filters.length) return null

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
