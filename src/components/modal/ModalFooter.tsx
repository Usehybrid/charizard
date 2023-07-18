import clsx from 'clsx'
import classes from './styles.module.css'
import {Button, ButtonVariant} from '../button'

export type FooterButtons = Array<{
  variant: ButtonVariant
  onClick: () => void
  btnText: string
}>

interface ModalFooterProps {
  /**
   * Modal footer children
   * if children is passed, default buttons will not be shown
   * children acts like a custom footer
   */
  children?: React.ReactNode
  /**
   * zagjs modal API (no need to pass when using this component)
   * will be inserted by default
   */
  api?: any

  /**
   * set of buttons to display
   */
  buttons: FooterButtons
  /**
   * show border or not
   */
  showBorder?: boolean
}

export function ModalFooter({children, api, buttons, showBorder = true}: ModalFooterProps) {
  return (
    <div className={clsx(classes.footer, {[classes.showBorder]: showBorder})}>
      {children ? (
        children
      ) : (
        <div className={classes.btnsContainer}>
          {buttons.map((btn, idx) => (
            <Button
              key={idx}
              variant={btn.variant}
              onClick={() => {
                btn.onClick()
                // api?.close()
              }}
            >
              {btn.btnText}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
