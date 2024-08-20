import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import {InputAdornmentProps, INPUT_COMPONENTS, DropdownOption} from './types'
import {SVG} from '../svg'
import * as menu from '@zag-js/menu'
import {useMachine, normalizeProps} from '@zag-js/react'
import chevronDownIcon from '../assets/chevron-down-16.svg'
import {SearchV2} from '../search-v2'

export function InputLeftAdornment({
  children,
  isLoading = false,
  disabled,
  isDropdown,
  options,
  hideSearch = false,
  onOptionSelect,
}: InputAdornmentProps) {
  const [search, setSearch] = React.useState('')
  const [state, send] = useMachine(
    menu.machine({
      id: React.useId(),
      onSelect(val) {
        if (isDropdown) {
          onOptionSelect(val.value)
        }
      },
      onOpenChange(val) {
        if (!val.open) {
          setSearch('')
        }
      },
    }),
  )

  const api = menu.connect(state, send, normalizeProps)

  const filteredOptions = options?.filter((option: DropdownOption) => {
    return `${option.label}${option.value}`.toLowerCase().includes(search.toLowerCase())
  })

  if (!isDropdown) {
    return (
      <div className={clsx(classes.adornment, classes.left, disabled && classes.disabled)}>
        <span className="zap-content-medium">{children}</span>
      </div>
    )
  }
  return (
    <>
      <button
        className={clsx(
          'zap-reset-btn',
          classes.adornmentTrigger,
          classes.left,
          disabled && classes.disabled,
        )}
        {...(!disabled ? api.getTriggerProps() : {})}
      >
        <span className="zap-content-medium">{children}</span>
        <SVG
          path={chevronDownIcon}
          spanClassName={clsx(classes.dropdownIconContainer, api.open && classes.isDropdownOpen)}
          svgClassName={classes.dropdownIcon}
        />
      </button>
      <div {...api.getPositionerProps()} className={classes.dropdownMenuContainer}>
        <ul
          {...api.getContentProps()}
          className={clsx('zap-subcontent-medium', classes.menu)}
          onKeyDown={() => {}}
        >
          {isLoading ? (
            <div className={classes.loadingContainer}>
              <span className={classes.loadingMessage}>Loading options...</span>
            </div>
          ) : (
            <>
              {!hideSearch && (
                <div className={classes.dropdownSearch}>
                  <SearchV2 search={search} setSearch={setSearch} placeholder="Search" />
                </div>
              )}
              {filteredOptions?.length ? (
                filteredOptions?.map(option => {
                  return (
                    <li
                      key={option.value}
                      {...api.getItemProps({value: option.value})}
                      className={classes.option}
                    >
                      {option.label}
                    </li>
                  )
                })
              ) : (
                <div className={classes.empty}>No options found</div>
              )}
            </>
          )}
        </ul>
      </div>
    </>
  )
}

export function InputRightAdornment({
  children,
  isLoading = false,
  disabled,
  isDropdown,
  options,
  hideSearch = false,
  onOptionSelect,
}: InputAdornmentProps) {
  const [search, setSearch] = React.useState('')
  const [state, send] = useMachine(
    menu.machine({
      id: React.useId(),
      onSelect(val) {
        if (isDropdown) {
          onOptionSelect(val.value)
        }
      },
      onOpenChange(val) {
        if (!val.open) {
          setSearch('')
        }
      },
    }),
  )

  const api = menu.connect(state, send, normalizeProps)

  const filteredOptions = options?.filter((option: DropdownOption) => {
    return `${option.label}${option.value}`.toLowerCase().includes(search.toLowerCase())
  })

  if (!isDropdown) {
    return (
      <div className={clsx(classes.adornment, classes.right, disabled && classes.disabled)}>
        <span className="zap-content-medium">{children}</span>
      </div>
    )
  }

  return (
    <>
      <button
        className={clsx(
          'zap-reset-btn',
          classes.adornmentTrigger,
          classes.right,
          disabled && classes.disabled,
        )}
        {...(!disabled ? api.getTriggerProps() : {})}
      >
        <span className="zap-content-medium">{children}</span>
        <SVG
          path={chevronDownIcon}
          spanClassName={clsx(classes.dropdownIconContainer, api.open && classes.isDropdownOpen)}
          svgClassName={classes.dropdownIcon}
        />
      </button>
      <div {...api.getPositionerProps()} className={classes.dropdownMenuContainer}>
        <ul {...api.getContentProps()} className={clsx('zap-subcontent-medium', classes.menu)}>
          {isLoading ? (
            <div className={classes.loadingContainer}>
              <span className={classes.loadingMessage}>Loading options...</span>
            </div>
          ) : (
            <>
              {!hideSearch && (
                <div className={classes.dropdownSearch}>
                  <SearchV2 search={search} setSearch={setSearch} placeholder="Search" />
                </div>
              )}
              {filteredOptions?.length ? (
                filteredOptions?.map(option => {
                  return (
                    <li
                      key={option.value}
                      {...api.getItemProps({value: option.value})}
                      className={classes.option}
                    >
                      {option.label}
                    </li>
                  )
                })
              ) : (
                <div className={classes.empty}>No options found</div>
              )}
            </>
          )}
        </ul>
      </div>
    </>
  )
}

InputLeftAdornment.displayName = INPUT_COMPONENTS.LEFT_ADORNMENT
InputRightAdornment.displayName = INPUT_COMPONENTS.RIGHT_ADORNMENT
