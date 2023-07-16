import * as React from 'react'
import ReactSelectAsync from 'react-select/async'
import clsx from 'clsx'
import classes from './styles.module.css'
import {colourStyles, getControlStyles} from './config'
import type {MenuPlacement, StylesConfig} from 'react-select'
import {
  Option,
  ClearIndicator,
  DropdownIndicator,
  MultiValueLabel,
  MultiValueRemove,
} from './Common'
import {SelectActionMeta, SelectMultiValue, SelectSingleValue, SelectValue} from './types'

interface SelectAsyncProps {
  /**
   * The options to be displayed in the select
   * should atleast have {label: string, value: string}
   */
  options: Array<{label: string | ''; value: string | ''; imgUrl?: string}>
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
   * The default value of the select
   */
  defaultValue?: {label: string; value: string; imgUrl?: string | null}[]
  //  {label: string; value: string; imgUrl?: string}
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
   * extra props to pass for select component
   */
  extraProps?: any
}

export function SelectAsync({
  options,
  onChange,
  name,
  id,
  className,
  placeholder,
  selectStyles,
  defaultValue,
  formatGroupLabel,
  customContainerStyles,
  menuPlacement,
  errorMsg,
  extraProps,
  isDisabled = false,
  isSearchable = true,
  isMulti = false,
  isClearable = false,
}: SelectAsyncProps) {
  return (
    <div
      onClick={e => e.stopPropagation()}
      style={customContainerStyles}
      className={classes.selectContainer}
    >
      <ReactSelectAsync
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
        styles={{...colourStyles, ...getControlStyles(errorMsg), ...selectStyles}}
        components={{Option, MultiValueLabel, MultiValueRemove, DropdownIndicator, ClearIndicator}}
        isDisabled={isDisabled}
        onChange={(newValue: SelectValue, actionMeta: SelectActionMeta) => {
          if (isMulti) {
            onChange(
              (newValue as SelectMultiValue).map(val => val.value),
              actionMeta,
            )
          } else onChange((newValue as SelectSingleValue)?.value ?? '', actionMeta)
        }}
        formatGroupLabel={formatGroupLabel}
        menuPlacement={menuPlacement}
        {...extraProps}
      />
      {errorMsg && <p className={classes.errorMsg}>{errorMsg}</p>}
    </div>
  )
}
