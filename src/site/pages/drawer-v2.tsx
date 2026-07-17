import * as React from 'react'
import {Button, BUTTON_VARIANT, DrawerV2, type DialogFooterButtons} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow} from '../showcase/DemoRow'

type DrawerSize = 'sm' | 'md' | 'lg'
type DrawerPosition = 'left' | 'right'
type DrawerConfig = {size: DrawerSize; position: DrawerPosition}

const basicCode = `
import {DrawerV2, BUTTON_VARIANT, useDisclosure, type DialogFooterButtons} from '@hybr1d-tech/charizard'

const {isOpen, onOpen, onClose} = useDisclosure()

const buttons: DialogFooterButtons = [
  {variant: BUTTON_VARIANT.SECONDARY, btnText: 'Cancel', onClick: onClose},
  {variant: BUTTON_VARIANT.PRIMARY, btnText: 'Save', onClick: onClose},
]

<DrawerV2
  isOpen={isOpen}
  onClose={onClose}
  title="Edit workflow"
  subTitle="Onboarding — new joiner"
  size="md"
  buttons={buttons}
>
  Drawer content goes here.
</DrawerV2>
`

export default function DrawerV2Page() {
  const [config, setConfig] = React.useState<DrawerConfig | null>(null)
  const onClose = () => setConfig(null)

  const buttons: DialogFooterButtons = [
    {variant: BUTTON_VARIANT.SECONDARY, btnText: 'Cancel', onClick: onClose},
    {variant: BUTTON_VARIANT.PRIMARY, btnText: 'Save', onClick: onClose},
  ]

  return (
    <div>
      <h1>DrawerV2</h1>
      <p>
        Portalled slide-in panel that locks body scroll while open — the preferred drawer
        generation.
      </p>

      <DemoSection
        title="Basic drawer"
        description="Controlled with isOpen/onClose; footer buttons use the DialogFooterButtons shape shared with ModalV2."
        code={basicCode}
      >
        <DemoRow>
          <Button onClick={() => setConfig({size: 'md', position: 'right'})}>Open DrawerV2</Button>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Sizes & position"
        description="size accepts 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg'; drawerPosition slides from the left or right."
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
            onClick={() => setConfig({size: 'lg', position: 'right'})}
          >
            Large
          </Button>
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            onClick={() => setConfig({size: 'md', position: 'left'})}
          >
            Open from left
          </Button>
        </DemoRow>
      </DemoSection>

      <DrawerV2
        isOpen={!!config}
        onClose={onClose}
        title="Edit workflow"
        subTitle="Onboarding — new joiner"
        size={config?.size ?? 'md'}
        drawerPosition={config?.position ?? 'right'}
        buttons={buttons}
      >
        <p>
          DrawerV2 renders in a portal and locks the body scroll while open. Click the backdrop,
          the close icon or a footer button to dismiss it.
        </p>
      </DrawerV2>
    </div>
  )
}
