import {useState} from 'react'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'
import {SwitchV2} from '../../components'

export default function SwitchV2Page() {
  const [mfa, setMfa] = useState(true)
  const [autoAssign, setAutoAssign] = useState(false)

  return (
    <div>
      <h1>SwitchV2</h1>
      <p>Zag.js-powered toggle switch with label, info tooltip and error message support.</p>

      <DemoSection
        title="Basic usage"
        description="Children render as the switch label. Use defaultChecked for uncontrolled usage and onCheckedChange to react to toggles."
        code={`import {SwitchV2} from '@hybr1d-tech/charizard'

<SwitchV2
  defaultChecked
  onCheckedChange={({checked}) => console.log(checked)}
>
  Notify me on delivery
</SwitchV2>`}
      >
        <DemoRow>
          <DemoItem label="Off by default">
            <SwitchV2>Notify me on delivery</SwitchV2>
          </DemoItem>
          <DemoItem label="On by default">
            <SwitchV2 defaultChecked>Weekly device report</SwitchV2>
          </DemoItem>
          <DemoItem label="No label">
            <SwitchV2 />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Controlled"
        description="Pass checked to drive the switch from state; onCheckedChange reports the new value."
        code={`const [mfa, setMfa] = useState(true)

<SwitchV2 checked={mfa} onCheckedChange={({checked}) => setMfa(checked)}>
  Require MFA for all users
</SwitchV2>`}
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <SwitchV2 checked={mfa} onCheckedChange={({checked}) => setMfa(checked)}>
            Require MFA for all users
          </SwitchV2>
          <SwitchV2 checked={autoAssign} onCheckedChange={({checked}) => setAutoAssign(checked)}>
            Auto-assign licenses to new hires
          </SwitchV2>
          <p>
            MFA: {mfa ? 'on' : 'off'} · Auto-assign: {autoAssign ? 'on' : 'off'}
          </p>
        </div>
      </DemoSection>

      <DemoSection
        title="Info tooltip and error"
        description="info renders an info icon with a tooltip next to the label; errorMsg renders below the switch."
      >
        <DemoRow>
          <DemoItem label="With info">
            <SwitchV2 info="Devices are locked remotely when marked lost" defaultChecked>
              Enable lost mode
            </SwitchV2>
          </DemoItem>
          <DemoItem label="With error">
            <SwitchV2 errorMsg="This setting requires an MDM connection">
              Enforce disk encryption
            </SwitchV2>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection title="Disabled" description="Disabled switches keep their checked state but ignore interaction.">
        <DemoRow>
          <DemoItem label="Disabled off">
            <SwitchV2 disabled>Beta features</SwitchV2>
          </DemoItem>
          <DemoItem label="Disabled on">
            <SwitchV2 disabled defaultChecked>
              SSO enforced by org policy
            </SwitchV2>
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
