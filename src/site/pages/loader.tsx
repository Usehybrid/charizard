import {Loader, LOADER_VARIANT} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'

const variantsCode = `
import {Loader, LOADER_VARIANT} from '@hybr1d-tech/charizard'

<Loader variant={LOADER_VARIANT.RING} />
<Loader variant={LOADER_VARIANT.DUAL_RING} />
<Loader variant={LOADER_VARIANT.ELLIPSES} />
<Loader variant={LOADER_VARIANT.GRID} />
<Loader variant={LOADER_VARIANT.HOURGLASS} />
<Loader variant={LOADER_VARIANT.RIPPLE} />
<Loader variant={LOADER_VARIANT.ROLLER} />
<Loader variant={LOADER_VARIANT.SPINNER} />
`

const SPINNERS: Array<{variant: LOADER_VARIANT; label: string}> = [
  {variant: LOADER_VARIANT.RING, label: 'Ring'},
  {variant: LOADER_VARIANT.DUAL_RING, label: 'Dual ring'},
  {variant: LOADER_VARIANT.ELLIPSES, label: 'Ellipses'},
  {variant: LOADER_VARIANT.GRID, label: 'Grid'},
  {variant: LOADER_VARIANT.HOURGLASS, label: 'Hourglass'},
  {variant: LOADER_VARIANT.RIPPLE, label: 'Ripple'},
  {variant: LOADER_VARIANT.ROLLER, label: 'Roller'},
  {variant: LOADER_VARIANT.SPINNER, label: 'Spinner'},
]

export default function LoaderPage() {
  return (
    <div>
      <h1>Loader</h1>
      <p>Loading spinners in eight animation styles, selected with the variant prop.</p>

      <DemoSection
        title="Spinner variants"
        description="All LOADER_VARIANT values: ring (default), dual ring, ellipses, grid, hourglass, ripple, roller and spinner."
        code={variantsCode}
      >
        <DemoRow>
          {SPINNERS.map(({variant, label}) => (
            <DemoItem key={label} label={label}>
              <Loader variant={variant} />
            </DemoItem>
          ))}
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Custom size"
        description="The ring variant accepts a size (px); container and border scale proportionally."
      >
        <DemoRow>
          <DemoItem label="size={16}">
            <Loader variant={LOADER_VARIANT.RING} size={16} />
          </DemoItem>
          <DemoItem label="size={29} (default)">
            <Loader variant={LOADER_VARIANT.RING} />
          </DemoItem>
          <DemoItem label="size={48}">
            <Loader variant={LOADER_VARIANT.RING} size={48} />
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
