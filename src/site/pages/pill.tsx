import {Pill, PILL_STATUS} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'

export default function PillPage() {
  return (
    <div>
      <h1>Pill</h1>
      <p>Rounded pill label in six semantic status colorways.</p>

      <DemoSection
        title="Statuses"
        description="Pass a PILL_STATUS to pick the colorway. DEFAULT is used when omitted."
        code={`
import {Pill, PILL_STATUS} from '@hybr1d-tech/charizard'

<Pill>Procurement</Pill>
<Pill status={PILL_STATUS.POSITIVE}>Delivered</Pill>
<Pill status={PILL_STATUS.WARNING}>Awaiting quote</Pill>
<Pill status={PILL_STATUS.NEGATIVE}>Payment overdue</Pill>
`}
      >
        <DemoRow>
          <DemoItem label="DEFAULT">
            <Pill>Procurement</Pill>
          </DemoItem>
          <DemoItem label="NEUTRAL">
            <Pill status={PILL_STATUS.NEUTRAL}>Archived</Pill>
          </DemoItem>
          <DemoItem label="POSITIVE">
            <Pill status={PILL_STATUS.POSITIVE}>Delivered</Pill>
          </DemoItem>
          <DemoItem label="WARNING">
            <Pill status={PILL_STATUS.WARNING}>Awaiting quote</Pill>
          </DemoItem>
          <DemoItem label="NEGATIVE">
            <Pill status={PILL_STATUS.NEGATIVE}>Payment overdue</Pill>
          </DemoItem>
          <DemoItem label="HIGHLIGHT">
            <Pill status={PILL_STATUS.HIGHLIGHT}>In transit</Pill>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="In context"
        description="Pills label order and device lifecycle states in lists and tables."
      >
        <DemoRow label={'Order #ZA-2214 — 3 × MacBook Pro 14" M4'}>
          <Pill status={PILL_STATUS.POSITIVE}>Quote accepted</Pill>
          <Pill status={PILL_STATUS.HIGHLIGHT}>Shipped</Pill>
          <Pill status={PILL_STATUS.WARNING}>Customs hold</Pill>
        </DemoRow>
        <DemoRow label="Device C02XL0GYJGH5 — Dell Latitude 7450">
          <Pill>Assigned</Pill>
          <Pill status={PILL_STATUS.NEUTRAL}>Warranty expired</Pill>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
