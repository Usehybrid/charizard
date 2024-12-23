import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import {colourStyles, getControlStyles} from './config'
import {default as ReactSelect} from 'react-select'
import type {MenuPlacement, StylesConfig} from 'react-select'
import {
  Option,
  ClearIndicator,
  DropdownIndicator,
  MultiValueLabel,
  MultiValueRemove,
  SingleValue,
} from './Common'
import {SelectActionMeta, SelectMultiValue, SelectSingleValue, SelectValue} from './types'

interface SelectProps {
  /**
   * The options to be displayed in the select
   * should atleast have {label: string, value: string}
   */
  options: Array<{label: string | ''; value: string | ''; profileImgUrl?: string}> | any
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
  defaultValue?: {label: string; value: string; profileImgUrl?: string}
  /**
   * Formats group labels in the menu as React components
   */
  formatGroupLabel?: (data: any) => React.ReactNode
  /**
   * The custom styles of the select container
   */
  customContainerStyles?: React.CSSProperties
  customErrorStyles?: React.CSSProperties
  isDisabled?: boolean
  /**
   * Default placement of the menu in relation to the control. 'auto' will flip when there isn't enough space below the control.
   */
  menuPlacement?: MenuPlacement
  /**
   * The error message to be displayed
   */
  errorMsg?: string | false
  /**
   * extra props to pass for select component
   */
  extraprops?: any
  /**
   * props to add custom dropdown
   */
  CustomDropdownIndicator?: React.ReactNode
  customValue?: any
}

export function Select({
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
  customErrorStyles,
  menuPlacement,
  errorMsg,
  extraprops,
  isDisabled = false,
  isSearchable = true,
  isMulti = false,
  isClearable = false,
  customValue,
  CustomDropdownIndicator,
}: SelectProps) {
  return (
    <div
      onClick={e => e.stopPropagation()}
      style={customContainerStyles}
      className={classes.selectContainer}
    >
      <ReactSelect
        value={customValue}
        isMulti={isMulti}
        placeholder={placeholder}
        defaultValue={defaultValue}
        options={options}
        maxMenuHeight={170}
        isClearable={isClearable}
        name={name}
        id={id}
        className={clsx(className)}
        isSearchable={isSearchable}
        styles={{...colourStyles, ...getControlStyles(errorMsg), ...selectStyles}}
        components={{
          Option,
          MultiValueLabel,
          MultiValueRemove,
          DropdownIndicator: CustomDropdownIndicator ? CustomDropdownIndicator : DropdownIndicator,
          ClearIndicator,
          SingleValue,
        }}
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
        menuPosition="fixed"
        {...extraprops}
      />
      {errorMsg && (
        <p className={classes.errorMsg} style={customErrorStyles}>
          {errorMsg}
        </p>
      )}
    </div>
  )
}
