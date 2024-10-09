import * as React from 'react'
import {useTableStore} from '../store'
import {FILTER_TYPE, type FilterConfig, type FilterOptions} from '../types'
import TableHeaderDateRangeFilter from './TableHeaderDateRangeFilter'
import TableHeaderFilter from './TableHeaderFilter'
import classes from './styles.module.css'

interface TableHeaderFiltersProps {
  filterConfig: FilterConfig
  filters: FilterOptions[]
}

export default function TableHeaderFilters({filterConfig, filters}: TableHeaderFiltersProps) {
  const {isLoading, isError, filterDispatch} = filterConfig

  const tableFilters = useTableStore(s => s.filters)

  const {setDefaultFilters, addFilters, removeFilters, resetFilters} = useTableStore(s => ({
    setDefaultFilters: s.setDefaultFilters,
    addFilters: s.addFilters,
    removeFilters: s.removeFilters,
    resetFilters: s.resetFilters,
    resetAllFilters: s.resetAllFilters,
  }))

  React.useEffect(() => {
    if (!filters?.length || isLoading) return
    setDefaultFilters(
      filters?.map(filter => {
        return {
          key: filter.key,
          values: filter.type === FILTER_TYPE.DATE_RANGE ? '' : [],
          type: filter.type,
        }
      }) || [],
    )
  }, [filters?.length, isLoading])

  if (!filters || !filters.length) return null

  if (isError) return <div className={classes.filtersInfo}>Error getting filters</div>

  if (isLoading) return <div className={classes.filtersInfo}>Getting filters...</div>

  // const selectedFilters = tableFilters.map(filter => filter.values).flat()

  return (
    <div className={classes.filters}>
      {filters.map(filter => {
        const tableFilter = tableFilters.find(tf => tf.key === filter.key)!

        const filterProps = {
          key: filter.id,
          filter: filter,
          tableFilters: tableFilters,
          tableFilter: tableFilter,
          addFilters: addFilters,
          removeFilters: removeFilters,
          resetFilters: resetFilters,
          filterDispatch: filterDispatch,
        }

        if (filter.type === FILTER_TYPE.DATE_RANGE) {
          return <TableHeaderDateRangeFilter {...filterProps} />
        }
        return <TableHeaderFilter {...filterProps} />
      })}
    </div>
  )
}
