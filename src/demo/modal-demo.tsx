import {BUTTON_V2_VARIANT} from '../components'
import {ModalV2} from '../components/modal-v2/ModalV2'
import {useDisclosure} from '../utils/hooks/use-disclosure'

export function ModalDemo() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const buttons = [
    {
      variant: BUTTON_V2_VARIANT.SECONDARY,
      btnText: 'Cancel',
      onClick: onClose,
    },
    {
      variant: BUTTON_V2_VARIANT.PRIMARY,
      btnText: `Confirm`,
      onClick: onClose,
    },
  ]

  return (
    <ModalV2
      title="Title here"
      trigger={<button onClick={onOpen}>Open modal</button>}
      footerButtons={buttons}
      isOpen={isOpen}
    >
      test content
    </ModalV2>
  )
}
