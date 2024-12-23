import clsx from 'clsx'
import classes from './styles.module.css'
import {Button, BUTTON_VARIANT, BUTTON_SIZE, BUTTON_TYPE} from '../button'
import {SVG} from '../svg'

export type FooterButtons = Array<{
  variant?:  BUTTON_VARIANT
  onClick: () => void
  btnText: string
  btnType?: BUTTON_TYPE | 'submit'
  btnSize?: BUTTON_SIZE
  disabled?: boolean
  isLoading?: boolean
  loadingText?: string
  icon?: string
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
              disabled={btn.disabled}
              variant={btn.variant}
              onClick={async () => {
                await btn.onClick()
                api?.setOpen(false)
              }}
              size={btn.btnSize}
            >
              {btn.isLoading ? (
                btn.loadingText
              ) : (
                <div className={classes.buttonLabel}>
                  {btn.icon && (
                    <div>
                      <SVG
                        path={btn.icon as string}
                        customSvgStyles={{
                          fill: 'white',
                          width: '20px',
                          height: '20px',
                        }}
                      />
                    </div>
                  )}
                  <div>{btn.btnText}</div>
                </div>
              )}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
