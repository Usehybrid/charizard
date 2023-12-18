import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import chevronDownIcon from '../assets/chevron-down.svg'
import {Inputs, Placement} from './types'
import {SVG} from '../svg'
import {Search} from '../search'

interface InputAddonProps {
  /**
   * Children of the input addon
   */
  children: React.ReactNode
  /**
   * Placement of the input addon
   */
  placement?: Placement
  /**
   * to enable dropdown or not
   */
  isDropdown?: boolean
  /**
   * dropdown options
   */
  dropdownOptions?: Array<{label: string; value: string}>
  /**
   * handle dropdown option click
   */
  handleOptionClick?: (selectedOption: {label: string; value: string}) => void
  /**
   * show dropdown search
   */
  showDropdownSearch?: boolean
}

function InputAddon({
  children,
  placement = 'left',
  isDropdown = false,
  dropdownOptions,
  handleOptionClick = () => {},
  showDropdownSearch = true,
}: InputAddonProps) {
  const attr = placement === 'left' ? 'left' : 'right'
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const [search, setSearch] = React.useState('')
  const [isEntirelyVisible, setIsEntirelyVisible] = React.useState(true)

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleClickOutside = (e: any) => {
    if (!dropdownRef.current?.contains(e.target)) {
      setIsDropdownOpen(false)
    }
  }

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false)
      setIsEntirelyVisible(true)
    } else {
      setIsDropdownOpen(true)
      // detect if dropdown would be cut off by the right edge of the screen and reposition it if so
      const dropdownRect = dropdownRef.current?.getBoundingClientRect()
      const dropdownRight = dropdownRect?.right! + dropdownRect?.width!
      const windowRight = window.innerWidth - 100
      if (dropdownRight > windowRight) {
        setIsEntirelyVisible(false)
      }
    }
  }

  const searchFilter = (option: {label: string; value: string}) =>
    (option.label + ' ' + option.value).toLowerCase().includes(search.toLowerCase())

  return (
    <div
      className={clsx(classes.inputAddon, classes[attr])}
      onClick={() => {
        if (isDropdown) {
          toggleDropdown()
        }
      }}
      ref={dropdownRef}
      style={{cursor: isDropdown ? 'pointer' : 'inherit'}}
    >
      {children}
      {isDropdown && (
        <>
          <SVG path={chevronDownIcon} width={20} customSpanStyles={{width: '20px'}} />
          {isDropdownOpen && (
            <div
              className={classes.dropdownContainer}
              style={{
                left: isEntirelyVisible ? '0' : 'inherit',
                right: isEntirelyVisible ? 'inherit' : '0',
                paddingTop: showDropdownSearch ? '0' : '12px',
              }}
            >
              {showDropdownSearch && (
                <div className={classes.searchContainer} onClick={e => e.stopPropagation()}>
                  <Search search={search} setSearch={setSearch} id="input-add-on-search" />
                </div>
              )}
              {dropdownOptions?.filter(searchFilter)?.map(opt => (
                <div
                  className={classes.dropdownOption}
                  key={opt.value}
                  onClick={e => {
                    e.stopPropagation()
                    handleOptionClick(opt)
                    toggleDropdown()
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

interface InputDirectionAddonProps {
  /**
   * Children of the input addon
   */
  children: React.ReactNode
  /**
   * to enable dropdown or not
   */
  isDropdown?: boolean
  /**
   * dropdown options
   */
  dropdownOptions?: Array<{label: string; value: string}>
  /**
   * handle dropdown option click
   */
  handleOptionClick?: (selectedOption: {label: string; value: string}) => void
  /**
   * show dropdown search
   */
  showDropdownSearch?: boolean
}

export function InputLeftAddon({
  children,
  isDropdown = false,
  dropdownOptions = [],
  handleOptionClick = () => {},
  showDropdownSearch = true,
}: InputDirectionAddonProps) {
  return (
    <InputAddon
      placement="left"
      isDropdown={isDropdown}
      dropdownOptions={dropdownOptions}
      handleOptionClick={handleOptionClick}
      showDropdownSearch={showDropdownSearch}
    >
      {children}
    </InputAddon>
  )
}

export function InputRightAddon({
  children,
  isDropdown = false,
  dropdownOptions = [],
  handleOptionClick = () => {},
  showDropdownSearch = true,
}: InputDirectionAddonProps) {
  return (
    <InputAddon
      placement="right"
      isDropdown={isDropdown}
      dropdownOptions={dropdownOptions}
      handleOptionClick={handleOptionClick}
      showDropdownSearch={showDropdownSearch}
    >
      {children}
    </InputAddon>
  )
}

InputAddon.displayName = Inputs.INPUT_ADDON
InputAddon.id = Inputs.INPUT_ADDON

InputLeftAddon.displayName = Inputs.INPUT_LEFT_ADDON
InputLeftAddon.id = Inputs.INPUT_LEFT_ADDON

InputRightAddon.displayName = Inputs.INPUT_RIGHT_ADDON
InputRightAddon.id = Inputs.INPUT_RIGHT_ADDON
