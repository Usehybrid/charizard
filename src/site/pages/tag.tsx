import {Tag, STATUS_MAP} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'
import infoIcon from '../../components/assets/info-circle.svg'
import checkIcon from '../../components/assets/check.svg'

export default function TagPage() {
  return (
    <div>
      <h1>Tag</h1>
      <p>Colored label chip for assignment and lifecycle states, with optional leading icon.</p>

      <DemoSection
        title="Statuses"
        description="text sets the label and status (STATUS_MAP) picks the colorway."
        code={`
import {Tag, STATUS_MAP} from '@hybr1d-tech/charizard'

<Tag status={STATUS_MAP.SUCCESS} text="Assigned" />
<Tag status={STATUS_MAP.WARNING} text="Unassigned" />
<Tag status={STATUS_MAP.INFO} text="In-transition" />
<Tag status={STATUS_MAP.ERROR} text="Under maintenance" />
<Tag status={STATUS_MAP.DEFAULT} text="Archived" />
`}
      >
        <DemoRow>
          <DemoItem label="SUCCESS">
            <Tag status={STATUS_MAP.SUCCESS} text="Assigned" />
          </DemoItem>
          <DemoItem label="WARNING">
            <Tag status={STATUS_MAP.WARNING} text="Unassigned" />
          </DemoItem>
          <DemoItem label="INFO">
            <Tag status={STATUS_MAP.INFO} text="In-transition" />
          </DemoItem>
          <DemoItem label="ERROR">
            <Tag status={STATUS_MAP.ERROR} text="Under maintenance" />
          </DemoItem>
          <DemoItem label="DEFAULT">
            <Tag status={STATUS_MAP.DEFAULT} text="Archived" />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="With icon and custom styles"
        description="icon takes an SVG path rendered tinted to the status color; customStyles merges into the container style."
        code={`
import checkIcon from './assets/check.svg'

<Tag status={STATUS_MAP.SUCCESS} text="MDM enrolled" icon={checkIcon} />
<Tag status={STATUS_MAP.INFO} text="Awaiting handover" icon={infoIcon} />
<Tag status={STATUS_MAP.DEFAULT} text="Spare pool" customStyles={{borderRadius: 16}} />
`}
      >
        <DemoRow>
          <DemoItem label="icon">
            <Tag status={STATUS_MAP.SUCCESS} text="MDM enrolled" icon={checkIcon} />
          </DemoItem>
          <DemoItem label="icon">
            <Tag status={STATUS_MAP.INFO} text="Awaiting handover" icon={infoIcon} />
          </DemoItem>
          <DemoItem label="customStyles">
            <Tag status={STATUS_MAP.DEFAULT} text="Spare pool" customStyles={{borderRadius: 16}} />
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
