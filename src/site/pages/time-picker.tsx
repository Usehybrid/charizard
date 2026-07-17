import {useState} from 'react'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'
import {TimePicker, TIME_PICKER_FORMAT} from '../../components'

export default function TimePickerPage() {
  const [maintenanceAt, setMaintenanceAt] = useState<number | undefined>(undefined)
  const [syncAt, setSyncAt] = useState<number | undefined>(undefined)

  return (
    <div>
      <h1>TimePicker</h1>
      <p>Time-of-day picker with 12/24-hour formats and optional seconds, built on the InputV2 group.</p>

      <DemoSection
        title="Basic usage"
        description="onTimeChange receives a millisecond timestamp for the chosen time today. Pass it back as timestamp to keep the field controlled."
        code={`import {TimePicker} from '@hybr1d-tech/charizard'

const [maintenanceAt, setMaintenanceAt] = useState<number | undefined>()

<TimePicker
  timestamp={maintenanceAt}
  onTimeChange={ts => setMaintenanceAt(ts)}
/>`}
      >
        <DemoRow>
          <DemoItem
            label={
              maintenanceAt
                ? `Maintenance window: ${new Date(maintenanceAt).toLocaleTimeString()}`
                : 'Pick a maintenance window'
            }
          >
            <div style={{width: 220}}>
              <TimePicker timestamp={maintenanceAt} onTimeChange={ts => setMaintenanceAt(ts)} />
            </div>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="24-hour format"
        description="TIME_PICKER_FORMAT.DUAL switches to a 24-hour clock and drops the AM/PM column."
        code={`import {TimePicker, TIME_PICKER_FORMAT} from '@hybr1d-tech/charizard'

<TimePicker
  format={TIME_PICKER_FORMAT.DUAL}
  onTimeChange={ts => setSyncAt(ts)}
/>`}
      >
        <DemoRow>
          <DemoItem
            label={
              syncAt
                ? `Nightly sync at ${new Date(syncAt).toLocaleTimeString([], {hour12: false})}`
                : 'Nightly HRIS sync time'
            }
          >
            <div style={{width: 220}}>
              <TimePicker
                format={TIME_PICKER_FORMAT.DUAL}
                timestamp={syncAt}
                onTimeChange={ts => setSyncAt(ts)}
              />
            </div>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="With seconds"
        description="enableSeconds adds a seconds column in either format."
      >
        <DemoRow>
          <DemoItem label="12-hour with seconds">
            <div style={{width: 240}}>
              <TimePicker enableSeconds onTimeChange={() => {}} />
            </div>
          </DemoItem>
          <DemoItem label="24-hour with seconds">
            <div style={{width: 240}}>
              <TimePicker enableSeconds format={TIME_PICKER_FORMAT.DUAL} onTimeChange={() => {}} />
            </div>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Disabled"
        description="InputV2 props pass through — disabled greys out the field and trigger icon."
      >
        <DemoRow>
          <DemoItem label="Disabled">
            <div style={{width: 220}}>
              <TimePicker disabled onTimeChange={() => {}} />
            </div>
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
