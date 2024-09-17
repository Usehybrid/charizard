import * as React from 'react'
import history from '../../assets/history.svg'
import TableFilter from './TableFilter'
import classes from './styles.module.css'
import {useTableStore} from '../store'
import type {FilterConfig} from '../types'

type TableFiltersProps = {
  filterConfig: FilterConfig
}

export default function TableFilters({filterConfig}: TableFiltersProps) {
  const {filters, isLoading, isError, filterDispatch, filterReset} = filterConfig

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

  const selectedFilters = tableFilters.map(filter => filter.values).flat()

  return (
    <div className={classes.filters}>
      {selectedFilters.length > 0 && (
        <img
          title="Reset filters"
          src={history}
          alt="reset all filters"
          className={classes.resetIcon2}
          onClick={() => {
            resetAllFilters(filterReset)
          }}
        />
      )}
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
