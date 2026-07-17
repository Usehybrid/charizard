import * as React from 'react'
import {Progress} from '../../components'
import {DemoSection} from '../showcase/DemoSection'

function StepBody({title, body}: {title: string; body: string}) {
  return (
    <div style={{padding: '16px 0'}}>
      <div className="zap-subcontent-semibold" style={{marginBottom: 4}}>
        {title}
      </div>
      <div className="zap-content-regular" style={{color: 'var(--text-secondary)'}}>
        {body}
      </div>
    </div>
  )
}

export default function ProgressPage() {
  const [outcome, setOutcome] = React.useState<string | null>(null)

  return (
    <div>
      <h1>Progress</h1>
      <p>Multi-step wizard with numbered steps, completion ticks and back / continue navigation.</p>

      <DemoSection
        title="Stepper wizard"
        description="Each step supplies a label, its body component and an isError flag that blocks Continue. Completed steps show a tick; clicking an earlier step navigates back."
        code={`
import {Progress} from '@hybr1d-tech/charizard'

<Progress
  steps={[
    {label: 'Select device', component: <SelectDevice />, isError: false},
    {label: 'Assign user', component: <AssignUser />, isError: false},
    {label: 'Review', component: <Review />, isError: false},
  ]}
  onCancelClick={() => console.log('cancelled')}
  onFinalStepClick={() => console.log('submitted')}
  lastStepFooterContinueBtnText="Create order"
/>
`}
      >
        <div style={{width: '100%'}}>
          <Progress
            steps={[
              {
                label: 'Select device',
                component: (
                  <StepBody
                    title={'MacBook Pro 14" M4 — 16 GB / 512 GB'}
                    body="Pick a model from the catalog or from available stock in the Singapore warehouse."
                  />
                ),
                isError: false,
              },
              {
                label: 'Assign user',
                component: (
                  <StepBody
                    title="Priya Nair — priya.nair@acme.io"
                    body="The device will be enrolled into MDM and shipped to the assignee's registered address."
                  />
                ),
                isError: false,
              },
              {
                label: 'Review',
                component: (
                  <StepBody
                    title="Ready to order"
                    body='1 × MacBook Pro 14" M4 for Priya Nair, delivery in 3-5 business days.'
                  />
                ),
                isError: false,
              },
            ]}
            onCancelClick={() => setOutcome('Wizard cancelled.')}
            onFinalStepClick={() => setOutcome('Order created.')}
            lastStepFooterContinueBtnText="Create order"
          />
          {outcome && (
            <div className="zap-caption-medium" style={{marginTop: 12}}>
              {outcome}
            </div>
          )}
        </div>
      </DemoSection>

      <DemoSection
        title="Header actions and skip"
        description="showHeaderBtns moves Cancel / Continue into the header (showFooter hides the footer). showSkipBtn with stepToShowSkipBtn offers an optional step."
      >
        <div style={{width: '100%'}}>
          <Progress
            steps={[
              {
                label: 'Company details',
                component: (
                  <StepBody
                    title="Acme Pte Ltd"
                    body="Confirm the legal entity and billing address for this workspace."
                  />
                ),
                isError: false,
              },
              {
                label: 'Invite admins',
                component: (
                  <StepBody
                    title="Optional step"
                    body="Invite additional IT admins now, or skip and do it later from settings."
                  />
                ),
                isError: false,
              },
              {
                label: 'Finish',
                component: (
                  <StepBody title="All set" body="Your workspace is configured and ready to use." />
                ),
                isError: false,
              },
            ]}
            onCancelClick={() => {}}
            onFinalStepClick={() => {}}
            lastStepFooterContinueBtnText="Finish"
            lastStepHeaderContinueBtnText="Finish setup"
            showHeaderBtns
            showFooter={false}
            showSkipBtn
            stepToShowSkipBtn={1}
            skipBtnText="Skip for now"
          />
        </div>
      </DemoSection>
    </div>
  )
}
