import * as React from 'react'
import searchIcon from '../assets/search.svg'
import closeIcon from '../assets/close.svg'
import classes from './styles.module.css'

export interface SearchProps {
  id: string
  search?: string
  setSearch?: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
  clearIconClearFn?: any
}

// todo @sohhamm add debounce built in, hover and active state, improve UI and add variations
export function Search({
  id,
  search,
  setSearch,
  placeholder = 'Search',
  clearIconClearFn,
}: SearchProps) {
  const isControlled = typeof setSearch === 'function' && typeof search === 'string'

  return (
    <div className={classes.box}>
      {isControlled ? (
        <input
          id={id}
          type="text"
          className={classes.search}
          placeholder={placeholder}
          value={search}
          onChange={e => {
            setSearch(e.target.value)
          }}
        />
      ) : (
        <input id={id} type="text" className={classes.search} placeholder={placeholder} />
      )}
      <span>
        <img src={searchIcon} alt="search" className={classes.searchIcon} />
      </span>

      {isControlled && search.length !== 0 && (
        <span
          onClick={() => {
            if (typeof clearIconClearFn === 'function') {
              clearIconClearFn()
            }
            setSearch('')
          }}
        >
          <img src={closeIcon} alt="Clear Search" className={classes.clearIcon} />
        </span>
      )}
    </div>
  )
}
