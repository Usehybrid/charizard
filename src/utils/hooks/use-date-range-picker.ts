import * as React from 'react'
import {addMonths, format} from 'date-fns'
import type {DateRange} from 'react-day-picker'

interface UseDateRangePickerReturnType {
  from: string
  to: string
  handleDateChange: (values?: DateRange) => void
  period: {
    from: Date | undefined
    to: Date | undefined
  }
}

export function useDateRangePicker(
  monthsBack: number = -3,
  defaultFrom?: string,
  defaultTo?: string,
): UseDateRangePickerReturnType {
  const parsedDefaultFrom = defaultFrom ? new Date(defaultFrom) : null
  const fromDate =
    parsedDefaultFrom && !isNaN(parsedDefaultFrom.getTime())
      ? parsedDefaultFrom
      : addMonths(new Date(), monthsBack)

  const parsedDefaultTo = defaultTo ? new Date(defaultTo) : null
  const toDate = parsedDefaultTo && !isNaN(parsedDefaultTo.getTime()) ? parsedDefaultTo : new Date()

  const [period, setPeriod] = React.useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: fromDate,
    to: toDate,
  })

  const from = period.from ? format(period.from, 'yyyy-MM-dd') : ''
  const to = period.to ? format(period.to, 'yyyy-MM-dd') : ''

  const handleDateChange = React.useCallback((values?: DateRange) => {
    setPeriod({from: values?.from, to: values?.to})
  }, [])

  return {from, to, handleDateChange, period}
}
