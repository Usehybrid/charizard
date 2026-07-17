import * as React from 'react'
import {Search} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoItem, DemoRow} from '../showcase/DemoRow'

export default function SearchPage() {
  const [search, setSearch] = React.useState('')
  const [longSearch, setLongSearch] = React.useState(
    'hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello',
  )

  return (
    <div>
      <h1>Search</h1>
      <p>Search input with built-in icon, clear button and long-value overflow handling.</p>

      <DemoSection
        title="Basic usage"
        description="Pass search and setSearch to control the value; a clear icon appears once there is text."
        code={`import {Search} from '@hybr1d-tech/charizard'

const [search, setSearch] = React.useState('')

<Search id="device-search" search={search} setSearch={setSearch} placeholder="Search devices" />`}
      >
        <div style={{width: '100%', maxWidth: 360}}>
          <Search id="basic-search" search={search} setSearch={setSearch} placeholder="Search devices" />
        </div>
      </DemoSection>

      <DemoSection
        title="Long value overflow"
        description="Values longer than the field stay contained; the clear icon remains reachable."
      >
        <div style={{width: '100%', maxWidth: 360}}>
          <Search id="overflow-search" search={longSearch} setSearch={setLongSearch} />
        </div>
      </DemoSection>

      <DemoSection
        title="Uncontrolled and disabled"
        description="Without search/setSearch the input is uncontrolled. Disabled blocks interaction."
      >
        <DemoRow>
          <DemoItem label="uncontrolled">
            <Search id="uncontrolled-search" placeholder="Type freely" />
          </DemoItem>
          <DemoItem label="disabled">
            <Search id="disabled-search" disabled placeholder="Search" />
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
