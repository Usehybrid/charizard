import {BUTTON_TYPE, BUTTON_VARIANT, SVG, useDisclosure} from '../components'
import {ModalV2} from '../components/modal-v2/ModalV2'
import {DialogFooterButtons} from '../types/common'
import icon from '../components/assets/calender.svg'

export function ModalDemo() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const buttons: DialogFooterButtons = [
    {
      variant: BUTTON_VARIANT.SECONDARY,
      btnText: 'Cancel',
      onClick: onClose,
    },
    {
      variant: BUTTON_VARIANT.PRIMARY,
      btnText: `Confirm`,
      onClick: onClose,
      icon: <SVG path={icon} customSvgStyles={{width: '20px', height: '20px'}} />,
      type: BUTTON_TYPE.ICON_LEFT,
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
