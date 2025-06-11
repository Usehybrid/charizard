import * as React from 'react'
import classes from './styles.module.css'
import {InternalTableStore} from '../store'
import {BUTTON_SIZE} from '../../button'
import {DateRangePicker} from '../../date-picker'
import {DateRangePickerProps} from '../../date-picker/type'
import {useDateRangePicker} from '../../../hooks'
import type {FilterOptions, InternalTableFilters} from '../types'

interface TableHeaderFilterProps {
  setRowSelection: React.Dispatch<React.SetStateAction<{}>>
  filter: FilterOptions
  tableFilters: InternalTableStore['filters']
  tableFilter: InternalTableFilters
  addFilters: InternalTableStore['addFilters']
  removeFilters: InternalTableStore['removeFilters']
  resetFilters: (filterKey: string, filterDispatch: any) => void
  filterDispatch: (value: any) => void
}

export default function TableHeaderDateRangeFilter({
  setRowSelection,
  filter,
  tableFilter,
  addFilters,
  filterDispatch,
  resetFilters,
}: TableHeaderFilterProps) {
  const [initialLoaded, setInitialLoaded] = React.useState(false)
  const values = tableFilter?.values ? (tableFilter.values as string)?.split(',') : []

  const {period, from, to, handleDateChange} = useDateRangePicker(
    0,
    values[0] || undefined,
    values[1] || undefined,
  )

  React.useEffect(() => {
    if (!tableFilter?.values) {
      setInitialLoaded(false)
      handleDateChange(undefined)
    }
  }, [tableFilter])

  // Add effect to track tableFilter changes
  React.useEffect(() => {
    // If we have values in tableFilter, set initialLoaded to true
    if (tableFilter?.values && !initialLoaded) {
      setInitialLoaded(true)
      // Also update the date picker with these values
      handleDateChange({
        from: values[0] ? new Date(values[0]) : undefined,
        to: values[1] ? new Date(values[1]) : undefined,
      })
    }
  }, [tableFilter?.values])

  React.useEffect(() => {
    if (initialLoaded) {
      addFilters(filter.key, [from, to].filter(Boolean).join(','), filterDispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, initialLoaded])

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
        setRowSelection({})
        resetFilters(tableFilter?.key, filterDispatch)
      }}
      customClasses={{
        contentContainer: classes.dateContentContainer,
        content: 'zap-button-small',
        dateIcon: classes.dateIcon,
      }}
      size={BUTTON_SIZE.SMALL}
      placeholder={filter.name}
    />
  )
}
