import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import {colourStyles, getControlStyles} from './config'
import {default as ReactSelect} from 'react-select/creatable'
import type {MenuPlacement, StylesConfig} from 'react-select'
import {
  Option,
  ClearIndicator,
  DropdownIndicator,
  MultiValueLabel,
  MultiValueRemove,
  SingleValue,
} from './Common'
import {SelectActionMeta} from './types'

interface CreatableSelectProps {
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
  errorMsg?: string | false
  /**
   * extra props to pass for select component
   */
  extraprops?: any
  /**
   * create new option api mutate function
   */
  createNewOption: (value: string | string[]) => Promise<OptionType | Array<OptionType>>
  /**
   * refetch options to show options in dropdown
   */
  refetchOptions?: Function
}

export type OptionType = {
  label: string
  value: string
  __isNew__?: boolean
}

export function CreatableSelect({
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
  createNewOption,
  refetchOptions = () => {},
}: CreatableSelectProps) {
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
        styles={{...colourStyles, ...getControlStyles(errorMsg), ...selectStyles}}
        components={{
          Option,
          MultiValueLabel,
          MultiValueRemove,
          DropdownIndicator,
          ClearIndicator,
          SingleValue,
        }}
        isDisabled={isDisabled}
        onChange={async (data: any) => {
          if (data) {
            if (isMulti) {
              const newSelectedValues = data.filter((d: OptionType) => d.__isNew__)
              const oldSelectedValues = data.filter((d: OptionType) => !d.__isNew__)
              let totalSelectedValues = oldSelectedValues

              if (newSelectedValues.length > 0) {
                const updatedDatas = await createNewOption(
                  newSelectedValues.map((val: OptionType) => val.value),
                )
                // updatedDatas would be undefined or null if there's an error (like new value's length validation error) in createNewOption
                if (updatedDatas) {
                  // remove __isNew__ key since the option is already present in the dropdown and saved through API call
                  data = data.map((opt: OptionType) => {
                    if (opt.__isNew__) {
                      // update value in existing data
                      opt.value = (updatedDatas as OptionType[])[0].value
                      delete opt.__isNew__
                    }
                    return opt
                  })
                  await refetchOptions()
                  totalSelectedValues = [...oldSelectedValues, ...(updatedDatas as OptionType[])]
                }
              }
              onChange(
                totalSelectedValues.map((val: OptionType) => val.value),
                data.actionMeta,
              )
            } else {
              let value
              if (data.__isNew__) {
                const updatedData = await createNewOption(data.value)
                await refetchOptions()
                // remove __isNew__ key since the option is already present in the dropdown and saved through API call
                delete data.__isNew__
                value = (updatedData as OptionType).value
              } else {
                value = data.value
              }
              onChange(value ?? '', data.actionMeta)
            }
          } else {
            onChange('', data?.actionMeta)
          }
        }}
        formatGroupLabel={formatGroupLabel}
        menuPlacement={menuPlacement}
        {...extraprops}
      />
      {errorMsg && <p className={classes.errorMsg}>{errorMsg}</p>}
    </div>
  )
}
