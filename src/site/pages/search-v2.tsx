import {useState} from 'react'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'
import {SearchV2} from '../../components'

const devices = [
  'MacBook Pro 14" — Priya Sharma',
  'MacBook Air 13" — Marcus Chen',
  'Dell XPS 13 — Sofia Petrova',
  'ThinkPad X1 Carbon — Diego Alvarez',
  'iPhone 15 — Priya Sharma',
]

export default function SearchV2Page() {
  const [query, setQuery] = useState('')

  const filtered = devices.filter(d => d.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <h1>SearchV2</h1>
      <p>Search input with built-in search icon, clear button and debounced controlled mode.</p>

      <DemoSection
        title="Basic usage"
        description="Uncontrolled: the component manages its own text. A clear icon appears once there is a value."
        code={`import {SearchV2} from '@hybr1d-tech/charizard'

<SearchV2 placeholder="Search devices" />`}
      >
        <DemoRow>
          <DemoItem>
            <div style={{width: 300}}>
              <SearchV2 placeholder="Search devices" />
            </div>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Controlled with debounce"
        description="Pass search and setSearch to get a debounced value — setSearch fires after the user pauses typing, ideal for filtering lists or firing API queries."
        code={`const [query, setQuery] = useState('')

<SearchV2
  search={query}
  setSearch={setQuery}
  placeholder="Search assigned devices"
/>`}
      >
        <div style={{width: 340}}>
          <SearchV2 search={query} setSearch={setQuery} placeholder="Search assigned devices" />
          <ul style={{marginTop: 12, paddingLeft: 20}}>
            {filtered.length ? (
              filtered.map(d => <li key={d}>{d}</li>)
            ) : (
              <li>No devices match “{query}”</li>
            )}
          </ul>
        </div>
      </DemoSection>

      <DemoSection
        title="States"
        description="SearchV2 forwards InputV2 props, so disabled and errorMsg work as they do on InputV2."
      >
        <DemoRow>
          <DemoItem label="Disabled">
            <div style={{width: 300}}>
              <SearchV2 placeholder="Search unavailable offline" disabled />
            </div>
          </DemoItem>
          <DemoItem label="With error">
            <div style={{width: 300}}>
              <SearchV2 placeholder="Search orders" errorMsg="Enter at least 3 characters" />
            </div>
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
