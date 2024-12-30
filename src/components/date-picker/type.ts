import {Placement} from '@zag-js/popper'
import * as React from 'react'
import {ClassNames, DateRange, Matcher, PropsRange} from 'react-day-picker'
import {BUTTON_V2_SIZE} from '../button-v2'
import type {SelectV2Props} from '../select-v2'

export interface DateRangePickerProps extends PropsRange {
  value: DateRange
  onChange: (value: DateRange) => void
  mode: 'range'
  showQuickSelect?: boolean
  disabled?: Matcher | Matcher[] | undefined
  customDisable?: Matcher | Matcher[]
  disableWeekends?: boolean
  datePickerClassNames?: ClassNames
  disableDatepicker?: boolean
  errorMsg?: string
  placement?: Placement
  customInputContentStyles?: React.CSSProperties
  showOutsideDays?: boolean
  onReset?: () => void
  customClasses?: {
    contentContainer?: string
    content?: string
    dateIcon?: string
  }
  size?: BUTTON_V2_SIZE
  placeholder?: string
  trigger?: React.ReactNode
  selectProps?: Omit<SelectV2Props, 'options' | 'onChange'>
}

export type MonthYear = {
  month: number
  year: number
}

export type DateStore = {
  monthYear: MonthYear
  setMonthYear: (value: MonthYear) => void
}
