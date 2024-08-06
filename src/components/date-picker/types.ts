import {DayPickerSingleProps} from 'react-day-picker'
import {BUTTON_VARIANT} from '../button'
import {Placement} from '@popperjs/core'

export interface DatePickerProps extends DayPickerSingleProps {
  value?: Date | string
  onChange: (value?: Date | string) => void
  mode: 'single'
  variant?: 'default' | 'form'
  /**
   * @default 'do LLL y'
   * 'do LLL y' => 1st Jan 2021
   * 'dd LLL y' => 01 Jan 2021
   * 'yyyy-MM-dd' => 2021-01-01
   * 'dd/MM/yyyy' => 01/01/2021
   */
  displayDateFormat?: 'do LLL y' | 'dd LLL y' | 'yyyy-MM-dd' | 'dd/MM/yyyy'
  disableDatepicker?: boolean
  errorMsg?: string
  isError?: boolean
  buttonVariant?: BUTTON_VARIANT
  customContainerClasses?: string
  popoverConfig?: {
    placement?: Placement
  }
}
