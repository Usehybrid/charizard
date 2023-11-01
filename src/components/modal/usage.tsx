import {BUTTON_VARIANT} from '../button'
import {Modal} from './Modal'
import {ModalBody} from './ModalBody'
import {ModalContent} from './ModalContent'
import {FooterButtons, ModalFooter} from './ModalFooter'
import {ModalHeader} from './ModalHeader'
import {ModalOverlay} from './ModalOverlay'

export default function Example({isOpen, onClose}: any) {
  const buttons: FooterButtons = [
    {variant: BUTTON_VARIANT.SECONDARY, onClick: () => console.log('cancel'), btnText: 'Cancel'},
    {variant: BUTTON_VARIANT.PRIMARY, onClick: () => console.log('save'), btnText: 'Save'},
  ]
  return (
    <Modal id="test id " isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Header</ModalHeader>
        <ModalBody>Body</ModalBody>
        <ModalFooter buttons={buttons} />
      </ModalContent>
    </Modal>
  )
}
