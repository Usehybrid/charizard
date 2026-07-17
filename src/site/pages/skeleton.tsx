import {Skeleton} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'

const textCode = `
import {Skeleton} from '@hybr1d-tech/charizard'

// Skeleton renders an animated span; give it dimensions via style or className.
<Skeleton style={{display: 'block', width: 320, height: 14}} />
<Skeleton style={{display: 'block', width: 280, height: 14}} />
<Skeleton style={{display: 'block', width: 180, height: 14}} />
`

export default function SkeletonPage() {
  return (
    <div>
      <h1>Skeleton</h1>
      <p>
        Animated loading placeholder; size and shape it with regular style or className props.
      </p>

      <DemoSection
        title="Text placeholder"
        description="Stack a few bars of decreasing width to stand in for a paragraph."
        code={textCode}
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 10, width: '100%'}}>
          <Skeleton style={{display: 'block', width: 320, height: 14}} />
          <Skeleton style={{display: 'block', width: 280, height: 14}} />
          <Skeleton style={{display: 'block', width: 180, height: 14}} />
        </div>
      </DemoSection>

      <DemoSection
        title="Shapes"
        description="Border-radius overrides turn the same component into avatars, thumbnails or buttons."
      >
        <DemoRow>
          <DemoItem label="avatar">
            <Skeleton style={{display: 'block', width: 48, height: 48, borderRadius: '50%'}} />
          </DemoItem>
          <DemoItem label="thumbnail">
            <Skeleton style={{display: 'block', width: 96, height: 64}} />
          </DemoItem>
          <DemoItem label="button">
            <Skeleton style={{display: 'block', width: 120, height: 36, borderRadius: 8}} />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Composite card"
        description="Combine shapes to sketch a whole record while it loads."
      >
        <div style={{display: 'flex', gap: 16, alignItems: 'center', width: '100%'}}>
          <Skeleton style={{display: 'block', width: 56, height: 56, borderRadius: '50%', flexShrink: 0}} />
          <div style={{display: 'flex', flexDirection: 'column', gap: 8, flex: 1, maxWidth: 360}}>
            <Skeleton style={{display: 'block', width: '60%', height: 16}} />
            <Skeleton style={{display: 'block', width: '90%', height: 12}} />
            <Skeleton style={{display: 'block', width: '40%', height: 12}} />
          </div>
        </div>
      </DemoSection>
    </div>
  )
}
