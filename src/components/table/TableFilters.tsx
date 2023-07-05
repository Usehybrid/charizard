import * as React from 'react'
import * as menu from '@zag-js/menu'
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
  const [checked, setChecked] = React.useState(false)
  //   console.log(filter['id'], 'filter-id')
  const [state, send] = useMachine(
    menu.machine({
      id: filter['id'],
      //   onSelect: ({value}) => {
      //     console.log('hits')
      //     setFilterOptions(state => {
      //       const newState = [...state]
      //       newState.forEach(obj => {
      //         obj.options.forEach(option => {
      //           if (option.value === value) {
      //             console.log(option, value)
      //             option.checked = !option.checked
      //             return
      //           }
      //         })
      //       })
      //       console.log(newState, 'test')
      //       return newState
      //     })
      //   },
    }),
  )
  const api = menu.connect(state, send, normalizeProps)

  return (
    <div>
      <button className={clsx('reset-btn', classes.filter)} {...api.triggerProps}>
        <div className={classes.filterCol}>{filter.name}</div>
        <img src={chevronDown} alt="dropdown" className={classes.filterIcon2} />
      </button>

      <div {...api.positionerProps}>
        <div {...api.contentProps} className={classes.dropdown}>
          <Search search={search} setSearch={setSearch} />

          <div className={classes.options}>
            {filter.options.map((option, idx) => (
              <div key={idx} {...api.getItemProps({id: option.value})} className={classes.option}>
                <input
                  type="checkbox"
                  name={option.name}
                  id={option.value}
                  checked={option.checked}
                  //   onChange={e => {
                  //     console.log(e)
                  //     setFilterOptions(state => {
                  //       const newState = [...state]
                  //       newState.forEach(obj => {
                  //         obj.options.forEach(option => {
                  //           if (option.value === e.target.value) {
                  //             console.log(option.checked, e.target.checked, 'test')
                  //             option.checked = e.target.checked
                  //             return
                  //           }
                  //         })
                  //       })
                  //       return newState
                  //     })
                  //   }}
                  //   checked={checked}
                  //   onChange={e => setChecked(s => !s)}
                />
                <label htmlFor={option.name}>{option.name}</label>
              </div>
            ))}
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
