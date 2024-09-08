import * as React from 'react'
import styles from './styles.module.css'
import {CheckboxV2} from '../../components'

export function CheckboxDemo() {
  const [checked, setChecked] = React.useState(false)
  console.log(setChecked)
  const [indeterminate, setIndeterminate] = React.useState(false)
  const [hoverChecked, setHoverChecked] = React.useState(false)

  return (
    <div className={styles.demoContainer}>
      <h2>CheckboxV2 Demo</h2>
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
          <CheckboxV2 label="Hover" checked={hoverChecked} onChange={setHoverChecked} />
        </div>

        <div className={styles.checkboxItem}>
          <CheckboxV2 label="Disabled" checked={checked} disabled={true} onChange={() => {}} />
        </div>
      </div>
    </div>
  )
}
