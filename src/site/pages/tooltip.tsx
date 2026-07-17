import {Tooltip} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'

const basicCode = `
import {Tooltip} from '@hybr1d-tech/charizard'

<Tooltip placement="top">
  <Tooltip.Trigger>Hover me</Tooltip.Trigger>
  <Tooltip.Content>Helpful tooltip text</Tooltip.Content>
</Tooltip>
`

export default function TooltipPage() {
  return (
    <div>
      <h1>Tooltip</h1>
      <p>
        Zag.js-powered hover tooltip composed from Tooltip.Trigger and Tooltip.Content, with
        placement, delay and background options.
      </p>

      <DemoSection
        title="Basic tooltip"
        description="Tooltip clones the tooltip API into its Trigger and Content children."
        code={basicCode}
      >
        <DemoRow>
          <Tooltip placement="top">
            <Tooltip.Trigger>Hover me</Tooltip.Trigger>
            <Tooltip.Content>Helpful tooltip text</Tooltip.Content>
          </Tooltip>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Placements"
        description="placement accepts any @zag-js/popper placement (default 'top')."
      >
        <DemoRow>
          <DemoItem label="top">
            <Tooltip placement="top">
              <Tooltip.Trigger>Top</Tooltip.Trigger>
              <Tooltip.Content>Placed on top</Tooltip.Content>
            </Tooltip>
          </DemoItem>
          <DemoItem label="bottom">
            <Tooltip placement="bottom">
              <Tooltip.Trigger>Bottom</Tooltip.Trigger>
              <Tooltip.Content>Placed at the bottom</Tooltip.Content>
            </Tooltip>
          </DemoItem>
          <DemoItem label="left">
            <Tooltip placement="left">
              <Tooltip.Trigger>Left</Tooltip.Trigger>
              <Tooltip.Content>Placed to the left</Tooltip.Content>
            </Tooltip>
          </DemoItem>
          <DemoItem label="right">
            <Tooltip placement="right">
              <Tooltip.Trigger>Right</Tooltip.Trigger>
              <Tooltip.Content>Placed to the right</Tooltip.Content>
            </Tooltip>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Backgrounds & delays"
        description="Content bg accepts 'black' (default), 'gray' or a custom color; openDelay/closeDelay are in milliseconds."
      >
        <DemoRow>
          <DemoItem label="bg='gray'">
            <Tooltip placement="top">
              <Tooltip.Trigger>Gray</Tooltip.Trigger>
              <Tooltip.Content bg="gray">Gray background</Tooltip.Content>
            </Tooltip>
          </DemoItem>
          <DemoItem label="custom bg">
            <Tooltip placement="top">
              <Tooltip.Trigger>Custom</Tooltip.Trigger>
              <Tooltip.Content bg="#254dda" containerStyles={{color: 'white'}}>
                Brand blue background
              </Tooltip.Content>
            </Tooltip>
          </DemoItem>
          <DemoItem label="openDelay={400}">
            <Tooltip placement="top" openDelay={400} closeDelay={100}>
              <Tooltip.Trigger>Delayed</Tooltip.Trigger>
              <Tooltip.Content>Opens after 400ms</Tooltip.Content>
            </Tooltip>
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
