/**
 * @author Soham Sarkar <soham@hybr1d.io>
 */

import * as React from 'react'
import filterLines from '../../assets/filter-lines.svg'
import TableFilter from './TableFilter'
import classes from './styles.module.css'
import {shallow} from 'zustand/shallow'
import {useTableStore} from '../store'
import type {FilterConfig} from '../types'

interface TableFiltersProps {
  filterConfig: FilterConfig
}

export default function TableFilters({filterConfig}: TableFiltersProps) {
  const {filters, isLoading, isError, filterDispatch} = filterConfig

  const tableFilters = useTableStore(s => s.filters)

  const {setDefaultFilters, addFilters, removeFilters, resetFilters} = useTableStore(
    s => ({
      setDefaultFilters: s.setDefaultFilters,
      addFilters: s.addFilters,
      removeFilters: s.removeFilters,
      resetFilters: s.resetFilters,
    }),
    shallow,
  )

  React.useEffect(() => {
    if (!filters?.length || isLoading) return
    setDefaultFilters(filters?.map(filter => ({key: filter.key, values: []})) || [])
  }, [filters?.length, isLoading])

  if (!filters || !filters.length) return null

  if (isError) return <div className={classes.filtersInfo}>Error getting filters</div>

  if (isLoading) return <div className={classes.filtersInfo}>Getting filters...</div>

  return (
    <div className={classes.filters}>
      <img src={filterLines} alt="filter lines" className={classes.filterIcon} />
      {filters.map((filter, idx) => (
        <TableFilter
          key={filter.id}
          filter={filter}
          tableFilters={tableFilters}
          tableFilter={tableFilters[idx]}
          addFilters={addFilters}
          removeFilters={removeFilters}
          resetFilters={resetFilters}
          filterDispatch={filterDispatch}
        />
      ))}
    </div>
  )
}
