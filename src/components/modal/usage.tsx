import {Modal} from './Modal'
import {ModalBody} from './ModalBody'
import {ModalContent} from './ModalContent'
import {ModalFooter} from './ModalFooter'
import {ModalHeader} from './ModalHeader'
import {ModalOverlay} from './ModalOverlay'

export default function Example({isOpen, onClose}: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Header</ModalHeader>
        <ModalBody>Body</ModalBody>
        <ModalFooter onSave={() => {}} />
      </ModalContent>
    </Modal>
  )
}
