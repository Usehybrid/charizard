import * as React from 'react'
import {SegmentedControl} from '../../components'
import {DemoSection} from '../showcase/DemoSection'

const panelStyles: React.CSSProperties = {
  padding: '12px 4px',
  color: 'var(--text-secondary, #666)',
}

const basicItems = [
  {label: 'Overview', value: 'overview', component: <div style={panelStyles}>Overview panel content</div>},
  {label: 'Activity', value: 'activity', component: <div style={panelStyles}>Activity panel content</div>},
  {label: 'Settings', value: 'settings', component: <div style={panelStyles}>Settings panel content</div>},
]

export default function SegmentedControlPage() {
  const [selected, setSelected] = React.useState<string | null>('monthly')

  return (
    <div>
      <h1>SegmentedControl</h1>
      <p>Mutually exclusive option switcher rendered as connected segments, with per-segment content.</p>

      <DemoSection
        title="Basic usage"
        description="Each item pairs a segment label with the content rendered below when it is selected. The first item is selected by default."
        code={`import {SegmentedControl} from '@hybr1d-tech/charizard'

<SegmentedControl
  items={[
    {label: 'Overview', value: 'overview', component: <OverviewPanel />},
    {label: 'Activity', value: 'activity', component: <ActivityPanel />},
    {label: 'Settings', value: 'settings', component: <SettingsPanel />},
  ]}
/>`}
      >
        <div style={{width: '100%', maxWidth: 480}}>
          <SegmentedControl items={basicItems} />
        </div>
      </DemoSection>

      <DemoSection
        title="Default value"
        description="Pass defaultValue to pick which segment is selected on first render."
        code={`<SegmentedControl
  items={items}
  defaultValue="activity"
/>`}
      >
        <div style={{width: '100%', maxWidth: 480}}>
          <SegmentedControl
            items={[
              {label: 'Overview', value: 'overview', component: <div style={panelStyles}>Overview panel content</div>},
              {label: 'Activity', value: 'activity', component: <div style={panelStyles}>Activity panel content</div>},
              {label: 'Settings', value: 'settings', component: <div style={panelStyles}>Settings panel content</div>},
            ]}
            defaultValue="activity"
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Observing selection"
        description="handleOnChange reports the newly selected value, so an external entity can react to segment changes."
      >
        <div style={{width: '100%', maxWidth: 480}}>
          <SegmentedControl
            items={[
              {label: 'Monthly', value: 'monthly', component: <div style={panelStyles}>Billed every month</div>},
              {label: 'Yearly', value: 'yearly', component: <div style={panelStyles}>Billed once a year</div>},
            ]}
            defaultValue="monthly"
            handleOnChange={value => setSelected(value)}
          />
          <p style={{marginTop: 8}}>
            Selected value: <b>{selected ?? 'none'}</b>
          </p>
        </div>
      </DemoSection>
    </div>
  )
}
