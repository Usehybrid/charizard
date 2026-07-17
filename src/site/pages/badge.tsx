import * as React from 'react'
import {Badge, BADGE_STATUS, BADGE_HIGHLIGHT} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'
import infoIcon from '../../components/assets/info-circle.svg'
import checkIcon from '../../components/assets/check.svg'

export default function BadgePage() {
  const [assignees, setAssignees] = React.useState(['Priya Nair', 'Marcus Chen', 'Sofia Alvarez'])

  return (
    <div>
      <h1>Badge</h1>
      <p>Small count or status badge with optional dot / icon highlight and removable variant.</p>

      <DemoSection
        title="Statuses"
        description="Six semantic colorways. DEFAULT is used when status is omitted."
        code={`
import {Badge, BADGE_STATUS} from '@hybr1d-tech/charizard'

<Badge status={BADGE_STATUS.POSITIVE}>Compliant</Badge>
<Badge status={BADGE_STATUS.WARNING}>Update pending</Badge>
<Badge status={BADGE_STATUS.NEGATIVE}>Non-compliant</Badge>
`}
      >
        <DemoRow>
          <DemoItem label="DEFAULT">
            <Badge>In stock</Badge>
          </DemoItem>
          <DemoItem label="NEUTRAL">
            <Badge status={BADGE_STATUS.NEUTRAL}>Archived</Badge>
          </DemoItem>
          <DemoItem label="POSITIVE">
            <Badge status={BADGE_STATUS.POSITIVE}>Compliant</Badge>
          </DemoItem>
          <DemoItem label="WARNING">
            <Badge status={BADGE_STATUS.WARNING}>Update pending</Badge>
          </DemoItem>
          <DemoItem label="NEGATIVE">
            <Badge status={BADGE_STATUS.NEGATIVE}>Non-compliant</Badge>
          </DemoItem>
          <DemoItem label="HIGHLIGHT">
            <Badge status={BADGE_STATUS.HIGHLIGHT}>In transit</Badge>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Highlights"
        description="highlight adds a leading dot or an icon (local SVG path or https CDN URL) tinted to the status color."
        code={`
import {Badge, BADGE_STATUS, BADGE_HIGHLIGHT} from '@hybr1d-tech/charizard'
import infoIcon from './assets/info-circle.svg'

<Badge highlight={BADGE_HIGHLIGHT.DOT} status={BADGE_STATUS.POSITIVE}>Online</Badge>
<Badge highlight={BADGE_HIGHLIGHT.ICON} icon={infoIcon} status={BADGE_STATUS.HIGHLIGHT}>
  Awaiting approval
</Badge>
`}
      >
        <DemoRow>
          <DemoItem label="DOT">
            <Badge highlight={BADGE_HIGHLIGHT.DOT} status={BADGE_STATUS.POSITIVE}>
              Online
            </Badge>
          </DemoItem>
          <DemoItem label="DOT">
            <Badge highlight={BADGE_HIGHLIGHT.DOT} status={BADGE_STATUS.NEGATIVE}>
              Offline
            </Badge>
          </DemoItem>
          <DemoItem label="ICON">
            <Badge
              highlight={BADGE_HIGHLIGHT.ICON}
              icon={infoIcon}
              status={BADGE_STATUS.HIGHLIGHT}
            >
              Awaiting approval
            </Badge>
          </DemoItem>
          <DemoItem label="ICON">
            <Badge highlight={BADGE_HIGHLIGHT.ICON} icon={checkIcon} status={BADGE_STATUS.POSITIVE}>
              Delivered
            </Badge>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Selected (removable)"
        description="selected renders a remove icon; onClick is required and fires when it is clicked."
      >
        <DemoRow label="Ticket assignees — click the x to remove">
          {assignees.length > 0 ? (
            assignees.map(name => (
              <Badge
                key={name}
                selected
                onClick={() => setAssignees(prev => prev.filter(n => n !== name))}
              >
                {name}
              </Badge>
            ))
          ) : (
            <Badge status={BADGE_STATUS.NEUTRAL}>No assignees</Badge>
          )}
        </DemoRow>
      </DemoSection>
    </div>
  )
}
