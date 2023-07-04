import * as React from 'react'
import classes from './styles.module.css'
import searchIcon from '../assets/search.svg'
import closeIcon from '../assets/close.svg'

export interface SearchProps {
  search?: string
  setSearch?: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
}

export function Search({search, setSearch, placeholder = 'Search'}: SearchProps) {
  const isControlled = typeof setSearch === 'function' && typeof search === 'string'

  return (
    <div className={classes.box}>
      {isControlled ? (
        <input
          type="text"
          className={classes.search}
          placeholder={placeholder}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      ) : (
        <input type="text" className={classes.search} placeholder={placeholder} />
      )}
      <span>
        <img src={searchIcon} alt="search" className={classes.searchIcon} />
      </span>

      {isControlled && search.length !== 0 && (
        <span onClick={() => setSearch('')}>
          <img src={closeIcon} alt="Clear Search" className={classes.clearIcon} />
        </span>
      )}
    </div>
  )
}
