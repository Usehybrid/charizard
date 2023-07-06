import * as React from 'react'
import * as dialog from '@zag-js/dialog'
import {Portal, normalizeProps, useMachine} from '@zag-js/react'

interface ModalProps {
  /**
   * Modal is open or not
   */
  isOpen: boolean
  /**
   * Modal close handler
   */
  onClose: () => void
  /**
   * Modal content
   */
  children: React.ReactNode
  /**
   * size of modal
   */
  size?: 'sm' | 'md' // sm: 400px, md: 600px
}

export default function Modal({isOpen, onClose, children, size = 'md'}: ModalProps) {
  const [state, send] = useMachine(dialog.machine({id: React.useId(), open: isOpen, onClose}))
  const api = dialog.connect(state, send, normalizeProps)

  const clones = React.Children.toArray(children).map((child: any) => {
    return React.cloneElement(child, {
      ...child.props,
      api,
      size,
    })
  })

  return <Portal>{clones}</Portal>
}
