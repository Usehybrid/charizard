import {useState} from 'react'
import {DatePicker} from '../components'
import {DateRangePicker} from '../components/date-picker/DateRangePicker'
import {useDateRangePicker} from '../hooks'

export function DatePickerDemo() {
  const {period, from, to, handleDateChange} = useDateRangePicker()
  console.log({from, to})
  const [d, sD] = useState<string | Date | undefined>()
  return (
    <div>
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
      <DatePicker
        mode="single"
        onChange={value => {
          sD(value)
        }}
        value={d}
        variant="form"
      />
    </div>
  )
}
