import {ButtonVariant} from '../button'
import {Modal} from './Modal'
import {ModalBody} from './ModalBody'
import {ModalContent} from './ModalContent'
import {FooterButtons, ModalFooter} from './ModalFooter'
import {ModalHeader} from './ModalHeader'
import {ModalOverlay} from './ModalOverlay'

export default function Example({isOpen, onClose}: any) {
  const buttons: FooterButtons = [
    {variant: ButtonVariant.SECONDARY, onClick: () => console.log('cancel'), btnText: 'Cancel'},
    {variant: ButtonVariant.PRIMARY, onClick: () => console.log('save'), btnText: 'Save'},
  ]
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Header</ModalHeader>
        <ModalBody>Body</ModalBody>
        <ModalFooter buttons={buttons} />
      </ModalContent>
    </Modal>
  )
}
