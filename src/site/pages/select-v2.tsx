import {useState} from 'react'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'
import {SelectV2, CreatableSelectV2, SELECT_VARIANT} from '../../components'
import type {Option} from '../../components'
import {fixtureUsers, fixtureUserName} from '../fixtures'

const laptopOptions: Option[] = [
  {label: 'MacBook Pro 14"', value: 'mbp-14', subLabel: 'M3 Pro · 18GB · 512GB'},
  {label: 'MacBook Air 13"', value: 'mba-13', subLabel: 'M3 · 16GB · 256GB'},
  {label: 'Dell XPS 13', value: 'xps-13', subLabel: 'i7 · 16GB · 512GB'},
  {label: 'ThinkPad X1 Carbon', value: 'tp-x1', subLabel: 'i7 · 32GB · 1TB'},
]

// Sanitized staging GET /users/team snapshot (src/site/fixtures/users.json) —
// real API-shaped rows mapped to select options.
const userOptions: Option[] = fixtureUsers.slice(0, 8).map(u => ({
  label: fixtureUserName(u),
  value: u.id,
  subLabel: u.work_email,
}))

const tagOptions: Option[] = [
  {label: 'Urgent', value: 'urgent', color: '#de350b'},
  {label: 'Procurement', value: 'procurement', color: '#2980b9'},
  {label: 'Renewal', value: 'renewal', color: '#f39c12'},
  {label: 'Approved', value: 'approved', color: '#27ae60'},
]

export default function SelectV2Page() {
  const [laptop, setLaptop] = useState('')
  const [approvers, setApprovers] = useState<string[]>([fixtureUsers[0].id])
  const [softwareOptions, setSoftwareOptions] = useState<Option[]>([
    {label: 'Slack', value: 'slack'},
    {label: 'Figma', value: 'figma'},
    {label: 'Notion', value: 'notion'},
  ])
  const [software, setSoftware] = useState('')

  return (
    <div>
      <h1>SelectV2</h1>
      <p>The preferred react-select wrapper with variants, sub-labels, tags and a creatable flavor.</p>

      <DemoSection
        title="Basic usage"
        description="Options support an optional subLabel. onChange receives the plain value (string, or string[] when isMulti). Disabled, error and loading states are built in."
        code={`import {SelectV2} from '@hybr1d-tech/charizard'

<SelectV2
  options={[
    {label: 'MacBook Pro 14"', value: 'mbp-14', subLabel: 'M3 Pro · 18GB · 512GB'},
    {label: 'Dell XPS 13', value: 'xps-13', subLabel: 'i7 · 16GB · 512GB'},
  ]}
  placeholder="Select a laptop"
  onChange={value => setLaptop(value as string)}
/>`}
      >
        <DemoRow>
          <DemoItem label={laptop ? `Selected: ${laptop}` : 'With sub-labels'}>
            <div style={{width: 280}}>
              <SelectV2
                options={laptopOptions}
                placeholder="Select a laptop"
                onChange={value => setLaptop(value as string)}
              />
            </div>
          </DemoItem>
          <DemoItem label="Disabled">
            <div style={{width: 280}}>
              <SelectV2
                options={laptopOptions}
                placeholder="Locked by catalog policy"
                isDisabled
                onChange={() => {}}
              />
            </div>
          </DemoItem>
        </DemoRow>
        <DemoRow>
          <DemoItem label="With error">
            <div style={{width: 280}}>
              <SelectV2
                options={laptopOptions}
                placeholder="Select a laptop"
                errorMsg="A device model is required"
                onChange={() => {}}
              />
            </div>
          </DemoItem>
          <DemoItem label="Loading">
            <div style={{width: 280}}>
              <SelectV2 options={[]} placeholder="Loading catalog…" isLoading onChange={() => {}} />
            </div>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Variants"
        description="SELECT_VARIANT changes option and chip rendering: USERS shows avatars/initials, TAGS renders colored pills from each option's color."
      >
        <DemoRow>
          <DemoItem label="variant: USERS (multi)">
            <div style={{width: 320}}>
              <SelectV2
                options={userOptions}
                variant={SELECT_VARIANT.USERS}
                isMulti
                defaultValue={[userOptions[0], userOptions[1]]}
                placeholder="Add watchers"
                onChange={() => {}}
              />
            </div>
          </DemoItem>
          <DemoItem label="variant: TAGS (multi)">
            <div style={{width: 320}}>
              <SelectV2
                options={tagOptions}
                variant={SELECT_VARIANT.TAGS}
                isMulti
                defaultValue={[tagOptions[0], tagOptions[3]]}
                placeholder="Add tags"
                onChange={() => {}}
              />
            </div>
          </DemoItem>
        </DemoRow>
        <DemoRow>
          <DemoItem label="With dividers">
            <div style={{width: 320}}>
              <SelectV2
                options={laptopOptions}
                showDivider
                placeholder="Select a laptop"
                onChange={() => {}}
              />
            </div>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Checkbox variant (controlled multi)"
        description="variant: CHECKBOX renders a checkable option list; drive the selection from state by mapping values back to options."
        code={`const [approvers, setApprovers] = useState<string[]>([apiUsers[0].id])

<SelectV2
  options={userOptions}
  variant={SELECT_VARIANT.CHECKBOX}
  isMulti
  value={userOptions.filter(o => approvers.includes(o.value))}
  onChange={value => setApprovers(value as string[])}
/>`}
      >
        <div style={{width: 340}}>
          <SelectV2
            options={userOptions}
            variant={SELECT_VARIANT.CHECKBOX}
            isMulti
            value={userOptions.filter(o => approvers.includes(o.value))}
            placeholder="Select approvers"
            onChange={value => setApprovers(value as string[])}
          />
          <p style={{marginTop: 12}}>Approvers: {approvers.length ? approvers.join(', ') : 'none'}</p>
        </div>
      </DemoSection>

      <DemoSection
        title="Creatable"
        description="CreatableSelectV2 lets users add options that are not in the list via onCreateOption."
      >
        <div style={{width: 340}}>
          <CreatableSelectV2
            options={softwareOptions}
            placeholder="Pick or create a software"
            value={softwareOptions.filter(o => o.value === software)}
            onChange={value => setSoftware(value as string)}
            onCreateOption={name => {
              const option: Option = {label: name, value: name.toLowerCase().replace(/\s+/g, '-')}
              setSoftwareOptions(prev => [...prev, option])
              setSoftware(option.value)
            }}
          />
          <p style={{marginTop: 12}}>Selected: {software || 'none'}</p>
        </div>
      </DemoSection>
    </div>
  )
}
