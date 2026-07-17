import {SVG} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'
import searchIcon from '../../components/assets/search.svg'
import plusIcon from '../../components/assets/plus.svg'
import deleteIcon from '../../components/assets/delete-bin.svg'
import infoIcon from '../../components/assets/info-circle.svg'
import historyIcon from '../../components/assets/history.svg'
import filterIcon from '../../components/assets/filter-lines.svg'
import checkIcon from '../../components/assets/check.svg'

export default function SvgPage() {
  return (
    <div>
      <h1>SVG</h1>
      <p>Inline SVG renderer (react-inlinesvg) used by every icon in the library.</p>

      <DemoSection
        title="Library icons"
        description="path takes the imported SVG asset URL and the markup is inlined into the DOM, so it can be styled with CSS."
        code={`
import {SVG} from '@hybr1d-tech/charizard'
import searchIcon from './assets/search.svg'

<SVG path={searchIcon} width={24} height={24} />
`}
      >
        <DemoRow>
          <DemoItem label="search">
            <SVG path={searchIcon} width={24} height={24} />
          </DemoItem>
          <DemoItem label="plus">
            <SVG path={plusIcon} width={24} height={24} />
          </DemoItem>
          <DemoItem label="delete-bin">
            <SVG path={deleteIcon} width={24} height={24} />
          </DemoItem>
          <DemoItem label="info-circle">
            <SVG path={infoIcon} width={24} height={24} />
          </DemoItem>
          <DemoItem label="history">
            <SVG path={historyIcon} width={24} height={24} />
          </DemoItem>
          <DemoItem label="filter-lines">
            <SVG path={filterIcon} width={24} height={24} />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Sizing, coloring and clicks"
        description="width / height size the svg element; customSvgStyles (e.g. fill) styles the inlined markup; handleClick attaches to the wrapping span."
        code={`
<SVG path={checkIcon} width={16} height={16} />
<SVG path={checkIcon} width={32} height={32} customSvgStyles={{fill: 'var(--status-success-s50)'}} />
<SVG path={plusIcon} width={24} height={24} handleClick={() => addRow()} />
`}
      >
        <DemoRow>
          <DemoItem label="16px">
            <SVG path={checkIcon} width={16} height={16} />
          </DemoItem>
          <DemoItem label="24px">
            <SVG path={checkIcon} width={24} height={24} />
          </DemoItem>
          <DemoItem label="32px, success fill">
            <SVG
              path={checkIcon}
              width={32}
              height={32}
              customSvgStyles={{fill: 'var(--status-success-s50)'}}
            />
          </DemoItem>
          <DemoItem label="32px, error fill">
            <SVG
              path={deleteIcon}
              width={32}
              height={32}
              customSvgStyles={{fill: 'var(--status-error-e50)'}}
            />
          </DemoItem>
          <DemoItem label="clickable">
            <SVG
              path={plusIcon}
              width={24}
              height={24}
              customSpanStyles={{cursor: 'pointer'}}
              handleClick={() => window.alert('Add device clicked')}
            />
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
