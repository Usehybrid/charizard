import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import {colourStyles} from './config'
import {default as ReactSelect} from 'react-select'
import {MultiValue, components} from 'react-select'
import type {MenuPlacement, SingleValue, ActionMeta, StylesConfig} from 'react-select'

interface SelectProps {
  /**
   * The options to be displayed in the select
   */
  options: Array<{label: string | ''; value: string | ''}> | any
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
  defaultValue?: {label: string; value: string}
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
   * Handle change events on the select
   */
  onChange?: (
    newValue:
      | MultiValue<{
          label: string
          value: string
        }>
      | SingleValue<{
          label: string
          value: string
        }>,
    actionMeta: ActionMeta<{
      label: string
      value: string
    }>,
  ) => void
  /**
   * The error message to be displayed
   */
  errorMsg?: string
  /**
   * extra props to pass for select component
   */
  extraprops?: any
}

export default function Select({
  name,
  id,
  className,
  options,
  placeholder,
  selectStyles,
  defaultValue,
  formatGroupLabel,
  customContainerStyles,
  menuPlacement,
  onChange,
  errorMsg,
  extraprops,
  isDisabled = false,
  isSearchable = true,
  isMulti = false,
  isClearable = false,
}: SelectProps) {
  return (
    <div className="w-100" onClick={e => e.stopPropagation()} style={customContainerStyles}>
      <ReactSelect
        isMulti={isMulti}
        placeholder={placeholder}
        defaultValue={defaultValue}
        options={options}
        maxMenuHeight={170}
        isClearable={isClearable}
        name={name}
        id={id}
        className={className}
        isSearchable={isSearchable}
        styles={{...colourStyles, ...selectStyles}}
        components={{Option}}
        isDisabled={isDisabled}
        onChange={onChange}
        formatGroupLabel={formatGroupLabel}
        menuPlacement={menuPlacement}
        {...extraprops}
      />
      {errorMsg && <p className={classes.errorMsg}>{errorMsg}</p>}
    </div>
  )
}

const Option = (props: any) => {
  return (
    <components.Option
      {...props}
      className={clsx({[classes.subLabelContainer]: props.data.subLabel})}
    >
      <div className={clsx('text-capitalize', classes.label)}>{props.data.label}</div>
      {props.data.subLabel && (
        <div className={clsx('text-muted text-wrap', classes.subLabel)}>{props.data.subLabel}</div>
      )}
    </components.Option>
  )
}
