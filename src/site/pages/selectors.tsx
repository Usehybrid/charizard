import {useState} from 'react'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'
import {Selectors} from '../../components'

export default function SelectorsPage() {
  const [view, setView] = useState('Devices')
  const [range, setRange] = useState('30 days')

  return (
    <div>
      <h1>Selectors</h1>
      <p>Segmented button group that tracks its own active segment and fires onClick per option.</p>

      <DemoSection
        title="Basic usage"
        description="Pass an array of {name, onClick}. The component highlights the clicked segment internally; use onClick to react to changes."
        code={`import {Selectors} from '@hybr1d-tech/charizard'

<Selectors
  selectors={[
    {name: 'Devices', onClick: () => setView('Devices')},
    {name: 'Licenses', onClick: () => setView('Licenses')},
    {name: 'Orders', onClick: () => setView('Orders')},
  ]}
/>`}
      >
        <DemoRow>
          <DemoItem label={`Active view: ${view}`}>
            <Selectors
              selectors={[
                {name: 'Devices', onClick: () => setView('Devices')},
                {name: 'Licenses', onClick: () => setView('Licenses')},
                {name: 'Orders', onClick: () => setView('Orders')},
              ]}
            />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Two segments"
        description="Works with any number of options — the first and last segments get rounded outer corners."
      >
        <DemoRow>
          <DemoItem label="Binary toggle">
            <Selectors
              selectors={[
                {name: 'Active', onClick: () => {}},
                {name: 'Archived', onClick: () => {}},
              ]}
            />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Many options"
        description="A wider group used as a report date-range picker."
      >
        <DemoRow>
          <DemoItem label={`Range: ${range}`}>
            <Selectors
              selectors={[
                {name: '7 days', onClick: () => setRange('7 days')},
                {name: '30 days', onClick: () => setRange('30 days')},
                {name: '90 days', onClick: () => setRange('90 days')},
                {name: '12 months', onClick: () => setRange('12 months')},
                {name: 'All time', onClick: () => setRange('All time')},
              ]}
            />
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
