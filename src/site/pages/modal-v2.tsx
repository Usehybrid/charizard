import {
  Button,
  BUTTON_VARIANT,
  ModalV2,
  useDisclosure,
  type DialogFooterButtons,
} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow} from '../showcase/DemoRow'

const basicCode = `
import {ModalV2, Button, BUTTON_VARIANT, useDisclosure, type DialogFooterButtons} from '@hybr1d-tech/charizard'

const {isOpen, onOpen, onClose} = useDisclosure()

const buttons: DialogFooterButtons = [
  {variant: BUTTON_VARIANT.SECONDARY, btnText: 'Cancel', onClick: onClose},
  {variant: BUTTON_VARIANT.PRIMARY, btnText: 'Confirm', onClick: onClose},
]

<Button onClick={onOpen}>Open ModalV2</Button>
<ModalV2
  title="Order laptop"
  subTitle="MacBook Pro 14-inch, M4 Pro"
  isOpen={isOpen}
  onClose={onClose}
  footerButtons={buttons}
>
  Modal body content goes here.
</ModalV2>
`

function footerFor(onClose: () => void): DialogFooterButtons {
  return [
    {variant: BUTTON_VARIANT.SECONDARY, btnText: 'Cancel', onClick: onClose},
    {variant: BUTTON_VARIANT.PRIMARY, btnText: 'Confirm', onClick: onClose},
  ]
}

export default function ModalV2Page() {
  const basic = useDisclosure()
  const backdrop = useDisclosure()
  const headerless = useDisclosure()

  return (
    <div>
      <h1>ModalV2</h1>
      <p>
        Zag.js-powered dialog with a title/subtitle header, scrollable content area and
        footer-button API — the preferred modal generation.
      </p>

      <DemoSection
        title="Basic modal"
        description="Controlled with useDisclosure; footerButtons renders library Buttons and the header shows title, subtitle and a close icon."
        code={basicCode}
      >
        <DemoRow>
          <Button onClick={basic.onOpen}>Open ModalV2</Button>
        </DemoRow>
        <ModalV2
          title="Order laptop"
          subTitle="MacBook Pro 14-inch, M4 Pro"
          isOpen={basic.isOpen}
          onClose={basic.onClose}
          footerButtons={footerFor(basic.onClose)}
        >
          <p style={{padding: '12px 0'}}>
            Confirm the order details before sending the request to procurement. Pressing Escape,
            clicking outside or using any footer button closes the dialog.
          </p>
        </ModalV2>
      </DemoSection>

      <DemoSection
        title="Backdrop"
        description="showBackdrop renders a dimmed layer behind the dialog."
      >
        <DemoRow>
          <Button variant={BUTTON_VARIANT.SECONDARY} onClick={backdrop.onOpen}>
            Open with backdrop
          </Button>
        </DemoRow>
        <ModalV2
          title="With backdrop"
          isOpen={backdrop.isOpen}
          onClose={backdrop.onClose}
          showBackdrop
          footerButtons={footerFor(backdrop.onClose)}
        >
          <p style={{padding: '12px 0'}}>The page behind this dialog is dimmed.</p>
        </ModalV2>
      </DemoSection>

      <DemoSection
        title="Hidden header"
        description="hideHeader removes the title row but keeps the floating close button."
      >
        <DemoRow>
          <Button variant={BUTTON_VARIANT.SECONDARY} onClick={headerless.onOpen}>
            Open without header
          </Button>
        </DemoRow>
        <ModalV2
          title="Hidden header"
          isOpen={headerless.isOpen}
          onClose={headerless.onClose}
          hideHeader
          footerButtons={footerFor(headerless.onClose)}
        >
          <p style={{padding: '12px 0'}}>
            Only the content and footer are visible; the title is still required for accessibility.
          </p>
        </ModalV2>
      </DemoSection>
    </div>
  )
}
