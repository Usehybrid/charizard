import {useState} from 'react'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'
import {Select, SelectAsync} from '../../components'

const teamOptions = [
  {label: 'Engineering', value: 'engineering'},
  {label: 'Design', value: 'design'},
  {label: 'IT Operations', value: 'it-ops'},
  {label: 'Finance', value: 'finance'},
  {label: 'People', value: 'people'},
]

const deviceOptions = [
  {label: 'MacBook Pro 14"', value: 'mbp-14'},
  {label: 'MacBook Air 13"', value: 'mba-13'},
  {label: 'Dell XPS 13', value: 'xps-13'},
  {label: 'ThinkPad X1 Carbon', value: 'tp-x1'},
  {label: 'iPhone 15', value: 'iphone-15'},
]

export default function SelectPage() {
  const [team, setTeam] = useState('')
  const [devices, setDevices] = useState<string[]>([])
  const [owner, setOwner] = useState('')

  return (
    <div>
      <h1>Select</h1>
      <p>Dropdown select built on react-select, with single, multi and async flavors.</p>

      <DemoSection
        title="Basic usage"
        description="onChange receives the plain value (string for single select, string[] for multi) rather than the option object."
        code={`import {Select} from '@hybr1d-tech/charizard'

<Select
  options={[
    {label: 'Engineering', value: 'engineering'},
    {label: 'Design', value: 'design'},
    {label: 'IT Operations', value: 'it-ops'},
  ]}
  placeholder="Select team"
  onChange={value => setTeam(value as string)}
/>`}
      >
        <DemoRow>
          <DemoItem label={team ? `Selected: ${team}` : 'Single select'}>
            <div style={{width: 260}}>
              <Select
                options={teamOptions}
                placeholder="Select team"
                onChange={value => setTeam(value as string)}
              />
            </div>
          </DemoItem>
          <DemoItem label="With default value">
            <div style={{width: 260}}>
              <Select
                options={teamOptions}
                defaultValue={{label: 'IT Operations', value: 'it-ops'}}
                placeholder="Select team"
                onChange={() => {}}
              />
            </div>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Multi and clearable"
        description="isMulti collects several values; isClearable adds a clear-all control."
        code={`<Select
  options={deviceOptions}
  isMulti
  isClearable
  placeholder="Select devices to assign"
  onChange={value => setDevices(value as string[])}
/>`}
      >
        <DemoRow>
          <DemoItem label={`Selected: ${devices.length} device(s)`}>
            <div style={{width: 340}}>
              <Select
                options={deviceOptions}
                isMulti
                isClearable
                placeholder="Select devices to assign"
                onChange={value => setDevices(value as string[])}
              />
            </div>
          </DemoItem>
          <DemoItem label="Single, clearable">
            <div style={{width: 260}}>
              <Select
                options={teamOptions}
                isClearable
                placeholder="Cost center"
                onChange={() => {}}
              />
            </div>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection title="States" description="Disabled selects and inline validation errors via errorMsg.">
        <DemoRow>
          <DemoItem label="Disabled">
            <div style={{width: 260}}>
              <Select
                options={teamOptions}
                placeholder="Managed by HRIS sync"
                isDisabled
                onChange={() => {}}
              />
            </div>
          </DemoItem>
          <DemoItem label="With error">
            <div style={{width: 260}}>
              <Select
                options={deviceOptions}
                placeholder="Select a device"
                errorMsg="A device is required for this order"
                onChange={() => {}}
              />
            </div>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Async options"
        description="SelectAsync loads options from a promise as the user types — here filtering an in-memory employee list."
        code={`import {SelectAsync} from '@hybr1d-tech/charizard'

<SelectAsync
  options={async input =>
    employees.filter(e => e.label.toLowerCase().includes(input.toLowerCase()))
  }
  placeholder="Search employees"
  onChange={value => setOwner(value as string)}
/>`}
      >
        <DemoRow>
          <DemoItem label={owner ? `Selected: ${owner}` : 'Type to search'}>
            <div style={{width: 300}}>
              <SelectAsync
                options={async input => {
                  const employees = [
                    {label: 'Priya Sharma', value: 'priya', subLabel: 'Engineering'},
                    {label: 'Marcus Chen', value: 'marcus', subLabel: 'Design'},
                    {label: 'Sofia Petrova', value: 'sofia', subLabel: 'IT Operations'},
                    {label: 'Diego Alvarez', value: 'diego', subLabel: 'Finance'},
                  ]
                  return employees.filter(e =>
                    e.label.toLowerCase().includes(input.toLowerCase()),
                  )
                }}
                placeholder="Search employees"
                onChange={value => setOwner(value as string)}
              />
            </div>
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
