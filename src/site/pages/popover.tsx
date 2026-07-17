import {
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'

const clickCode = `
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverCloseButton,
} from '@hybr1d-tech/charizard'

<Popover placement="bottom">
  <PopoverTrigger openOnHover={false}>Click me</PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>Popover title</PopoverTitle>
    <PopoverDescription>Anchored content with an arrow.</PopoverDescription>
    <PopoverCloseButton>Close</PopoverCloseButton>
  </PopoverContent>
</Popover>
`

export default function PopoverPage() {
  return (
    <div>
      <h1>Popover</h1>
      <p>
        Zag.js-powered anchored popover composed from a trigger, content, title, description and
        close button.
      </p>

      <DemoSection
        title="Click to open"
        description="openOnHover={false} makes the trigger click-only; the close button and outside interaction dismiss it."
        code={clickCode}
      >
        <DemoRow>
          <Popover placement="bottom">
            <PopoverTrigger openOnHover={false}>Click me</PopoverTrigger>
            <PopoverContent>
              <PopoverTitle>Popover title</PopoverTitle>
              <PopoverDescription>Anchored content with an arrow.</PopoverDescription>
              <PopoverCloseButton styles={{textDecoration: 'underline'}}>Close</PopoverCloseButton>
            </PopoverContent>
          </Popover>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Open on hover"
        description="By default the trigger opens the popover on mouse enter and closes it on leave."
      >
        <DemoRow>
          <Popover placement="top">
            <PopoverTrigger>Hover me</PopoverTrigger>
            <PopoverContent>
              <PopoverDescription>Shown while the trigger is hovered.</PopoverDescription>
            </PopoverContent>
          </Popover>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Placement & background"
        description="placement accepts any @zag-js/popper placement; bg switches between 'black' (default), 'gray' or any custom color."
      >
        <DemoRow>
          <DemoItem label="placement='right'">
            <Popover placement="right">
              <PopoverTrigger openOnHover={false}>Right</PopoverTrigger>
              <PopoverContent>
                <PopoverDescription>Opens to the right.</PopoverDescription>
              </PopoverContent>
            </Popover>
          </DemoItem>
          <DemoItem label="bg='gray'">
            <Popover placement="bottom">
              <PopoverTrigger openOnHover={false}>Gray</PopoverTrigger>
              <PopoverContent bg="gray">
                <PopoverDescription>Gray background.</PopoverDescription>
              </PopoverContent>
            </Popover>
          </DemoItem>
          <DemoItem label="custom bg">
            <Popover placement="bottom">
              <PopoverTrigger openOnHover={false}>Custom</PopoverTrigger>
              <PopoverContent bg="#254dda">
                <PopoverDescription styles={{color: 'white'}}>
                  Any CSS color works.
                </PopoverDescription>
              </PopoverContent>
            </Popover>
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
