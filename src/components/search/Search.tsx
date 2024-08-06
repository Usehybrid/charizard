import * as React from 'react'
import searchIcon from '../assets/search.svg'
import closeIcon from '../assets/close.svg'
import classes from './styles.module.css'
import clsx from 'clsx'

export interface SearchProps {
  id: string
  search?: string
  setSearch?: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
  clearIconClearFn?: any
  customStyles?: {
    customInputStyles?: React.CSSProperties
    customIconStyles?: React.CSSProperties
  }
  disabled?: boolean
}

// todo @sohhamm add debounce built in, hover and active state, improve UI and add variations
export function Search({
  id,
  search,
  setSearch,
  placeholder = 'Search',
  clearIconClearFn,
  customStyles,
  disabled = false,
}: SearchProps) {
  const isControlled = typeof setSearch === 'function' && typeof search === 'string'

  const customInputStyles = customStyles?.customInputStyles
  const customIconStyles = customStyles?.customIconStyles

  return (
    <div className={classes.box}>
      {isControlled ? (
        <input
          id={id}
          type="text"
          className={clsx(classes.search, disabled && classes.searchDisabled, 'zap-content-medium')}
          placeholder={placeholder}
          value={search}
          onChange={e => {
            setSearch(e.target.value)
          }}
          style={customInputStyles}
          disabled={disabled}
        />
      ) : (
        <input
          id={id}
          type="text"
          className={clsx(classes.search, disabled && classes.searchDisabled, 'zap-content-medium')}
          placeholder={placeholder}
          style={customInputStyles}
          disabled={disabled}
        />
      )}
      <span>
        <img
          src={searchIcon}
          alt="search"
          className={classes.searchIcon}
          style={customIconStyles}
        />
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
          <img
            src={closeIcon}
            alt="Clear Search"
            className={classes.clearIcon}
            style={customIconStyles}
          />
        </span>
      )}
    </div>
  )
}
