import {useState} from 'react'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'
import {
  InputV2,
  TextareaV2,
  InputControlV2,
  LabelV2,
  InputGroupV2,
  InputLeftIcon,
  InputRightIcon,
  InputLeftAdornment,
  InputRightAdornment,
  InputCount,
  InputNumber,
} from '../../components'

const searchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`
const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`

const currencyOptions = [
  {value: 'USD', label: 'USD — US Dollar'},
  {value: 'EUR', label: 'EUR — Euro'},
  {value: 'SGD', label: 'SGD — Singapore Dollar'},
  {value: 'INR', label: 'INR — Indian Rupee'},
]

export default function InputV2Page() {
  const [assetTag, setAssetTag] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [count, setCount] = useState(2)
  const [seats, setSeats] = useState(25)

  return (
    <div>
      <h1>InputV2</h1>
      <p>Second-generation text input with built-in error handling, labels, icons and adornments.</p>

      <DemoSection
        title="Basic usage"
        description="A drop-in replacement for the native input with error messaging. TextareaV2 shares the same API for multi-line text."
        code={`import {InputV2, TextareaV2} from '@hybr1d-tech/charizard'

<InputV2 placeholder="Enter asset tag" />
<InputV2 placeholder="Enter serial number" errorMsg="Serial number is required" />
<InputV2 placeholder="Managed by MDM" disabled />
<TextareaV2 placeholder="Add a note about this device" rows={3} />`}
      >
        <DemoRow label="Input states">
          <DemoItem label="Default">
            <div style={{width: 240}}>
              <InputV2
                placeholder="Enter asset tag"
                value={assetTag}
                onChange={e => setAssetTag(e.target.value)}
              />
            </div>
          </DemoItem>
          <DemoItem label="With error">
            <div style={{width: 240}}>
              <InputV2 placeholder="Enter serial number" errorMsg="Serial number is required" />
            </div>
          </DemoItem>
          <DemoItem label="Disabled">
            <div style={{width: 240}}>
              <InputV2 placeholder="Managed by MDM" disabled />
            </div>
          </DemoItem>
        </DemoRow>
        <DemoRow label="Textarea">
          <DemoItem label="Default">
            <div style={{width: 320}}>
              <TextareaV2 placeholder="Add a note about this device" rows={3} />
            </div>
          </DemoItem>
          <DemoItem label="With error">
            <div style={{width: 320}}>
              <TextareaV2 placeholder="Reason for offboarding" rows={3} errorMsg="A reason is required" />
            </div>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Label and control"
        description="InputControlV2 stacks a LabelV2 above the field. Labels support a required marker and an info tooltip."
        code={`import {InputControlV2, LabelV2, InputV2} from '@hybr1d-tech/charizard'

<InputControlV2>
  <LabelV2 required info="Shown on the device sticker">Asset tag</LabelV2>
  <InputV2 placeholder="e.g. ZEN-MBP-0042" />
</InputControlV2>`}
      >
        <DemoRow>
          <DemoItem label="Required with info tooltip">
            <div style={{width: 260}}>
              <InputControlV2>
                <LabelV2 required info="Shown on the device sticker">
                  Asset tag
                </LabelV2>
                <InputV2 placeholder="e.g. ZEN-MBP-0042" />
              </InputControlV2>
            </div>
          </DemoItem>
          <DemoItem label="Plain label">
            <div style={{width: 260}}>
              <InputControlV2>
                <LabelV2>Employee email</LabelV2>
                <InputV2 type="email" placeholder="jane@acme.com" />
              </InputControlV2>
            </div>
          </DemoItem>
          <DemoItem label="Disabled">
            <div style={{width: 260}}>
              <InputControlV2>
                <LabelV2 disabled>Warranty ID</LabelV2>
                <InputV2 placeholder="Auto-filled from vendor" disabled />
              </InputControlV2>
            </div>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Icons and adornments"
        description="InputGroupV2 composes the input with left/right icons or adornments. Adornments can be static text or a searchable dropdown."
      >
        <DemoRow label="Icons">
          <DemoItem label="Left icon">
            <div style={{width: 260}}>
              <InputGroupV2>
                <InputLeftIcon icon={searchIcon} />
                <InputV2 placeholder="Search devices" />
              </InputGroupV2>
            </div>
          </DemoItem>
          <DemoItem label="Both sides, clickable">
            <div style={{width: 260}}>
              <InputGroupV2>
                <InputLeftIcon icon={searchIcon} />
                <InputV2 placeholder="Search orders" />
                <InputRightIcon icon={closeIcon} onClick={() => {}} />
              </InputGroupV2>
            </div>
          </DemoItem>
        </DemoRow>
        <DemoRow label="Adornments">
          <DemoItem label="Static text">
            <div style={{width: 300}}>
              <InputGroupV2>
                <InputLeftAdornment>https://</InputLeftAdornment>
                <InputV2 placeholder="acme" />
                <InputRightAdornment>.zenadmin.ai</InputRightAdornment>
              </InputGroupV2>
            </div>
          </DemoItem>
          <DemoItem label="Dropdown adornment">
            <div style={{width: 300}}>
              <InputGroupV2>
                <InputLeftAdornment
                  isDropdown
                  options={currencyOptions}
                  onOptionSelect={value => setCurrency(value)}
                >
                  {currency}
                </InputLeftAdornment>
                <InputV2 placeholder="Order value" />
              </InputGroupV2>
            </div>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Numeric inputs"
        description="InputCount is a stepper for small quantities; InputNumber accepts free numeric entry with the same increment/decrement controls. Both are controlled via count + onCountChange."
        code={`import {InputCount, InputNumber} from '@hybr1d-tech/charizard'

const [count, setCount] = useState(2)

<InputCount count={count} onCountChange={setCount} min={0} max={10} />
<InputNumber count={seats} onCountChange={setSeats} min={1} max={500} />`}
      >
        <DemoRow>
          <DemoItem label={`InputCount — ${count} chargers`}>
            <div style={{width: 200}}>
              <InputCount count={count} onCountChange={setCount} min={0} max={10} />
            </div>
          </DemoItem>
          <DemoItem label={`InputNumber — ${seats} license seats`}>
            <div style={{width: 200}}>
              <InputNumber count={seats} onCountChange={setSeats} min={1} max={500} />
            </div>
          </DemoItem>
          <DemoItem label="Disabled">
            <div style={{width: 200}}>
              <InputCount count={3} onCountChange={() => {}} disabled />
            </div>
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
