import {useTableStore} from '../store'
import {FILTER_TYPE, type FilterConfig} from '../types'
import TableHeaderDateRangeFilter from './TableHeaderDateRangeFilter'
import TableHeaderFilter from './TableHeaderFilter'
import classes from './styles.module.css'
import TableHeaderSelectors from './TableHeaderSelectors'

interface TableHeaderFiltersProps {
  filterConfig: FilterConfig
  showTabs?: boolean
}

export default function TableHeaderFilters({
  filterConfig,
  showTabs = false,
}: TableHeaderFiltersProps) {
  const {isLoading, isError, filterDispatch} = filterConfig

  const filters = filterConfig.filters?.header || []

  const tableFilters = useTableStore(s => s.filters)

  const {addFilters, removeFilters, resetFilters} = useTableStore(s => ({
    addFilters: s.addFilters,
    removeFilters: s.removeFilters,
    resetFilters: s.resetFilters,
  }))

  if (isError) return <div className={classes.filtersInfo}>Error getting filters</div>

  if (isLoading) return <div className={classes.filtersInfo}>Getting filters...</div>

  // const selectedFilters = tableFilters.map(filter => filter.values).flat()

  return (
    <div className={classes.filters}>
      {filters.map(filter => {
        const tableFilter = tableFilters.find(tf => tf.key === filter.key)!

        const filterProps = {
          filter,
          tableFilters,
          tableFilter,
          addFilters,
          removeFilters,
          resetFilters,
          filterDispatch,
        }

        switch (filter.type) {
          case FILTER_TYPE.DATE_RANGE:
            if (!showTabs) {
              return <TableHeaderDateRangeFilter key={filter.id} {...filterProps} />
            }
            break
          case FILTER_TYPE.TAB:
            if (showTabs) {
              return <TableHeaderSelectors key={filter.id} {...filterProps} />
            }
            break
          default:
            if (!showTabs) {
              return <TableHeaderFilter key={filter.id} {...filterProps} />
            }
            break
        }
        return null
      })}
    </div>
  )
}
