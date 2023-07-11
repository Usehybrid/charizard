import * as React from 'react'

import Filter from './Filter'
import filterLines from '../../assets/filter-lines.svg'
import classes from './styles.module.css'
import {FilterOptions, SetFilterOptions} from '../types'

interface TableFiltersProps {
  filterOptions: FilterOptions[]
  setFilterOptions: SetFilterOptions
  defaultFilterOptions: FilterOptions[]
}

export default function TableFilters({
  filterOptions,
  setFilterOptions,
  defaultFilterOptions,
}: TableFiltersProps) {
  if (!filterOptions || !filterOptions.length) return null

  return (
    <div className={classes.filters}>
      <img src={filterLines} alt="filter lines" className={classes.filterIcon} />
      {filterOptions.map((filter, idx) => (
        <Filter
          key={filter.id}
          idx={idx}
          filter={filter}
          setFilterOptions={setFilterOptions}
          defaultFilterOptions={defaultFilterOptions}
        />
      ))}
    </div>
  )
}
