import * as React from 'react'
import * as dialog from '@zag-js/dialog'
import {Portal, normalizeProps, useMachine} from '@zag-js/react'
import {ModalOverlay} from './ModalOverlay'

type ModalProps = {
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
  size?: 'sm' | 'md' | 'fullScreen' // sm: 400px, md: 600px
  /**
   * show overlay
   */
  showOverlay?: boolean

  /**
   * Machine Props
   */
  machineProps?: dialog.Context | {}
}

export function Modal({
  isOpen,
  onClose,
  children,
  size = 'md',
  showOverlay = true,
  machineProps = {},
}: ModalProps) {
  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open) onClose()
    },
    [onClose],
  )

  const [state, send] = useMachine(
    dialog.machine({
      id: React.useId(),
      open: isOpen,
      onOpenChange: details => handleOpenChange(details.open),
      ...machineProps,
    }),
  )
  const api = dialog.connect(state, send, normalizeProps)

  const clones = React.Children.toArray(children).map((child: any) => {
    return React.cloneElement(child, {
      ...child.props,
      api,
      size,
    })
  })

  return (
    <Portal>
      {showOverlay && <ModalOverlay api={api} />}
      {clones}
    </Portal>
  )
}
