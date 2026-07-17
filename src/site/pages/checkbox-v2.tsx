import {useState} from 'react'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'
import {CheckboxV2} from '../../components'

const devices = [
  {id: 'mbp-14', label: 'MacBook Pro 14" — ZEN-0041'},
  {id: 'xps-13', label: 'Dell XPS 13 — ZEN-0087'},
  {id: 'tp-x1', label: 'ThinkPad X1 Carbon — ZEN-0112'},
]

export default function CheckboxV2Page() {
  const [subscribed, setSubscribed] = useState(true)
  const [selected, setSelected] = useState<string[]>(['mbp-14'])

  const allChecked = selected.length === devices.length
  const someChecked = selected.length > 0 && !allChecked

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? devices.map(d => d.id) : [])
  }

  const toggleOne = (id: string) => (checked: boolean) => {
    setSelected(prev => (checked ? [...prev, id] : prev.filter(x => x !== id)))
  }

  return (
    <div>
      <h1>CheckboxV2</h1>
      <p>Controlled checkbox with label, indeterminate state and disabled support.</p>

      <DemoSection
        title="Basic usage"
        description="CheckboxV2 is fully controlled: pass checked and update it in onChange."
        code={`import {CheckboxV2} from '@hybr1d-tech/charizard'

const [subscribed, setSubscribed] = useState(true)

<CheckboxV2
  label="Email me when an order ships"
  checked={subscribed}
  onChange={setSubscribed}
/>`}
      >
        <DemoRow>
          <DemoItem>
            <CheckboxV2
              label="Email me when an order ships"
              checked={subscribed}
              onChange={setSubscribed}
            />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="States"
        description="Unchecked, checked and indeterminate. Indeterminate is a visual state — checked still drives the underlying value."
      >
        <DemoRow>
          <DemoItem label="Unchecked">
            <CheckboxV2 label="Assign to employee" checked={false} onChange={() => {}} />
          </DemoItem>
          <DemoItem label="Checked">
            <CheckboxV2 label="Enroll in MDM" checked onChange={() => {}} />
          </DemoItem>
          <DemoItem label="Indeterminate">
            <CheckboxV2 label="Select all devices" checked={false} indeterminate onChange={() => {}} />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection title="Disabled" description="Disabled checkboxes ignore clicks in any state.">
        <DemoRow>
          <DemoItem label="Disabled unchecked">
            <CheckboxV2 label="Require SSO (managed by policy)" checked={false} disabled onChange={() => {}} />
          </DemoItem>
          <DemoItem label="Disabled checked">
            <CheckboxV2 label="Disk encryption enforced" checked disabled onChange={() => {}} />
          </DemoItem>
          <DemoItem label="Disabled indeterminate">
            <CheckboxV2 label="Partial rollout" checked={false} indeterminate disabled onChange={() => {}} />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Select-all pattern"
        description="Use indeterminate on a parent checkbox while only some children are selected."
        code={`const allChecked = selected.length === devices.length
const someChecked = selected.length > 0 && !allChecked

<CheckboxV2
  label="All devices"
  checked={allChecked}
  indeterminate={someChecked}
  onChange={checked => setSelected(checked ? devices.map(d => d.id) : [])}
/>`}
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <CheckboxV2
            label={`All devices (${selected.length}/${devices.length})`}
            checked={allChecked}
            indeterminate={someChecked}
            onChange={toggleAll}
          />
          <div style={{display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 24}}>
            {devices.map(device => (
              <CheckboxV2
                key={device.id}
                label={device.label}
                checked={selected.includes(device.id)}
                onChange={toggleOne(device.id)}
              />
            ))}
          </div>
        </div>
      </DemoSection>
    </div>
  )
}
