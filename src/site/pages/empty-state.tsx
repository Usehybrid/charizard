import * as React from 'react'
import {EmptyState} from '../../components'
import {DemoSection} from '../showcase/DemoSection'

// EmptyState renders the icon through the SVG component (react-inlinesvg),
// which accepts raw SVG markup as its source — no network fetch needed.
const BOX_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3H3V5zm0 5h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9zm6 3a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9z"/>
</svg>`

export default function EmptyStatePage() {
  const [invites, setInvites] = React.useState(0)

  return (
    <div>
      <h1>EmptyState</h1>
      <p>
        Placeholder for empty lists and zero-data views: an icon, a title, optional description
        and an optional ghost-button action. It adapts to its parent&apos;s width and height.
      </p>

      <DemoSection
        title="Default (column layout)"
        description="icon takes an SVG source — a URL or raw SVG markup — rendered through the SVG component and tinted by the component's own styles. title is required; desc is optional."
        code={`
<EmptyState
  icon={boxIconSvg}
  title="No devices yet"
  desc="Devices will appear here once they are enrolled or imported."
/>
`}
      >
        <div style={{width: '100%', minHeight: 220}}>
          <EmptyState
            icon={BOX_ICON}
            title="No devices yet"
            desc="Devices will appear here once they are enrolled or imported."
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Row layout"
        description="flexDir='row' places the icon beside left-aligned text — useful for shorter, inline empty areas like side panels."
      >
        <div style={{width: '100%'}}>
          <EmptyState
            icon={BOX_ICON}
            flexDir="row"
            title="No documents uploaded"
            desc="Contracts and invoices attached to this order will show up here."
          />
        </div>
      </DemoSection>

      <DemoSection
        title="With action button"
        description="Pass btnText and onClick to append a ghost-variant Button as the call to action."
        code={`
<EmptyState
  icon={boxIconSvg}
  title="No team members"
  desc="Invite your teammates to start assigning devices."
  btnText="Invite people"
  onClick={handleInvite}
/>
`}
      >
        <div style={{width: '100%', minHeight: 240}}>
          <EmptyState
            icon={BOX_ICON}
            title="No team members"
            desc="Invite your teammates to start assigning devices."
            btnText="Invite people"
            onClick={() => setInvites(n => n + 1)}
          />
          {invites > 0 && (
            <p style={{textAlign: 'center'}}>
              Invite clicked {invites} {invites === 1 ? 'time' : 'times'}.
            </p>
          )}
        </div>
      </DemoSection>
    </div>
  )
}
