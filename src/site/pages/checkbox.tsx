import * as React from 'react'
import {Checkbox, CheckboxV2} from '../../components'
import styles from './checkbox.module.css'
import {DemoSection} from '../showcase/DemoSection'
import {DemoItem, DemoRow} from '../showcase/DemoRow'

export default function CheckboxPage() {
  const [indeterminate, setIndeterminate] = React.useState(false)
  const [hoverChecked, setHoverChecked] = React.useState(false)
  const [legacyChecked, setLegacyChecked] = React.useState(false)

  return (
    <div>
      <h1>Checkbox</h1>
      <p>Checkbox with label, indeterminate and disabled states, in the preferred V2 and legacy generations.</p>

      <DemoSection
        title="CheckboxV2 states"
        description="The preferred generation. Controlled via checked/onChange, with indeterminate and disabled support."
        code={`import {CheckboxV2} from '@hybr1d-tech/charizard'

const [checked, setChecked] = React.useState(false)

<CheckboxV2 label="Unchecked" checked={false} onChange={() => {}} />
<CheckboxV2 label="Checked" checked={true} onChange={() => {}} />
<CheckboxV2 label="Indeterminate" checked={checked} indeterminate onChange={setChecked} />
<CheckboxV2 label="Interactive" checked={checked} onChange={setChecked} />
<CheckboxV2 label="Disabled" checked={false} disabled onChange={() => {}} />`}
      >
        <div className={styles.checkboxGroup}>
          <div className={styles.checkboxItem}>
            <CheckboxV2 label="Unchecked" checked={false} onChange={() => {}} />
          </div>
          <div className={styles.checkboxItem}>
            <CheckboxV2 label="Checked" checked={true} onChange={() => {}} />
          </div>
          <div className={styles.checkboxItem}>
            <CheckboxV2
              label="Indeterminate"
              checked={indeterminate}
              indeterminate={true}
              onChange={setIndeterminate}
            />
          </div>
          <div className={styles.checkboxItem}>
            <CheckboxV2 label="Interactive" checked={hoverChecked} onChange={setHoverChecked} />
          </div>
          <div className={styles.checkboxItem}>
            <CheckboxV2 label="Disabled" checked={false} disabled={true} onChange={() => {}} />
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="Checkbox (legacy)"
        description="The first-generation checkbox. Requires id and name, takes its label as children, and reports the native change event."
        code={`import {Checkbox} from '@hybr1d-tech/charizard'

const [checked, setChecked] = React.useState(false)

<Checkbox
  id="terms"
  name="terms"
  checked={checked}
  onChange={e => setChecked(e.target.checked)}
>
  Accept terms
</Checkbox>`}
      >
        <DemoRow>
          <DemoItem label="interactive">
            <Checkbox
              id="legacy-interactive"
              name="legacy-interactive"
              checked={legacyChecked}
              onChange={e => setLegacyChecked(e.target.checked)}
            >
              Accept terms
            </Checkbox>
          </DemoItem>
          <DemoItem label="indeterminate">
            <Checkbox id="legacy-indeterminate" name="legacy-indeterminate" indeterminate onChange={() => {}}>
              Some selected
            </Checkbox>
          </DemoItem>
          <DemoItem label="checked + disabled">
            <Checkbox id="legacy-disabled" name="legacy-disabled" checked disabled onChange={() => {}}>
              hello
            </Checkbox>
          </DemoItem>
        </DemoRow>
        <DemoRow label="With error">
          <Checkbox id="legacy-error" name="legacy-error" errorMsg="You must accept the terms" onChange={() => {}}>
            Accept terms
          </Checkbox>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
