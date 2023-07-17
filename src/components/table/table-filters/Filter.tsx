import * as React from 'react'
import * as menu from '@zag-js/menu'
import clsx from 'clsx'
import {SVG} from '../../svg'
import FilterCheckbox from './FilterCheckbox'
import chevronDown from '../../assets/chevron-down.svg'
import resetIcon from '../../assets/rotate-left.svg'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {Search} from '../../search'
import {FilterOptions, SetFilterOptions} from '../types'

interface FilterProps {
  filter: FilterOptions
  setFilterOptions: SetFilterOptions
  defaultFilterOptions: FilterOptions[]
  idx: number
}

export default function Filter({filter, setFilterOptions, defaultFilterOptions, idx}: FilterProps) {
  const [search, setSearch] = React.useState('')
  const [state, send] = useMachine(
    menu.machine({
      id: filter['id'],
      closeOnSelect: false,
    }),
  )
  const api = menu.connect(state, send, normalizeProps)

  const filteredOptions = filter.options.filter(option =>
    option.name.toLowerCase().includes(search.toLowerCase()),
  )

  const selectedFilters = filter.options.reduce((acc, curr) => (curr.checked ? acc + 1 : acc), 0)

  const handleResetFilter = () => {
    setFilterOptions(state => {
      const newState = [...state]
      newState[idx] = defaultFilterOptions[idx]
      return newState
    })
    api.close()
  }

  return (
    <div>
      <button
        className={clsx('reset-btn', classes.filter, api.isOpen && classes.filterActive)}
        {...api.triggerProps}
      >
        <div className={classes.filterCol}>{filter.name}</div>
        {selectedFilters !== 0 && <span className={classes.totalSelected}>{selectedFilters}</span>}
        <img src={chevronDown} alt="dropdown" className={classes.filterIcon2} />
      </button>

      <div {...api.positionerProps} className={classes.positioner}>
        {api.isOpen && (
          <div {...api.contentProps} className={classes.dropdown} onKeyDown={() => {}}>
            {!filter.config?.hideSearch && (
              <div className={classes.dropdownSearch}>
                <Search
                  id="filter-search"
                  search={search}
                  setSearch={setSearch}
                  placeholder="Search"
                />
              </div>
            )}

            <div className={classes.options}>
              {filteredOptions.length === 0 ? (
                <div className={classes.optionsEmpty}>No results found</div>
              ) : (
                filteredOptions.map((option, idx) => (
                  <div
                    key={idx}
                    {...api.getItemProps({id: option.value})}
                    className={classes.option}
                  >
                    <FilterCheckbox
                      label={option.name}
                      value={option.value}
                      setFilterOptions={setFilterOptions}
                      checked={option.checked}
                    />
                  </div>
                ))
              )}
            </div>

            <div className={classes.footer}>
              <div className={classes.selectedFilters}>{selectedFilters} selected</div>

              <button className={clsx('reset-btn', classes.resetBtn)} onClick={handleResetFilter}>
                <SVG path={resetIcon} svgClassName={classes.resetIcon} />
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
