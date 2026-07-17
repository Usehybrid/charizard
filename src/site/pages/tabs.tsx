import * as React from 'react'
import {Tab, Tabs} from '../../components'
import {DemoSection} from '../showcase/DemoSection'

const noop = () => {}

const paneStyle: React.CSSProperties = {padding: '16px 4px', maxWidth: 560}

export default function TabsPage() {
  const [activeKey, setActiveKey] = React.useState('overview')
  const [styledKey, setStyledKey] = React.useState('monthly')

  return (
    <div>
      <h1>Tabs</h1>
      <p>Controlled tab switcher: a tab bar of buttons with a single visible content pane.</p>

      <DemoSection
        title="Controlled tabs"
        description="Tabs is fully controlled: pass the current activeKey and an onSelect handler. Each Tab declares its title and eventKey; the isActive and onClick props are required by the Tab type but are overridden by Tabs via cloneElement, so placeholders are fine."
        code={`
const [activeKey, setActiveKey] = React.useState('overview')

<Tabs id="device-tabs" activeKey={activeKey} onSelect={setActiveKey}>
  <Tab title="Overview" eventKey="overview" isActive={false} onClick={() => {}}>
    <p>Overview pane</p>
  </Tab>
  <Tab title="Specifications" eventKey="specs" isActive={false} onClick={() => {}}>
    <p>Specifications pane</p>
  </Tab>
  <Tab title="Activity" eventKey="activity" isActive={false} onClick={() => {}}>
    <p>Activity pane</p>
  </Tab>
</Tabs>
`}
      >
        <Tabs id="showcase-tabs" activeKey={activeKey} onSelect={setActiveKey}>
          <Tab title="Overview" eventKey="overview" isActive={false} onClick={noop}>
            <div style={paneStyle}>
              <p>
                MacBook Pro 14&quot; — assigned to Priya Nair. Enrolled in MDM, disk encryption
                on, last check-in 2 hours ago.
              </p>
            </div>
          </Tab>
          <Tab title="Specifications" eventKey="specs" isActive={false} onClick={noop}>
            <div style={paneStyle}>
              <p>Apple M3 Pro, 18 GB unified memory, 512 GB SSD, macOS 15.2.</p>
            </div>
          </Tab>
          <Tab title="Activity" eventKey="activity" isActive={false} onClick={noop}>
            <div style={paneStyle}>
              <p>3 events this week: OS update applied, policy sync, battery health report.</p>
            </div>
          </Tab>
        </Tabs>
      </DemoSection>

      <DemoSection
        title="Custom styling"
        description="Both Tabs and Tab accept customClassName and customStyles. Here the container is width-constrained and each Tab button gets letter-spacing via customStyles."
        code={`
<Tabs
  id="billing-tabs"
  activeKey={activeKey}
  onSelect={setActiveKey}
  customStyles={{maxWidth: 420}}
>
  <Tab
    title="Monthly"
    eventKey="monthly"
    customStyles={{letterSpacing: '0.04em'}}
    isActive={false}
    onClick={() => {}}
  >
    Billed every month.
  </Tab>
  <Tab
    title="Yearly"
    eventKey="yearly"
    customStyles={{letterSpacing: '0.04em'}}
    isActive={false}
    onClick={() => {}}
  >
    Billed once a year.
  </Tab>
</Tabs>
`}
      >
        <Tabs
          id="showcase-tabs-styled"
          activeKey={styledKey}
          onSelect={setStyledKey}
          customStyles={{maxWidth: 420}}
        >
          <Tab
            title="Monthly"
            eventKey="monthly"
            customStyles={{letterSpacing: '0.04em'}}
            isActive={false}
            onClick={noop}
          >
            <div style={paneStyle}>
              <p>Billed every month, cancel anytime.</p>
            </div>
          </Tab>
          <Tab
            title="Yearly"
            eventKey="yearly"
            customStyles={{letterSpacing: '0.04em'}}
            isActive={false}
            onClick={noop}
          >
            <div style={paneStyle}>
              <p>Billed once a year — two months free.</p>
            </div>
          </Tab>
        </Tabs>
      </DemoSection>
    </div>
  )
}
