import * as React from 'react'
import TableFilter from './TableHeaderFilter'
import classes from './styles.module.css'
import {useTableStore} from '../store'
import type {FilterConfig, FilterOptions} from '../types'

interface TableHeaderFiltersProps {
  filterConfig: FilterConfig
  filters: FilterOptions[]
}

export default function TableHeaderFilters({filterConfig, filters}: TableHeaderFiltersProps) {
  const {isLoading, isError, filterDispatch, filterReset} = filterConfig

  const tableFilters = useTableStore(s => s.filters)

  const {setDefaultFilters, addFilters, removeFilters, resetFilters, resetAllFilters} =
    useTableStore(s => ({
      setDefaultFilters: s.setDefaultFilters,
      addFilters: s.addFilters,
      removeFilters: s.removeFilters,
      resetFilters: s.resetFilters,
      resetAllFilters: s.resetAllFilters,
    }))

  React.useEffect(() => {
    if (!filters?.length || isLoading) return
    setDefaultFilters(filters?.map(filter => ({key: filter.key, values: []})) || [])
  }, [filters?.length, isLoading])

  if (!filters || !filters.length) return null

  if (isError) return <div className={classes.filtersInfo}>Error getting filters</div>

  if (isLoading) return <div className={classes.filtersInfo}>Getting filters...</div>

  // const selectedFilters = tableFilters.map(filter => filter.values).flat()

  return (
    <div className={classes.filters}>
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
