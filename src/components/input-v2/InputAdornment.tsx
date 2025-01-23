import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import {InputAdornmentProps, INPUT_COMPONENTS, DropdownOption} from './types'
import {SVG} from '../svg'
import * as menu from '@zag-js/menu'
import {useMachine, normalizeProps} from '@zag-js/react'
import chevronDownIcon from '../assets/chevron-down-16.svg'
import {SearchV2} from '../search-v2'

/**
 * Component for rendering an adornment on the left side of an input.
 * It can either display static content or function as a dropdown trigger.
 *
 * @param {InputAdornmentProps} props - The properties for the InputLeftAdornment component.
 * @param {React.ReactNode} props.children - The content to display inside the adornment.
 * @param {boolean} [props.isLoading=false] - Indicates if the dropdown is in a loading state.
 * @param {boolean} [props.disabled] - Whether the adornment is disabled.
 * @param {boolean} [props.isDropdown] - Whether the adornment is a dropdown trigger.
 * @param {DropdownOption[]} [props.options] - Options to display in the dropdown.
 * @param {boolean} [props.hideSearch=false] - Whether to hide the search input in the dropdown.
 * @param {(value: string) => void} [props.onOptionSelect] - Callback for when an option is selected.
 *
 * @returns {JSX.Element} The left adornment for an input field.
 *
 * @example
 *  <InputGroupV2>
 *   <InputV2 />
 *   <InputLeftAdornment>...</InputLeftAdornment>
 * </InputGroupV2>
 *
 * @example
 *  <InputGroupV2>
 *   <InputLeftAdornment isDropdown options={options} onOptionSelect={handleSelect}>...</InputLeftAdornment>
 *   <InputV2 />
 * </InputGroupV2>
 */
export function InputLeftAdornment({
  children,
  isLoading = false,
  disabled = false,
  isDropdown,
  options,
  hideSearch = false,
  onOptionSelect,
  onclick,
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
      <div
        className={clsx(classes.adornment, classes.left, disabled && classes.disabled)}
        onClick={onclick}
      >
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

/**
 * Component for rendering an adornment on the right side of an input.
 * It can either display static content or function as a dropdown trigger.
 *
 * @param {InputAdornmentProps} props - The properties for the InputRightAdornment component.
 * @param {React.ReactNode} props.children - The content to display inside the adornment.
 * @param {boolean} [props.isLoading=false] - Indicates if the dropdown is in a loading state.
 * @param {boolean} [props.disabled] - Whether the adornment is disabled.
 * @param {boolean} [props.isDropdown] - Whether the adornment is a dropdown trigger.
 * @param {DropdownOption[]} [props.options] - Options to display in the dropdown.
 * @param {boolean} [props.hideSearch=false] - Whether to hide the search input in the dropdown.
 * @param {(value: string) => void} [props.onOptionSelect] - Callback for when an option is selected.
 *
 * @returns {JSX.Element} The right adornment for an input field.
 *
 * @example
 *  <InputGroupV2>
 *   <InputV2 />
 *   <InputRightAdornment>...</InputRightAdornment>
 * </InputGroupV2>
 *
 * @example
 *  <InputGroupV2>
 *   <InputRightAdornment isDropdown options={options} onOptionSelect={handleSelect}>...</InputRightAdornment>
 *   <InputV2 />
 * </InputGroupV2>
 */
export function InputRightAdornment({
  children,
  isLoading = false,
  disabled = false,
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
