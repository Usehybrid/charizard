import * as React from 'react'
import * as menu from '@zag-js/menu'
import * as checkbox from '@zag-js/checkbox'
import clsx from 'clsx'
import filterLines from '../assets/filter-lines.svg'
import chevronDown from '../assets/chevron-down.svg'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {FilterOptions} from './Table'
import {Search} from '../search'

type SetFilterOptions = React.Dispatch<React.SetStateAction<FilterOptions[]>>
//   | ((options: FilterOptions[]) => void)

interface TableFiltersProps {
  filterOptions: FilterOptions[]
  setFilterOptions: SetFilterOptions
}

export default function TableFilters({filterOptions, setFilterOptions}: TableFiltersProps) {
  if (!filterOptions || !filterOptions.length) return null
  console.log(filterOptions)
  return (
    <div className={classes.filters}>
      <img src={filterLines} alt="filter lines" className={classes.filterIcon} />
      {filterOptions.map(filter => (
        <Filter key={filter.id} filter={filter} setFilterOptions={setFilterOptions} />
      ))}
    </div>
  )
}
function Filter({
  filter,
  setFilterOptions,
}: {
  filter: FilterOptions
  setFilterOptions: SetFilterOptions
}) {
  const [search, setSearch] = React.useState('')
  //   console.log(filter['id'], 'filter-id')
  const [state, send] = useMachine(
    menu.machine({
      id: filter['id'],
      onSelect: ({value}) => {
        setFilterOptions(state => {
          const newState = [...state]
          newState.forEach(obj => {
            obj.options.forEach(option => {
              if (option.value === value) {
                console.log(option, value)
                option.checked = !option.checked
                return
              }
            })
          })
          return newState
        })
      },
    }),
  )
  const api = menu.connect(state, send, normalizeProps)

  const filteredOptions = filter.options.filter(option =>
    option.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div>
      <button className={clsx('reset-btn', classes.filter)} {...api.triggerProps}>
        <div className={classes.filterCol}>{filter.name}</div>
        <img src={chevronDown} alt="dropdown" className={classes.filterIcon2} />
      </button>

      <div {...api.positionerProps}>
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
                <div key={idx} {...api.getItemProps({id: option.value})} className={classes.option}>
                  <Checkbox label={option.name} value={option.value} />
                </div>
              ))
            )}
          </div>

          <div className={classes.footer}>
            <div className={classes.selectedFilters}>{4} selected</div>

            <button className={clsx('reset-btn', classes.resetBtn)}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Checkbox({label, value}: {label: string; value: string}) {
  const [state, send] = useMachine(checkbox.machine({id: value, name: label}))

  const api = checkbox.connect(state, send, normalizeProps)

  return (
    <label {...api.rootProps} className={classes.optionLabel}>
      <div {...api.controlProps} />
      <span {...api.labelProps}>{label}</span>
      <input {...api.inputProps} />
    </label>
  )
}
