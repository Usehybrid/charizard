import * as React from 'react'
import classes from './styles.module.css'
import searchIcon from '../assets/search.svg'

export interface SearchProps {
  search?: string
  setSearch?: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
}

export function Search({search, setSearch, placeholder = 'Search'}: SearchProps) {
  return (
    <div className={classes.box}>
      {search && setSearch ? (
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
    </div>
  )
}
