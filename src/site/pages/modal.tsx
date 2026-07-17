import * as React from 'react'
import {
  Button,
  BUTTON_VARIANT,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '../../components'
import type {FooterButtons} from '../../components/modal/ModalFooter'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow} from '../showcase/DemoRow'

type ModalSize = 'sm' | 'md' | 'fullScreen'

const compositionCode = `
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, BUTTON_VARIANT, useDisclosure} from '@hybr1d-tech/charizard'
import type {FooterButtons} from '@hybr1d-tech/charizard/components/modal/ModalFooter'

const {isOpen, onOpen, onClose} = useDisclosure()

const buttons: FooterButtons = [
  {variant: BUTTON_VARIANT.SECONDARY, btnText: 'Cancel', onClick: onClose},
  {variant: BUTTON_VARIANT.PRIMARY, btnText: 'Save', onClick: onClose},
]

{isOpen && (
  <Modal isOpen={isOpen} onClose={onClose} size="md">
    <ModalContent>
      <ModalHeader>Assign device</ModalHeader>
      <ModalBody>Pick a teammate to assign this MacBook Pro to.</ModalBody>
      <ModalFooter buttons={buttons} />
    </ModalContent>
  </Modal>
)}
`

export default function ModalPage() {
  const [size, setSize] = React.useState<ModalSize | null>(null)
  const onClose = () => setSize(null)

  const buttons: FooterButtons = [
    {variant: BUTTON_VARIANT.SECONDARY, btnText: 'Cancel', onClick: onClose},
    {variant: BUTTON_VARIANT.PRIMARY, btnText: 'Save', onClick: onClose},
  ]

  return (
    <div>
      <h1>Modal</h1>
      <p>
        Dialog modal composed from ModalContent, ModalHeader, ModalBody and ModalFooter, with sm,
        md and fullScreen sizes.
      </p>

      <DemoSection
        title="Composition"
        description="Modal clones the dialog API into its children, so header, body and footer wire themselves up automatically."
        code={compositionCode}
      >
        <DemoRow>
          <Button onClick={() => setSize('md')}>Open modal</Button>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="size accepts 'sm' (448px), 'md' (600px, default) or 'fullScreen'."
      >
        <DemoRow>
          <Button variant={BUTTON_VARIANT.SECONDARY} onClick={() => setSize('sm')}>
            Small
          </Button>
          <Button variant={BUTTON_VARIANT.SECONDARY} onClick={() => setSize('md')}>
            Medium
          </Button>
          <Button variant={BUTTON_VARIANT.SECONDARY} onClick={() => setSize('fullScreen')}>
            Full screen
          </Button>
        </DemoRow>
      </DemoSection>

      {size && (
        <Modal isOpen onClose={onClose} size={size}>
          <ModalContent>
            <ModalHeader>Assign device</ModalHeader>
            <ModalBody>
              <p style={{padding: '12px 0'}}>
                Pick a teammate to assign this MacBook Pro to. The footer buttons close the dialog
                through the injected zag.js API after their own onClick runs.
              </p>
            </ModalBody>
            <ModalFooter buttons={buttons} />
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}
