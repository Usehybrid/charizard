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
}

function InputAddon({
  children,
  placement = 'left',
  isDropdown = false,
  dropdownOptions,
  handleOptionClick = () => {},
}: InputAddonProps) {
  const attr = placement === 'left' ? 'left' : 'right'
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const [search, setSearch] = React.useState('')

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

  const searchFilter = (option: {label: string; value: string}) =>
    (option.label + ' ' + option.value).toLowerCase().includes(search.toLowerCase())

  return (
    <div
      className={clsx(classes.inputAddon, classes[attr])}
      onClick={() => {
        if (isDropdown) {
          setIsDropdownOpen(!isDropdownOpen)
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
            <div className={classes.dropdownContainer}>
              <div className={classes.searchContainer} onClick={e => e.stopPropagation()}>
                <Search search={search} setSearch={setSearch} id="input-add-on-search" />
              </div>
              {dropdownOptions?.filter(searchFilter)?.map(opt => (
                <div
                  className={classes.dropdownOption}
                  key={opt.value}
                  onClick={e => {
                    e.stopPropagation()
                    handleOptionClick(opt)
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
}

export function InputLeftAddon({
  children,
  isDropdown = false,
  dropdownOptions = [],
  handleOptionClick = () => {},
}: InputDirectionAddonProps) {
  return (
    <InputAddon
      placement="left"
      isDropdown={isDropdown}
      dropdownOptions={dropdownOptions}
      handleOptionClick={handleOptionClick}
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
}: InputDirectionAddonProps) {
  return (
    <InputAddon
      placement="right"
      isDropdown={isDropdown}
      dropdownOptions={dropdownOptions}
      handleOptionClick={handleOptionClick}
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
