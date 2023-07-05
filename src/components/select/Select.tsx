import * as React from 'react'
import clsx from 'clsx'
import SVG from '../svg'
import closeIcon from '../assets/close.svg'
import chevronDownIcon from '../assets/chevron-down.svg'
import classes from './styles.module.css'
import {colourStyles} from './config'
import {default as ReactSelect} from 'react-select'
import {MultiValue, components} from 'react-select'
import type {MenuPlacement, SingleValue, ActionMeta, StylesConfig} from 'react-select'

export type SelectMultiValue = MultiValue<{
  label: string
  value: string
}>

export type SelectSingleValue = SingleValue<{
  label: string
  value: string
}>

export type SelectValue = SelectMultiValue | SelectSingleValue

export type SelectActionMeta = ActionMeta<{
  label: string
  value: string
}>

interface HUISelectProps {
  /**
   * The options to be displayed in the select
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
  errorMsg?: string
  /**
   * extra props to pass for select component
   */
  extraprops?: any
}

export default function HUISelect({
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
  extraprops,
  isDisabled = false,
  isSearchable = true,
  isMulti = false,
  isClearable = false,
}: HUISelectProps) {
  const controlErrorStyles: StylesConfig<any> = {
    control: (styles, {isDisabled, isFocused}) => ({
      ...styles,
      backgroundColor: isDisabled ? '#f5f5f8' : 'transparent',
      color: '#171718',
      border: '1px solid #e2e0eb',
      borderColor: errorMsg
        ? '#de350b !important'
        : isFocused
        ? '#6c5bd2 !important'
        : '#e2e0eb !important',
      fontSize: '16px',
      boxShadow: 'none',
      transition: 'all 0.3s ease-in-out',
      ':hover': {
        borderColor: errorMsg ? '#de350b !important' : '#6c5bd2 !important',
      },
      ':focus-within': {
        boxShadow: errorMsg ? '#de350b !important' : '#6c5bd2 !important',
      },
    }),
  }

  return (
    <div
      onClick={e => e.stopPropagation()}
      style={customContainerStyles}
      className={classes.selectContainer}
    >
      <ReactSelect
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
        styles={{...colourStyles, ...selectStyles, ...controlErrorStyles}}
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
      className={clsx({[classes.subLabelContainer]: props.data.subLabel}, classes.optionContainer)}
    >
      <div className={clsx(classes.label)}>
        {props.data.profileImgUrl && (
          <img
            src={props.data.profileImgUrl}
            className={classes.profileImg}
            alt={props.data.label}
          />
        )}
        <span>{props.data.label}</span>
      </div>
      {props.data.subLabel && <div className={clsx(classes.subLabel)}>{props.data.subLabel}</div>}
    </components.Option>
  )
}

const MultiValueLabel = (props: any) => {
  return (
    <components.MultiValueLabel {...props}>
      <div className={classes.labelContainer}>
        {props.data.profileImgUrl && (
          <img
            src={props.data.profileImgUrl}
            className={classes.profileImg}
            alt={props.data.label}
          />
        )}
        <div className={clsx(classes.label)}>
          <span>{props.data.label}</span>
        </div>
      </div>
    </components.MultiValueLabel>
  )
}

const MultiValueRemove = (props: any) => {
  return (
    <components.MultiValueRemove {...props}>
      <SVG path={closeIcon} spanClassName={classes.closeSpan} />
    </components.MultiValueRemove>
  )
}

const ClearIndicator = (props: any) => {
  return (
    <components.ClearIndicator {...props}>
      <SVG path={closeIcon} spanClassName={classes.closeSpan} />
    </components.ClearIndicator>
  )
}

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <SVG path={chevronDownIcon} spanClassName={classes.downArrowSpan} />
    </components.DropdownIndicator>
  )
}
