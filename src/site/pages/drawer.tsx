import * as React from 'react'
import {Button, BUTTON_VARIANT, Drawer} from '../../components'
import type {FooterButtons} from '../../components/modal/ModalFooter'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow} from '../showcase/DemoRow'

type DrawerSize = 'sm' | 'md' | 'lg'
type DrawerPosition = 'left' | 'right'
type DrawerConfig = {size: DrawerSize; position: DrawerPosition}

const basicCode = `
import {Drawer, BUTTON_VARIANT, useDisclosure} from '@hybr1d-tech/charizard'
import type {FooterButtons} from '@hybr1d-tech/charizard/components/modal/ModalFooter'

const {isOpen, onOpen, onClose} = useDisclosure()

const buttons: FooterButtons = [
  {variant: BUTTON_VARIANT.SECONDARY, btnText: 'Cancel', onClick: onClose},
  {variant: BUTTON_VARIANT.PRIMARY, btnText: 'Save', onClick: onClose},
]

<Drawer
  isOpen={isOpen}
  onClose={onClose}
  title="Device details"
  subTitle="MacBook Pro 14-inch"
  size="md"
  buttons={buttons}
>
  Drawer content goes here.
</Drawer>
`

export default function DrawerPage() {
  const [config, setConfig] = React.useState<DrawerConfig | null>(null)
  const onClose = () => setConfig(null)

  const buttons: FooterButtons = [
    {variant: BUTTON_VARIANT.SECONDARY, btnText: 'Cancel', onClick: onClose},
    {variant: BUTTON_VARIANT.PRIMARY, btnText: 'Save', onClick: onClose},
  ]

  return (
    <div>
      <h1>Drawer</h1>
      <p>
        Slide-in side panel with header, footer buttons, five sizes and left/right positioning.
      </p>

      <DemoSection
        title="Basic drawer"
        description="Controlled with isOpen/onClose; title and subTitle render the default header and buttons render the footer."
        code={basicCode}
      >
        <DemoRow>
          <Button onClick={() => setConfig({size: 'md', position: 'right'})}>Open drawer</Button>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="size accepts 'sm', 'md' (default), 'lg', 'xlg' or 'xxlg'."
      >
        <DemoRow>
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            onClick={() => setConfig({size: 'sm', position: 'right'})}
          >
            Small
          </Button>
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            onClick={() => setConfig({size: 'md', position: 'right'})}
          >
            Medium
          </Button>
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            onClick={() => setConfig({size: 'lg', position: 'right'})}
          >
            Large
          </Button>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Position"
        description="drawerPosition slides the panel in from the left or the right (default)."
      >
        <DemoRow>
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            onClick={() => setConfig({size: 'md', position: 'left'})}
          >
            Open from left
          </Button>
        </DemoRow>
      </DemoSection>

      <Drawer
        isOpen={!!config}
        onClose={onClose}
        title="Device details"
        subTitle="MacBook Pro 14-inch"
        size={config?.size ?? 'md'}
        drawerPosition={config?.position ?? 'right'}
        buttons={buttons}
      >
        <p>
          Drawer content scrolls independently between the header and the pinned footer. Click the
          backdrop, the close icon or a footer button to dismiss it.
        </p>
      </Drawer>
    </div>
  )
}
