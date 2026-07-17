import * as React from 'react'
import {Switch} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoItem, DemoRow} from '../showcase/DemoRow'

export default function SwitchPage() {
  const [toggled, setToggled] = React.useState(true)

  return (
    <div>
      <h1>Switch</h1>
      <p>On/off toggle switch with optional title, sub-text, sizes and a disabled state.</p>

      <DemoSection
        title="States"
        description="Checked, initial (off) and checked + disabled."
        code={`import {Switch} from '@hybr1d-tech/charizard'

<Switch name="checked" title="Switch" isToggled={true} handleToggleChange={() => {}} />
<Switch name="initial" isToggled={false} handleToggleChange={() => {}} />
<Switch name="checked-disabled" isToggled={true} disabled handleToggleChange={() => {}} />`}
      >
        <DemoRow>
          <DemoItem label="checked">
            <Switch name="checked" title="Switch" isToggled={true} handleToggleChange={() => {}} />
          </DemoItem>
          <DemoItem label="initial">
            <Switch name="initial" isToggled={false} handleToggleChange={() => {}} />
          </DemoItem>
          <DemoItem label="checked + disabled">
            <Switch name="checked-disabled" isToggled={true} disabled handleToggleChange={() => {}} />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection title="Sizes" description="Three sizes: sm, md (default) and lg.">
        <DemoRow>
          <DemoItem label="sm">
            <Switch name="size-sm" size="sm" isToggled={true} handleToggleChange={() => {}} />
          </DemoItem>
          <DemoItem label="md">
            <Switch name="size-md" size="md" isToggled={true} handleToggleChange={() => {}} />
          </DemoItem>
          <DemoItem label="lg">
            <Switch name="size-lg" size="lg" isToggled={true} handleToggleChange={() => {}} />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Interactive with sub-text"
        description="A controlled switch; subText renders below the control only while it is toggled on."
        code={`const [toggled, setToggled] = React.useState(true)

<Switch
  name="notifications"
  title="Email notifications"
  isToggled={toggled}
  handleToggleChange={setToggled}
  subText="You will receive a weekly digest."
/>`}
      >
        <Switch
          name="notifications"
          title="Email notifications"
          isToggled={toggled}
          handleToggleChange={setToggled}
          subText="You will receive a weekly digest."
        />
      </DemoSection>
    </div>
  )
}
