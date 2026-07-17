import * as React from 'react'
import {
  Input,
  InputContainer,
  InputGroup,
  InputLabel,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  SVG,
} from '../../components'
import searchIcon from '../../components/assets/search.svg'
import infoIcon from '../../components/assets/info-circle.svg'
import {DemoSection} from '../showcase/DemoSection'
import {DemoItem, DemoRow} from '../showcase/DemoRow'

export default function InputPage() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [website, setWebsite] = React.useState('')

  return (
    <div>
      <h1>Input</h1>
      <p>Text input with label, error, disabled and textarea states, plus addons and inline elements.</p>

      <DemoSection
        title="Basic usage"
        description="A controlled text input. The placeholder defaults to 'Placeholder' when not provided."
        code={`import {Input} from '@hybr1d-tech/charizard'

const [value, setValue] = React.useState('')

<Input
  name="name"
  placeholder="Enter your name"
  value={value}
  onChange={e => setValue(e.target.value)}
/>`}
      >
        <div style={{width: '100%', maxWidth: 360}}>
          <Input
            name="name"
            id="basic-input"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Label and container"
        description="Wrap the input with InputContainer and InputLabel for a labeled form field. Labels support required markers and info tooltips."
        code={`import {Input, InputContainer, InputLabel} from '@hybr1d-tech/charizard'

<InputContainer size="md">
  <InputLabel required htmlFor="email" infoText="We only use this for receipts">
    Work email
  </InputLabel>
  <Input name="email" id="email" type="email" placeholder="you@company.com" />
</InputContainer>`}
      >
        <InputContainer size="md">
          <InputLabel required htmlFor="labeled-email" infoText="We only use this for receipts">
            Work email
          </InputLabel>
          <Input
            name="email"
            id="labeled-email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </InputContainer>
      </DemoSection>

      <DemoSection title="Error state" description="Pass errorMsg to show the error border and message.">
        <div style={{width: '100%', maxWidth: 360}}>
          <Input name="error-input" id="error-input" placeholder="Serial number" errorMsg="This field is required" />
        </div>
      </DemoSection>

      <DemoSection title="Disabled" description="Disabled inputs keep their value but block interaction.">
        <DemoRow>
          <DemoItem label="empty">
            <Input name="disabled-input" id="disabled-input" disabled placeholder="Disabled" />
          </DemoItem>
          <DemoItem label="with value">
            <Input name="disabled-input-value" id="disabled-input-value" disabled value="Read only value" />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection title="Textarea" description="Set type='textarea' for a multi-line input; rows and cols are supported.">
        <div style={{width: '100%', maxWidth: 360}}>
          <Input
            type="textarea"
            name="notes"
            id="notes"
            rows={4}
            placeholder="Add notes..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Elements and addons"
        description="InputGroup composes the input with inline elements (icons inside the field) or addons (attached segments). Addons can also open a searchable dropdown."
      >
        <DemoRow label="Inline elements">
          <DemoItem label="left element">
            <InputGroup>
              <InputLeftElement>
                <SVG path={searchIcon} width={16} height={16} />
              </InputLeftElement>
              <Input name="with-left-element" id="with-left-element" placeholder="Search devices" />
            </InputGroup>
          </DemoItem>
          <DemoItem label="right element">
            <InputGroup>
              <Input name="with-right-element" id="with-right-element" placeholder="Amount" />
              <InputRightElement>
                <SVG path={infoIcon} width={16} height={16} />
              </InputRightElement>
            </InputGroup>
          </DemoItem>
        </DemoRow>
        <DemoRow label="Addons">
          <DemoItem label="left addon">
            <InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>
              <Input
                name="website"
                id="website"
                placeholder="zenadmin.ai"
                value={website}
                onChange={e => setWebsite(e.target.value)}
              />
            </InputGroup>
          </DemoItem>
          <DemoItem label="dropdown addon">
            <InputGroup>
              <InputLeftAddon
                isDropdown
                dropdownOptions={[
                  {label: '+65', value: 'sg'},
                  {label: '+91', value: 'in'},
                  {label: '+49', value: 'de'},
                ]}
                handleOptionClick={option => console.log('selected', option)}
                showDropdownSearch={false}
              >
                +65
              </InputLeftAddon>
              <Input name="phone" id="phone" type="tel" placeholder="Phone number" />
            </InputGroup>
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
