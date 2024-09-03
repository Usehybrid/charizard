import {MultiValue} from 'react-select'
import type {SingleValue, ActionMeta, StylesConfig} from 'react-select'
import {Props as ReactSelectProps} from 'react-select'

export type OptionBase = {
  label: string
  value: string
  subLabel?: string
}
export type OptionWithProfileImg = OptionBase & {
  profileImgUrl?: string
  icon?: never
}
export type OptionWithIcon = OptionBase & {
  icon?: string
  profileImgUrl?: never
}
export type Option = OptionWithProfileImg | OptionWithIcon
export type SelectMultiValue = MultiValue<Option>
export type SelectSingleValue = SingleValue<Option>
export type SelectActionMeta = ActionMeta<Option>
export type SelectValue = SelectMultiValue | SelectSingleValue
export enum SELECT_VARIANT {
  DEFAULT = 'default',
  USERS = 'users',
  CHECKBOX = 'checkbox',
  TAGS = 'tags',
}
export interface SelectV2Props extends ReactSelectProps<any, boolean> {
  options: Option[]
  onChange: (value: string | string[], actionMeta: SelectActionMeta) => void
  mainContainerClassName?: string
  variant?: SELECT_VARIANT
  errorMsg?: string
  customStyles?: StylesConfig<any>
}

export interface CreatableSelectV2Props extends SelectV2Props {
  onCreateOption: (value: string) => Promise<void> | void
}
