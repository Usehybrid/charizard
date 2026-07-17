import {useState} from 'react'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'
import {SelectorsV2} from '../../components'

const defaultOptions = [
  {label: 'Option 1', value: 'option1'},
  {label: 'Option 2', value: 'option2'},
  {label: 'Option 3', value: 'option3'},
]

const billingOptions = [
  {label: 'Monthly', value: 'monthly'},
  {label: 'Quarterly', value: 'quarterly'},
  {label: 'Annual', value: 'annual'},
]

export default function SelectorsV2Page() {
  const [selectedValue, setSelectedValue] = useState('option1')
  const [billing, setBilling] = useState('monthly')

  return (
    <div>
      <h1>SelectorsV2</h1>
      <p>Second-generation segmented control — fully controlled via value and onChange.</p>

      <DemoSection
        title="Default"
        description="The active segment is whichever option matches value."
        code={`import {SelectorsV2} from '@hybr1d-tech/charizard'

<SelectorsV2
  options={[
    {label: 'Option 1', value: 'option1'},
    {label: 'Option 2', value: 'option2'},
    {label: 'Option 3', value: 'option3'},
  ]}
  value="option1"
  onChange={value => console.log(value)}
/>`}
      >
        <DemoRow>
          <DemoItem label="value fixed to option1">
            <SelectorsV2 options={defaultOptions} value="option1" onChange={() => {}} />
          </DemoItem>
          <DemoItem label="value fixed to option3">
            <SelectorsV2 options={defaultOptions} value="option3" onChange={() => {}} />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Custom options"
        description="Any label/value pairs work — here as a billing-cycle picker."
      >
        <DemoRow>
          <DemoItem label={`Billing: ${billing}`}>
            <SelectorsV2
              options={billingOptions}
              value={billing}
              onChange={value => setBilling(value)}
            />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Interactive"
        description="Store the value in state and update it in onChange to make the control interactive."
        code={`const [selectedValue, setSelectedValue] = useState('option1')

<SelectorsV2
  options={dummyOptions}
  value={selectedValue}
  onChange={newValue => setSelectedValue(newValue)}
/>`}
      >
        <DemoRow>
          <DemoItem label={`Selected: ${selectedValue}`}>
            <SelectorsV2
              options={defaultOptions}
              value={selectedValue}
              onChange={newValue => setSelectedValue(newValue)}
            />
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
