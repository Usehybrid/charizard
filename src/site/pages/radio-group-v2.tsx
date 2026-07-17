import {useState} from 'react'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'
import {RadioGroupV2} from '../../components'

const shippingItems = [
  {label: {heading: 'Standard (5-7 business days)'}, value: 'standard'},
  {label: {heading: 'Express (2-3 business days)'}, value: 'express'},
  {label: {heading: 'Next-day'}, value: 'next-day'},
]

const enrollmentItems = [
  {
    label: {heading: 'Zero-touch', subHeading: 'Device enrolls automatically on first boot'},
    value: 'zero-touch',
    tooltip: {txt: 'Requires Apple Business Manager or Windows Autopilot'},
  },
  {
    label: {heading: 'Manual', subHeading: 'IT installs the MDM profile by hand'},
    value: 'manual',
  },
  {
    label: {heading: 'Self-service', subHeading: 'Employee enrolls from the onboarding email'},
    value: 'self-service',
  },
]

export default function RadioGroupV2Page() {
  const [shipping, setShipping] = useState<string | null>('standard')
  const [enrollment, setEnrollment] = useState<string | null>('zero-touch')
  const [ownership, setOwnership] = useState<string | null>('company')

  return (
    <div>
      <h1>RadioGroupV2</h1>
      <p>Zag.js-powered radio group with headings, subheadings, tooltips and loading states.</p>

      <DemoSection
        title="Basic usage"
        description="Pass items with a label heading and a value. defaultValue selects an option on first render (uncontrolled)."
        code={`import {RadioGroupV2} from '@hybr1d-tech/charizard'

<RadioGroupV2
  label="Shipping speed"
  items={[
    {label: {heading: 'Standard (5-7 business days)'}, value: 'standard'},
    {label: {heading: 'Express (2-3 business days)'}, value: 'express'},
    {label: {heading: 'Next-day'}, value: 'next-day'},
  ]}
  defaultValue="standard"
  onChange={value => setShipping(value)}
/>`}
      >
        <div style={{maxWidth: 420}}>
          <RadioGroupV2
            label="Shipping speed"
            items={shippingItems}
            defaultValue="standard"
            onChange={value => setShipping(value)}
          />
          <p style={{marginTop: 12}}>Selected: {shipping ?? 'none'}</p>
        </div>
      </DemoSection>

      <DemoSection
        title="Subheadings and tooltips"
        description="Each item can carry a subHeading for extra context and a tooltip rendered next to the option."
      >
        <div style={{maxWidth: 480}}>
          <RadioGroupV2
            label="Enrollment method"
            required
            items={enrollmentItems}
            defaultValue="zero-touch"
            onChange={value => setEnrollment(value)}
          />
          <p style={{marginTop: 12}}>Selected: {enrollment ?? 'none'}</p>
        </div>
      </DemoSection>

      <DemoSection
        title="Controlled"
        description="Pass value to make the group controlled — the selection follows your state."
        code={`const [ownership, setOwnership] = useState<string | null>('company')

<RadioGroupV2
  label="Device ownership"
  items={items}
  value={ownership ?? undefined}
  onChange={setOwnership}
/>`}
      >
        <div style={{maxWidth: 420}}>
          <RadioGroupV2
            label="Device ownership"
            items={[
              {label: {heading: 'Company-owned'}, value: 'company'},
              {label: {heading: 'Employee-owned (BYOD)'}, value: 'byod'},
            ]}
            value={ownership ?? undefined}
            onChange={setOwnership}
          />
          <div style={{display: 'flex', gap: 8, marginTop: 12}}>
            <button onClick={() => setOwnership('company')}>Set company-owned</button>
            <button onClick={() => setOwnership('byod')}>Set BYOD</button>
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="States"
        description="Disabled groups, validation errors via errorMsg, and skeleton loading via isLoading."
      >
        <DemoRow>
          <DemoItem label="Disabled">
            <RadioGroupV2
              label="Warranty plan"
              items={[
                {label: {heading: '1 year (included)'}, value: '1y'},
                {label: {heading: '3 years'}, value: '3y'},
              ]}
              defaultValue="1y"
              disabled
              onChange={() => {}}
            />
          </DemoItem>
          <DemoItem label="With error">
            <RadioGroupV2
              label="Approval policy"
              required
              items={[
                {label: {heading: 'Auto-approve'}, value: 'auto'},
                {label: {heading: 'Manager approval'}, value: 'manager'},
              ]}
              errorMsg="Pick an approval policy to continue"
              onChange={() => {}}
            />
          </DemoItem>
          <DemoItem label="Loading">
            <RadioGroupV2
              label="Region"
              items={[
                {label: {heading: 'EU'}, value: 'eu'},
                {label: {heading: 'US'}, value: 'us'},
                {label: {heading: 'APAC'}, value: 'apac'},
              ]}
              isLoading
              onChange={() => {}}
            />
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
