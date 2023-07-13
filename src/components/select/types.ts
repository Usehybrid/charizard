import {MultiValue} from 'react-select'
import type {SingleValue, ActionMeta} from 'react-select'

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
