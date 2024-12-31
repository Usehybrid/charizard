import {DateRangePicker} from '../components/date-picker/DateRangePicker'
import {useDateRangePicker} from '../hooks'

export function DatePickerDemo() {
  const {period, from, to, handleDateChange} = useDateRangePicker()
  console.log({from, to})
  return (
    <DateRangePicker
      value={{
        from: period.from,
        to: period.to,
      }}
      onChange={handleDateChange}
      mode="range"
      showQuickSelect
      disabled={date => date > new Date()}
    />
  )
}
