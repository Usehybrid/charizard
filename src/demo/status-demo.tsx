import {Status, STATUS_STATUS} from '../components'

export function StatusDemo() {
  return (
    <div style={{display: 'flex', gap: '24px'}}>
      <Status status={STATUS_STATUS.DISABLED}>
        <div className="zap-caption-medium" style={{color: 'var(--text-primary)'}}>
          Disabled
        </div>
      </Status>
      <Status status={STATUS_STATUS.ENABLED}>
        <div className="zap-caption-medium" style={{color: 'var(--text-primary)'}}>
          Enabled
        </div>
      </Status>
      <Status status={STATUS_STATUS.INFO}>
        <div className="zap-caption-medium" style={{color: 'var(--text-primary)'}}>
          Info
        </div>
      </Status>
      <Status status={STATUS_STATUS.WARNING}>
        <div className="zap-caption-medium" style={{color: 'var(--text-primary)'}}>
          Warning
        </div>
      </Status>
      <Status status={STATUS_STATUS.NODATA}>
        <div className="zap-caption-medium" style={{color: 'var(--text-primary)'}}>
          No Data
        </div>
      </Status>
    </div>
  )
}
