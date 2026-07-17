import * as React from 'react'
import {LayoutTabs} from '../../components'
import {DemoSection} from '../showcase/DemoSection'

const paneStyle: React.CSSProperties = {padding: '16px 4px', maxWidth: 560}

const DEVICE_TABS = [
  {
    label: 'Details',
    value: 'details',
    content: (
      <div style={paneStyle}>
        <p>Device details: model, serial number, warranty, and assignment history.</p>
      </div>
    ),
  },
  {
    label: 'Apps',
    value: 'apps',
    content: (
      <div style={paneStyle}>
        <p>Installed applications with versions and license status.</p>
      </div>
    ),
  },
  {
    label: 'Security',
    value: 'security',
    content: (
      <div style={paneStyle}>
        <p>Encryption, firewall, and MDM compliance checks.</p>
      </div>
    ),
  },
]

const ORDER_TABS = [
  {label: 'Open', value: 'open', content: <div style={paneStyle}>4 open orders.</div>},
  {label: 'Shipped', value: 'shipped', content: <div style={paneStyle}>2 orders in transit.</div>},
  {label: 'Delivered', value: 'delivered', content: <div style={paneStyle}>18 orders delivered.</div>},
]

export default function LayoutTabsPage() {
  const [current, setCurrent] = React.useState('open')

  return (
    <div>
      <h1>LayoutTabs</h1>
      <p>
        Zag.js-powered underlined tab bar used at the top of page layouts. In product apps the
        onValueChange callback usually drives route navigation; the component itself is
        uncontrolled after defaultValue, so it is demoed here statically with content panes.
      </p>

      <DemoSection
        title="Basic layout tabs"
        description="Pass an array of {label, value, content} plus the defaultValue to open with. Keyboard navigation, ARIA wiring and the active underline come from Zag's tabs machine."
        code={`
<LayoutTabs
  defaultValue="details"
  tabs={[
    {label: 'Details', value: 'details', content: <DetailsPane />},
    {label: 'Apps', value: 'apps', content: <AppsPane />},
    {label: 'Security', value: 'security', content: <SecurityPane />},
  ]}
/>
`}
      >
        <div style={{width: '100%'}}>
          <LayoutTabs defaultValue="details" tabs={DEVICE_TABS} />
        </div>
      </DemoSection>

      <DemoSection
        title="onValueChange callback"
        description="onValueChange fires with the newly selected value — this is the hook point for syncing the tab to the URL (e.g. navigate to a child route). tabClassName lets you restyle the tab list container. Selection state itself stays inside the component."
        code={`
const [current, setCurrent] = React.useState('open')

<LayoutTabs
  defaultValue="open"
  tabs={orderTabs}
  tabClassName="my-tab-list"
  onValueChange={value => setCurrent(value)}
/>
`}
      >
        <div style={{width: '100%'}}>
          <LayoutTabs defaultValue="open" tabs={ORDER_TABS} onValueChange={setCurrent} />
          <p style={{marginTop: 12}}>
            Last reported value: <strong>{current}</strong>
          </p>
        </div>
      </DemoSection>
    </div>
  )
}
