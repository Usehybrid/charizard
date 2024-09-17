import * as React from 'react'
import {DateRange, Matcher, PropsRange} from 'react-day-picker'
import {Placement} from '@zag-js/popper'

export interface DateRangePickerProps extends PropsRange {
  value: DateRange
  onChange: (value: DateRange) => void
  mode: 'range'
  showQuickSelect?: boolean
  disabled?: Matcher | Matcher[] | undefined
  customDisable?: Matcher | Matcher[]
  disableWeekends?: boolean
  datePickerClassNames?: Record<string, string>
  disableDatepicker?: boolean
  errorMsg?: string
  placement?: Placement
  customInputContentStyles?: React.CSSProperties
  showOutsideDays?: boolean
}

export type MonthYear = {
  month: number
  year: number
}

export type DateStore = {
  monthYear: MonthYear
  setMonthYear: (value: MonthYear) => void
}
