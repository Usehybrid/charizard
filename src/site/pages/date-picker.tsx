import * as React from 'react'
import {DatePicker, DateRangePicker, useDateRangePicker} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoItem, DemoRow} from '../showcase/DemoRow'

export default function DatePickerPage() {
  const {period, handleDateChange} = useDateRangePicker()
  const [single, setSingle] = React.useState<string | Date | undefined>()
  const [formDate, setFormDate] = React.useState<string | Date | undefined>()

  return (
    <div>
      <h1>DatePicker</h1>
      <p>Single-date and date-range pickers built on react-day-picker, with quick-select presets.</p>

      <DemoSection
        title="Date range picker"
        description="mode='range' with quick-select presets; future dates are disabled via a matcher. The useDateRangePicker hook manages the period state."
        code={`import {DateRangePicker, useDateRangePicker} from '@hybr1d-tech/charizard'

const {period, handleDateChange} = useDateRangePicker()

<DateRangePicker
  value={{from: period.from, to: period.to}}
  onChange={handleDateChange}
  mode="range"
  showQuickSelect
  disabled={date => date > new Date()}
/>`}
      >
        <DateRangePicker
          value={{from: period.from, to: period.to}}
          onChange={handleDateChange}
          mode="range"
          showQuickSelect
          disabled={date => date > new Date()}
        />
      </DemoSection>

      <DemoSection
        title="Single date picker"
        description="mode='single' returns a yyyy-MM-dd string. The 'form' variant renders a form-field trigger; the default variant renders a ghost button."
        code={`import {DatePicker} from '@hybr1d-tech/charizard'

const [date, setDate] = React.useState<string | Date | undefined>()

<DatePicker mode="single" variant="form" value={date} onChange={setDate} />`}
      >
        <DemoRow>
          <DemoItem label="form variant">
            <DatePicker mode="single" variant="form" value={formDate} onChange={value => setFormDate(value)} />
          </DemoItem>
          <DemoItem label="default variant">
            <DatePicker mode="single" value={single} onChange={value => setSingle(value)} />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Formats, error and disabled"
        description="displayDateFormat controls how the picked date is rendered; errorMsg shows a validation message; disableDatepicker blocks the trigger."
      >
        <DemoRow>
          <DemoItem label="dd/MM/yyyy format">
            <DatePicker
              mode="single"
              variant="form"
              displayDateFormat="dd/MM/yyyy"
              value={formDate}
              onChange={value => setFormDate(value)}
            />
          </DemoItem>
          <DemoItem label="error">
            <DatePicker
              mode="single"
              variant="form"
              value={undefined}
              onChange={() => {}}
              errorMsg="Date is required"
            />
          </DemoItem>
          <DemoItem label="disabled">
            <DatePicker mode="single" variant="form" value={undefined} onChange={() => {}} disableDatepicker />
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
