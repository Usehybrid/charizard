import {Button, BUTTON_VARIANT, TooltipV2} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'

const variantsCode = `
import {TooltipV2, Button} from '@hybr1d-tech/charizard'

<TooltipV2
  placement="top"
  variant="dark"
  trigger={<Button>Hover me</Button>}
  content="This is a tooltip"
/>
`

const VARIANTS = ['dark', 'light', 'success', 'warning', 'error', 'info'] as const

export default function TooltipV2Page() {
  return (
    <div>
      <h1>TooltipV2</h1>
      <p>
        react-tooltip-based tooltip with a simple trigger/content API, six visual variants and
        twelve placements — the preferred tooltip generation.
      </p>

      <DemoSection
        title="Variants"
        description="variant switches the tooltip color scheme: dark (default), light, success, warning, error or info."
        code={variantsCode}
      >
        <DemoRow>
          {VARIANTS.map(variant => (
            <DemoItem key={variant} label={variant}>
              <TooltipV2
                variant={variant}
                trigger={
                  <Button variant={BUTTON_VARIANT.SECONDARY}>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Button>
                }
                content={`A ${variant} tooltip`}
              />
            </DemoItem>
          ))}
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Placements"
        description="placement accepts top/right/bottom/left plus their -start and -end variations."
      >
        <DemoRow>
          <DemoItem label="top">
            <TooltipV2
              placement="top"
              trigger={<Button variant={BUTTON_VARIANT.TERTIARY}>Top</Button>}
              content="Placed on top"
            />
          </DemoItem>
          <DemoItem label="bottom-start">
            <TooltipV2
              placement="bottom-start"
              trigger={<Button variant={BUTTON_VARIANT.TERTIARY}>Bottom start</Button>}
              content="Aligned to the trigger start"
            />
          </DemoItem>
          <DemoItem label="right">
            <TooltipV2
              placement="right"
              trigger={<Button variant={BUTTON_VARIANT.TERTIARY}>Right</Button>}
              content="Placed to the right"
            />
          </DemoItem>
          <DemoItem label="left">
            <TooltipV2
              placement="left"
              trigger={<Button variant={BUTTON_VARIANT.TERTIARY}>Left</Button>}
              content="Placed to the left"
            />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Content truncation"
        description="String content longer than contentMaxLength is truncated with an ellipsis; pass null to disable the max width."
      >
        <DemoRow>
          <DemoItem label="contentMaxLength={40}">
            <TooltipV2
              contentMaxLength={40}
              trigger={<Button variant={BUTTON_VARIANT.SECONDARY}>Truncated</Button>}
              content="This is a very long tooltip message that will be cut off after forty characters."
            />
          </DemoItem>
          <DemoItem label="rich content">
            <TooltipV2
              trigger={<Button variant={BUTTON_VARIANT.SECONDARY}>Rich content</Button>}
              content={
                <span>
                  Tooltips can render <strong>React nodes</strong> too.
                </span>
              }
            />
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
