import * as React from 'react'
import {addMonths, format} from 'date-fns'
import type {DateRange} from 'react-day-picker'

export function useDateRangePicker(
  monthsBack: number = -3,
  defaultFrom?: string,
  defaultTo?: string,
): {
  from: string
  to: string
  handleDateChange: (values?: DateRange) => void
  period: {
    from: Date | undefined
    to: Date | undefined
  }
} {
  const [period, setPeriod] = React.useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: defaultFrom ? new Date(defaultFrom) : addMonths(new Date(), monthsBack),
    to: defaultTo ? new Date(defaultTo) : new Date(),
  })

  const from = period.from ? format(period.from, 'yyyy-MM-dd') : ''
  const to = period.to ? format(period.to, 'yyyy-MM-dd') : ''

  const handleDateChange = React.useCallback((values?: DateRange) => {
    setPeriod({from: values?.from, to: values?.to})
  }, [])

  return {from, to, handleDateChange, period}
}
