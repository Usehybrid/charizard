import {Status, STATUS_STATUS} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'

function Label({children}: {children: React.ReactNode}) {
  return (
    <div className="zap-caption-medium" style={{color: 'var(--text-primary)'}}>
      {children}
    </div>
  )
}

export default function StatusPage() {
  return (
    <div>
      <h1>Status</h1>
      <p>Colored dot (or icon) status indicator with a label, for device and workflow states.</p>

      <DemoSection
        title="Dot statuses"
        description="Five dot-based statuses map to semantic colors. INFO is the default."
        code={`
import {Status, STATUS_STATUS} from '@hybr1d-tech/charizard'

<Status status={STATUS_STATUS.ENABLED}>
  <div className="zap-caption-medium">MDM enrolled</div>
</Status>
<Status status={STATUS_STATUS.WARNING}>
  <div className="zap-caption-medium">OS update pending</div>
</Status>
<Status status={STATUS_STATUS.NODATA}>
  <div className="zap-caption-medium">Agent unreachable</div>
</Status>
`}
      >
        <DemoRow>
          <DemoItem label="ENABLED">
            <Status status={STATUS_STATUS.ENABLED}>
              <Label>MDM enrolled</Label>
            </Status>
          </DemoItem>
          <DemoItem label="DISABLED">
            <Status status={STATUS_STATUS.DISABLED}>
              <Label>Deactivated</Label>
            </Status>
          </DemoItem>
          <DemoItem label="INFO (default)">
            <Status status={STATUS_STATUS.INFO}>
              <Label>Provisioning</Label>
            </Status>
          </DemoItem>
          <DemoItem label="WARNING">
            <Status status={STATUS_STATUS.WARNING}>
              <Label>OS update pending</Label>
            </Status>
          </DemoItem>
          <DemoItem label="NODATA">
            <Status status={STATUS_STATUS.NODATA}>
              <Label>Agent unreachable</Label>
            </Status>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Icon statuses"
        description="DONE and CANCEL render a tick or cross icon instead of a dot."
        code={`
<Status status={STATUS_STATUS.DONE}>
  <div className="zap-caption-medium">Onboarding complete</div>
</Status>
<Status status={STATUS_STATUS.CANCEL}>
  <div className="zap-caption-medium">Order cancelled</div>
</Status>
`}
      >
        <DemoRow>
          <DemoItem label="DONE">
            <Status status={STATUS_STATUS.DONE}>
              <Label>Onboarding complete</Label>
            </Status>
          </DemoItem>
          <DemoItem label="CANCEL">
            <Status status={STATUS_STATUS.CANCEL}>
              <Label>Order cancelled</Label>
            </Status>
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
