import * as React from 'react'
import * as dialog from '@zag-js/dialog'
import classes from './modal.module.css'
import {useMachine, normalizeProps, Portal} from '@zag-js/react'
import {DialogFooterButtons} from '../drawer-v2'
import {ButtonV2} from '../button-v2'
import {SVG} from '../svg'
import closeIcon from '../assets/close.svg'

interface ModalV2Props {
  isOpen?: boolean
  title: string
  subTitle?: string
  trigger: React.ReactNode
  children: React.ReactNode
  footerButtons: DialogFooterButtons
  showBackdrop?: boolean
}

export function ModalV2({
  isOpen,
  title,
  subTitle,
  trigger,
  children,
  footerButtons,
  showBackdrop = false,
}: ModalV2Props) {
  const [state, send] = useMachine(dialog.machine({id: React.useId(), open: isOpen}))
  const api = dialog.connect(state, send, normalizeProps)

  console.log('open:', api.open)

  React.useEffect(() => {
    if (isOpen) {
      api.setOpen(true)
    } else {
      api.setOpen(false)
    }
  }, [isOpen])

  return (
    <>
      <button {...api.getTriggerProps()} className={'zap-reset-btn'}>
        {trigger}
      </button>
      {api.open && (
        <Portal>
          {showBackdrop && <div {...api.getBackdropProps()} className={classes.backdrop} />}
          <div {...api.getPositionerProps()} className={classes.positioner}>
            <div {...api.getContentProps()} className={classes.modal}>
              <div {...api.getTitleProps()} className={classes.header}>
                <div>
                  <h2 className={'zap-heading-semibold'}>{title}</h2>
                  {subTitle && <p className={'zap-subcontent-regular'}>{subTitle}</p>}
                </div>
                <button {...api.getCloseTriggerProps()} className={'zap-reset-btn'}>
                  <SVG path={closeIcon} svgClassName={classes.icon} />
                </button>
              </div>

              <div {...api.getDescriptionProps()} className={classes.content}>
                {children}
              </div>

              <div className={classes.footer}>
                {footerButtons?.map((btn, idx) => (
                  <ButtonV2
                    key={idx}
                    disabled={btn.disabled}
                    variant={btn.variant}
                    onClick={btn.onClick ? btn.onClick : undefined}
                    btnType={btn.btnType}
                    type={btn.type as any}
                  >
                    {btn.btnText}
                  </ButtonV2>
                ))}
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
