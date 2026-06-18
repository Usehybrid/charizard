import {MultiValue} from 'react-select'
import type {SingleValue, ActionMeta, StylesConfig, GroupBase} from 'react-select'
import {Props as ReactSelectProps} from 'react-select'
import type {CreatableProps} from 'react-select/creatable'

export type HexColor = `#${string}`

export type OptionBase = {
  label: string
  value: string
  subLabel?: string
  color?: HexColor
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
  showDivider?: boolean
  errorMsg?: string
  customStyles?: StylesConfig<any>
}

/**
 * Creatable-only props from react-select that aren't part of the base Select
 * props (SelectV2Props extends those). The component already spreads
 * `...restProps` into <CreatableSelect>, so these work at runtime — this just
 * makes them type-visible. `onChange` is intentionally not picked: SelectV2Props
 * overrides it with a custom signature and picking the react-select one clashes.
 */
type CreatableExtraProps = Pick<
  CreatableProps<any, boolean, GroupBase<any>>,
  | 'allowCreateWhileLoading'
  | 'createOptionPosition'
  | 'formatCreateLabel'
  | 'isValidNewOption'
  | 'getNewOptionData'
>

export interface CreatableSelectV2Props extends SelectV2Props, CreatableExtraProps {
  onCreateOption: (value: string) => Promise<void> | void
}
