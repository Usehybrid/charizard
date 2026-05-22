import * as React from 'react'
import ReactSelectAsync from 'react-select/async'
import clsx from 'clsx'
import {components} from 'react-select'
import type {MenuPlacement, StylesConfig} from 'react-select'
import closeIcon from '../assets/close.svg'
import {
  CustomDropdownIndicator,
  CustomIndicatorsContainer,
  CustomLoadingIndicator,
  CustomMenu,
  CustomMultiValue,
  CustomMultiValueRemove,
  CustomOption,
  CustomSingleValue,
} from '../select-v2/Common'
import {styles as selectV2Styles} from '../select-v2/styles'
import selectV2Classes from '../select-v2/styles.module.css'
import {SELECT_VARIANT} from '../select-v2/types'
import {SVG} from '../svg'
import {SelectActionMeta, SelectMultiValue, SelectSingleValue, SelectValue} from './types'

type SelectAsyncOption = {
  label: string
  value: string
  subLabel?: string
  color?: `#${string}`
  profileImgUrl?: string | null
  icon?: string
}

const SelectAsyncClearIndicator = (props: any) => (
  <components.ClearIndicator {...props}>
    <SVG path={closeIcon} spanClassName={selectV2Classes.clearIcon} />
  </components.ClearIndicator>
)

interface SelectAsyncProps {
  /**
   * The options to be displayed in the select
   * should atleast have {label: string, value: string}
   */
  options: (inputValue: string) => Promise<SelectAsyncOption[] | void>
  /**
   * Handle change events on the select
   */
  onChange: (newValue: string | string[], actionMeta: SelectActionMeta) => void
  /**
   * The name of the select
   */
  name?: string
  /**
   * The id of the select
   */
  id?: string
  /**
   * The className of the select
   */
  className?: string
  /**
   * The className of the main container
   */
  mainContainerClassName?: string
  /**
   * The placeholder of the select
   */
  placeholder?: string
  /**
   * Whether the select is searchable
   */
  isSearchable?: boolean
  /**
   * Whether multiple selection is possible
   */
  isMulti?: boolean
  /**
   * Whether the select is clearable
   */
  isClearable?: boolean
  /**
   * The styles of the select component
   */
  selectStyles?: StylesConfig<any>
  /**
   * The SelectV2 styles override alias.
   */
  customStyles?: StylesConfig<any>
  /**
   * The default value of the select
   */
  defaultValue?: any

  //  {label: string; value: string; profileImgUrl?: string}
  /**
   * Formats group labels in the menu as React components
   */
  formatGroupLabel?: (data: any) => React.ReactNode
  /**
   * The custom styles of the select container
   */
  customContainerStyles?: React.CSSProperties
  /**
   * Whether the select is disabled
   */
  isDisabled?: boolean
  /**
   * Default placement of the menu in relation to the control. 'auto' will flip when there isn't enough space below the control.
   */
  menuPlacement?: MenuPlacement
  /**
   * The error message to be displayed
   */
  errorMsg?: string | string[] | false
  /**
   * Defines the SelectV2 option/value presentation.
   */
  variant?: SELECT_VARIANT
  /**
   * Defines whether to add dividers between option list items.
   */
  showDivider?: boolean
  /**
   * extra props to pass for select component
   */
  extraProps?: any
  customValue?: any
}

export function SelectAsync({
  options,
  onChange,
  name,
  id,
  className,
  mainContainerClassName,
  placeholder,
  selectStyles,
  customStyles,
  defaultValue,
  formatGroupLabel,
  customContainerStyles,
  menuPlacement,
  errorMsg,
  variant = SELECT_VARIANT.DEFAULT,
  showDivider = false,
  extraProps,
  isDisabled = false,
  isSearchable = true,
  isMulti = false,
  isClearable = false,
  customValue,
}: SelectAsyncProps) {
  return (
    <div
      onClick={e => e.stopPropagation()}
      style={customContainerStyles}
      className={clsx(
        selectV2Classes.mainContainer,
        isDisabled && selectV2Classes.disabled,
        'zap-content-medium',
        mainContainerClassName,
      )}
    >
      <ReactSelectAsync
        classNamePrefix="react-select"
        value={customValue}
        isMulti={isMulti}
        placeholder={placeholder}
        defaultValue={defaultValue}
        cacheOptions
        defaultOptions
        loadOptions={options}
        maxMenuHeight={170}
        isClearable={isClearable}
        name={name}
        id={id}
        className={clsx(className)}
        isSearchable={isSearchable}
        unstyled
        styles={{
          ...selectV2Styles,
          control: (baseStyles, state) => ({
            ...(selectV2Styles.control?.(baseStyles, state) || baseStyles),
            borderColor: errorMsg
              ? 'var(--status-error)'
              : state.isFocused
              ? '#254DDA'
              : '#E5E9FB',
            ':hover': {
              borderColor: errorMsg ? 'var(--status-error)' : '#254DDA',
            },
          }),
          ...selectStyles,
          ...customStyles,
        }}
        components={{
          Option: CustomOption,
          MultiValue: CustomMultiValue,
          MultiValueRemove: CustomMultiValueRemove,
          DropdownIndicator: CustomDropdownIndicator,
          ClearIndicator: SelectAsyncClearIndicator,
          SingleValue: CustomSingleValue,
          Menu: CustomMenu,
          IndicatorsContainer: CustomIndicatorsContainer,
          LoadingIndicator: CustomLoadingIndicator,
        }}
        isDisabled={isDisabled}
        onChange={(newValue: SelectValue, actionMeta: SelectActionMeta) => {
          if (isMulti) {
            onChange(
              Array.isArray(newValue)
                ? (newValue as SelectMultiValue).map(val => val.value)
                : [],
              actionMeta,
            )
          } else onChange((newValue as SelectSingleValue)?.value ?? '', actionMeta)
        }}
        formatGroupLabel={formatGroupLabel}
        menuPlacement={menuPlacement}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        data-variant={variant}
        data-divider={showDivider}
        hideSelectedOptions={false}
        {...extraProps}
      />
      {errorMsg && (
        <span className={clsx('zap-subcontent-medium', selectV2Classes.errorMsg)}>
          {errorMsg}
        </span>
      )}
    </div>
  )
}
