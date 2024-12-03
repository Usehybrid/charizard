import * as React from 'react'
import * as dialog from '@zag-js/dialog'
import classes from './modal.module.css'
import {useMachine, normalizeProps, Portal} from '@zag-js/react'
import {ButtonV2, ButtonV2Props} from '../button-v2'
import {SVG} from '../svg'
import closeIcon from '../assets/close.svg'
import {DialogFooterButtons} from '../../types/common'
import clsx from 'clsx'

/**
 * Props for the ModalV2 component.
 */
interface ModalV2Props {
  /** Indicates if the modal is open. */
  isOpen?: boolean
  /** Callback function to close the modal. */
  onClose?: () => void
  /** Title of the modal. */
  title: string
  /** Optional subtitle of the modal. */
  subTitle?: string
  /** Optional trigger element to open the modal. */
  trigger?: React.ReactNode
  /** Content to be displayed inside the modal. */
  children: React.ReactNode
  /** Array of footer buttons for the modal. */
  footerButtons: DialogFooterButtons
  /** Indicates whether to show a backdrop behind the modal. */
  showBackdrop?: boolean
  customModalClasses?: string
}

/**
 * ModalV2 component displays a modal dialog with a title, content, and footer buttons.
 *
 * @param {ModalV2Props} props - The props for the ModalV2 component.
 * @returns {JSX.Element} The rendered modal component.
 */

export function ModalV2({
  isOpen,
  title,
  subTitle,
  trigger,
  children,
  footerButtons,
  showBackdrop = false,
  onClose,
  customModalClasses,
}: ModalV2Props) {
  const [state, send] = useMachine(dialog.machine({id: React.useId(), open: isOpen}))
  const api = dialog.connect(state, send, normalizeProps)

  React.useEffect(() => {
    api.setOpen(!!isOpen)
  }, [isOpen])

  React.useEffect(() => {
    if (!api.open) {
      onClose?.()
    }
  }, [api.open])

  return (
    <>
      {trigger && (
        <button {...api.getTriggerProps()} className="zap-reset-btn">
          {trigger}
        </button>
      )}
      {api.open && (
        <Portal>
          {showBackdrop && <div {...api.getBackdropProps()} className={classes.backdrop} />}
          <div {...api.getPositionerProps()} className={classes.positioner}>
            <div {...api.getContentProps()} className={clsx(classes.modal, customModalClasses)}>
              <div {...api.getTitleProps()} className={classes.header}>
                <div>
                  <h2 className="zap-heading-semibold">{title}</h2>
                  {subTitle && <p className="zap-subcontent-regular">{subTitle}</p>}
                </div>
                <button {...api.getCloseTriggerProps()} className="zap-reset-btn">
                  <SVG path={closeIcon} svgClassName={classes.icon} />
                </button>
              </div>

              <div
                {...api.getDescriptionProps()}
                className={clsx(classes.hideScrollbar, classes.content)}
              >
                {children}
              </div>

              {!!footerButtons.length && (
                <div className={classes.footer}>
                  {footerButtons?.map(({btnText, isLoading, loadingText, ...btnProps}, idx) => {
                    return (
                      <ButtonV2 key={idx} {...(btnProps as ButtonV2Props)}>
                        {isLoading ? loadingText : btnText}
                      </ButtonV2>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
