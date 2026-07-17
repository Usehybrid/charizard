import * as React from 'react'
import {
  Alert,
  ALERT_ACTION_TYPES,
  ALERT_TYPES,
  Button,
  BUTTON_VARIANT,
} from '../../components'
import {DemoSection} from '../showcase/DemoSection'

const typesCode = `
import {Alert, ALERT_TYPES} from '@hybr1d-tech/charizard'

<Alert
  alertType={ALERT_TYPES.DEFAULT}
  header={<div>Alert header</div>}
  body={<p>Supporting detail for the alert goes here.</p>}
/>
`

const showMoreCode = `
import {Alert, ALERT_TYPES, ALERT_ACTION_TYPES} from '@hybr1d-tech/charizard'

const [showMore, setShowMore] = React.useState(false)

<Alert
  alertType={ALERT_TYPES.WARNING}
  actionType={ALERT_ACTION_TYPES.SHOW_MORE}
  header={<div>Some devices are missing warranty info</div>}
  body={<p>Expanded details are revealed by the chevron.</p>}
  showMore={showMore}
  setShowMore={setShowMore}
/>
`

const ALERT_TYPE_LIST: Array<{type: ALERT_TYPES; label: string}> = [
  {type: ALERT_TYPES.DEFAULT, label: 'Default'},
  {type: ALERT_TYPES.NEUTRAL, label: 'Neutral'},
  {type: ALERT_TYPES.POSITIVE, label: 'Positive'},
  {type: ALERT_TYPES.WARNING, label: 'Warning'},
  {type: ALERT_TYPES.NEGATIVE, label: 'Negative'},
  {type: ALERT_TYPES.HIGHLIGHT, label: 'Highlight'},
]

export default function AlertPage() {
  const [hide, setHide] = React.useState(false)
  const [showMore, setShowMore] = React.useState(false)

  return (
    <div>
      <h1>Alert</h1>
      <p>
        Inline alert banner with six intents plus optional close and show-more actions.
      </p>

      <DemoSection
        title="Alert types"
        description="alertType picks the intent: default, neutral, positive, warning, negative or highlight."
        code={typesCode}
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 12, width: '100%'}}>
          {ALERT_TYPE_LIST.map(({type, label}) => (
            <Alert
              key={label}
              alertType={type}
              header={<div>{label} alert header</div>}
              body={<p>Supporting detail for the {label.toLowerCase()} alert goes here.</p>}
            />
          ))}
        </div>
      </DemoSection>

      <DemoSection
        title="Dismissible"
        description="actionType={ALERT_ACTION_TYPES.CLOSE} shows a close icon that hides the alert via the hide/setHide pair."
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 12, width: '100%'}}>
          <Alert
            alertType={ALERT_TYPES.POSITIVE}
            actionType={ALERT_ACTION_TYPES.CLOSE}
            header={<div>Inventory synced successfully</div>}
            body={<p>All 42 devices were reconciled with the latest MDM snapshot.</p>}
            hide={hide}
            setHide={setHide}
          />
          {hide && (
            <div>
              <Button variant={BUTTON_VARIANT.SECONDARY} onClick={() => setHide(false)}>
                Restore alert
              </Button>
            </div>
          )}
        </div>
      </DemoSection>

      <DemoSection
        title="Expandable (show more)"
        description="actionType={ALERT_ACTION_TYPES.SHOW_MORE} collapses the body behind a chevron controlled by showMore/setShowMore."
        code={showMoreCode}
      >
        <div style={{width: '100%'}}>
          <Alert
            alertType={ALERT_TYPES.WARNING}
            actionType={ALERT_ACTION_TYPES.SHOW_MORE}
            header={<div>Some devices are missing warranty info</div>}
            body={
              <p>
                7 MacBooks imported from the last bulk upload have no warranty expiry date. Add the
                dates manually or re-run the import with the warranty column filled in.
              </p>
            }
            showMore={showMore}
            setShowMore={setShowMore}
          />
        </div>
      </DemoSection>
    </div>
  )
}
