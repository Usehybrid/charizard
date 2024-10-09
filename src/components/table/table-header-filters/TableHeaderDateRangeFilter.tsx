import * as React from 'react'
import {useDateRangePicker} from '../../../utils/hooks/use-date-range-picker'
import {BUTTON_V2_SIZE} from '../../button-v2'
import {DateRangePicker} from '../../date-picker'
import {DateRangePickerProps} from '../../date-picker/type'
import {TableStore} from '../store'
import type {FilterOptions, InternalTableFilters} from '../types'
import classes from './styles.module.css'

interface TableHeaderFilterProps {
  filter: FilterOptions
  tableFilters: TableStore['filters']
  tableFilter: InternalTableFilters
  addFilters: TableStore['addFilters']
  removeFilters: TableStore['removeFilters']
  resetFilters: (filterKey: string, filterDispatch: any) => void
  filterDispatch: (value: any) => void
}

export default function TableHeaderDateRangeFilter({
  filter,
  tableFilter,
  addFilters,
  filterDispatch,
  resetFilters,
}: TableHeaderFilterProps) {
  const [initialLoaded, setInitialLoaded] = React.useState(false)
  const defaultValue = tableFilter?.values ? (tableFilter?.values as string)?.split(',') : undefined
  const {period, from, to, handleDateChange} = useDateRangePicker(
    0,
    defaultValue?.[0],
    defaultValue?.[1],
  )

  React.useEffect(() => {
    if (initialLoaded) {
      addFilters(filter.key, [from, to].filter(Boolean).join(','), filterDispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, initialLoaded])

  React.useEffect(() => {
    if (defaultValue) {
      setInitialLoaded(true)
    }
  }, [defaultValue])

  return (
    <DateRangePicker
      {...(filter.config as DateRangePickerProps)}
      onChange={value => {
        setInitialLoaded(true)
        handleDateChange(value)
      }}
      value={{
        from: initialLoaded ? period.from : undefined,
        to: initialLoaded ? period.to : undefined,
      }}
      onReset={() => {
        setInitialLoaded(false)
        resetFilters(tableFilter?.key, filterDispatch)
      }}
      customClasses={{
        contentContainer: classes.dateContentContainer,
        content: 'zap-button-small',
        dateIcon: classes.dateIcon,
      }}
      size={BUTTON_V2_SIZE.SMALL}
    />
  )
}
