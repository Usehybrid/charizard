import * as React from 'react'
import {RadioGroup, RadioGroupV2} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoItem, DemoRow} from '../showcase/DemoRow'

const legacyItems = [
  {label: {heading: 'label 1'}, value: 'label 1'},
  {label: {heading: 'label 2'}, value: 'label 2'},
  {label: {heading: 'label 3'}, value: 'label 3'},
]

const v2Items = [
  {label: {heading: 'Option 1'}, value: 'Value 1'},
  {label: {heading: 'Option 2'}, value: 'Value 2'},
  {label: {heading: 'Option 3'}, value: 'Value 3'},
]

export default function RadioGroupPage() {
  const [legacyValue, setLegacyValue] = React.useState<string | null>('label 1')
  const [v2Value, setV2Value] = React.useState<string | null>(null)

  return (
    <div>
      <h1>RadioGroup</h1>
      <p>Single-choice radio group with heading, sub-headings, disabled and skeleton states.</p>

      <DemoSection
        title="Basic usage"
        description="RadioGroup takes items with a label heading and a value; defaultValue selects one on first render."
        code={`import {RadioGroup} from '@hybr1d-tech/charizard'

<RadioGroup
  radioHeading="RadioGroup"
  defaultValue="label 1"
  items={[
    {label: {heading: 'label 1'}, value: 'label 1'},
    {label: {heading: 'label 2'}, value: 'label 2'},
    {label: {heading: 'label 3'}, value: 'label 3'},
  ]}
  onChange={value => console.log(value)}
/>`}
      >
        <div>
          <RadioGroup
            radioHeading="RadioGroup"
            defaultValue="label 1"
            items={legacyItems}
            onChange={value => setLegacyValue(value)}
          />
          <p style={{marginTop: 8}}>
            Selected: <b>{legacyValue ?? 'none'}</b>
          </p>
        </div>
      </DemoSection>

      <DemoSection
        title="RadioGroupV2"
        description="The preferred generation. Supports a label, controlled value, sub-headings, required marker and error message."
        code={`import {RadioGroupV2} from '@hybr1d-tech/charizard'

<RadioGroupV2
  label="Sample Radio Heading"
  items={[
    {label: {heading: 'Option 1'}, value: 'Value 1'},
    {label: {heading: 'Option 2'}, value: 'Value 2'},
    {label: {heading: 'Option 3'}, value: 'Value 3'},
  ]}
  onChange={value => console.log(value)}
/>`}
      >
        <DemoRow>
          <DemoItem label="basic">
            <RadioGroupV2
              label="Sample Radio Heading"
              items={v2Items}
              onChange={value => setV2Value(value)}
            />
          </DemoItem>
          <DemoItem label="sub-headings + required">
            <RadioGroupV2
              label="Assignment"
              required
              items={[
                {label: {heading: 'Assign now', subHeading: 'Device ships immediately'}, value: 'now'},
                {label: {heading: 'Assign later', subHeading: 'Keep in stock'}, value: 'later'},
              ]}
              onChange={() => {}}
            />
          </DemoItem>
          <DemoItem label="with error">
            <RadioGroupV2
              label="Applicable to"
              items={v2Items}
              onChange={() => {}}
              errorMsg="Please select an option"
            />
          </DemoItem>
        </DemoRow>
        <p style={{marginTop: 8}}>
          Selected: <b>{v2Value ?? 'none'}</b>
        </p>
      </DemoSection>

      <DemoSection title="Disabled" description="Both generations support a disabled state.">
        <DemoRow>
          <DemoItem label="RadioGroup">
            <RadioGroup
              radioHeading="RadioGroup"
              defaultValue="label 1"
              items={legacyItems}
              onChange={() => {}}
              disabled
            />
          </DemoItem>
          <DemoItem label="RadioGroupV2">
            <RadioGroupV2 label="Sample Radio Heading" items={v2Items} onChange={() => {}} disabled />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Loading skeleton"
        description="RadioGroup renders a skeleton via showSkeleton; RadioGroupV2 via isLoading."
      >
        <DemoRow>
          <DemoItem label="showSkeleton">
            <RadioGroup radioHeading="RadioGroup" items={legacyItems} onChange={() => {}} showSkeleton />
          </DemoItem>
          <DemoItem label="isLoading">
            <RadioGroupV2 label="Sample Radio Heading" items={v2Items} onChange={() => {}} isLoading />
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
