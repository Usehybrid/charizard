import {useState} from 'react'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'
import {ColorPicker} from '../../components'

export default function ColorPickerPage() {
  const [tagColor, setTagColor] = useState('')
  const [brandColor, setBrandColor] = useState('#2980b9')

  return (
    <div>
      <h1>ColorPicker</h1>
      <p>Zag.js-powered color picker with a swatch trigger and a preset palette.</p>

      <DemoSection
        title="Basic usage"
        description="Give the picker a form name and react to selections via onChange, which receives the color as a string."
        code={`import {ColorPicker} from '@hybr1d-tech/charizard'

<ColorPicker
  name="tag-color"
  onChange={color => setTagColor(color)}
/>`}
      >
        <DemoRow>
          <DemoItem label={tagColor ? `Selected: ${tagColor}` : 'Pick a tag color'}>
            <ColorPicker name="tag-color" onChange={color => setTagColor(color)} />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Label and default color"
        description="Add a form label with an optional required marker, and seed the swatch with defaultColor."
        code={`<ColorPicker
  name="brand-color"
  label="Workspace accent color"
  required
  defaultColor="#2980b9"
  onChange={color => setBrandColor(color)}
/>`}
      >
        <DemoRow>
          <DemoItem label={`Current: ${brandColor}`}>
            <ColorPicker
              name="brand-color"
              label="Workspace accent color"
              required
              defaultColor="#2980b9"
              onChange={color => setBrandColor(color)}
            />
          </DemoItem>
          <DemoItem label="Optional field">
            <ColorPicker
              name="badge-color"
              label="Badge color"
              defaultColor="#27ae60"
              onChange={() => {}}
            />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection title="Error state" description="errorMsg renders a validation message below the control.">
        <DemoRow>
          <DemoItem label="With error">
            <ColorPicker
              name="status-color"
              label="Status color"
              required
              errorMsg="Pick a color for this device status"
              onChange={() => {}}
            />
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
