import {Accordion} from '../../components'
import {DemoSection} from '../showcase/DemoSection'

export default function AccordionPage() {
  return (
    <div>
      <h1>Accordion</h1>
      <p>Zag.js-powered expandable content sections with animated collapse.</p>

      <DemoSection
        title="Multiple expandable sections"
        description="Compose with Accordion.Item, Accordion.Header and Accordion.Collapse, keyed by eventKey. isMulti allows several sections open at once; isOpenAll (with allEventKeys) starts them all expanded."
        code={`
import {Accordion} from '@hybr1d-tech/charizard'

<Accordion defaultActiveKey="mdm" isMulti allEventKeys={['mdm', 'apps', 'offboarding']}>
  <Accordion.Item eventKey="mdm">
    <Accordion.Header eventKey="mdm">How do devices get enrolled into MDM?</Accordion.Header>
    <Accordion.Collapse eventKey="mdm">
      <div>New devices enroll automatically at first boot via zero-touch provisioning.</div>
    </Accordion.Collapse>
  </Accordion.Item>

  <Accordion.Item eventKey="apps">
    <Accordion.Header eventKey="apps">Which apps are installed by default?</Accordion.Header>
    <Accordion.Collapse eventKey="apps">
      <div>The baseline bundle: browser, VPN client, password manager and the ZenAdmin agent.</div>
    </Accordion.Collapse>
  </Accordion.Item>
</Accordion>
`}
      >
        <Accordion
          defaultActiveKey="mdm"
          isMulti
          allEventKeys={['mdm', 'apps', 'offboarding']}
          customStyle={{width: '100%'}}
        >
          <Accordion.Item eventKey="mdm">
            <Accordion.Header eventKey="mdm">How do devices get enrolled into MDM?</Accordion.Header>
            <Accordion.Collapse eventKey="mdm">
              <div style={{padding: '8px 0'}}>
                New MacBooks and Windows laptops enroll automatically at first boot via zero-touch
                provisioning. The device shows up in the inventory within a few minutes with its
                serial number, assigned user and compliance state.
              </div>
            </Accordion.Collapse>
          </Accordion.Item>

          <Accordion.Item eventKey="apps">
            <Accordion.Header eventKey="apps">Which apps are installed by default?</Accordion.Header>
            <Accordion.Collapse eventKey="apps">
              <div style={{padding: '8px 0'}}>
                The baseline bundle: browser, VPN client, password manager and the ZenAdmin agent.
                Team-specific apps (Figma, Xcode, Docker) are layered on top from the assigned app
                policy.
              </div>
            </Accordion.Collapse>
          </Accordion.Item>

          <Accordion.Item eventKey="offboarding">
            <Accordion.Header eventKey="offboarding">
              What happens to a device when an employee leaves?
            </Accordion.Header>
            <Accordion.Collapse eventKey="offboarding">
              <div style={{padding: '8px 0'}}>
                The offboarding workflow revokes SaaS access, remote-locks the device and schedules
                a courier pickup. Once returned, the device is wiped and moved back into stock.
              </div>
            </Accordion.Collapse>
          </Accordion.Item>
        </Accordion>
      </DemoSection>
    </div>
  )
}
