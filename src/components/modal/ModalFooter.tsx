import clsx from 'clsx'
import classes from './styles.module.css'
import {BUTTON_VARIANT} from '../button'
import {ButtonV2, BUTTON_V2_VARIANT, BUTTON_V2_SIZE, BUTTON_V2_TYPE} from '../button-v2'
import {SVG} from '../svg'

export type FooterButtons = Array<{
  variant?: BUTTON_VARIANT | BUTTON_V2_VARIANT
  onClick: () => void
  btnText: string
  btnType?: BUTTON_V2_TYPE | 'submit'
  btnSize?: BUTTON_V2_SIZE
  disabled?: boolean
  isLoading?: boolean
  loadingText?: string
  icon?: string
}>

// Map BUTTON_VARIANT to BUTTON_V2_VARIANT
export const mapVariant = (
  variant?: BUTTON_VARIANT | BUTTON_V2_VARIANT,
): BUTTON_V2_VARIANT | undefined => {
  switch (variant) {
    case BUTTON_VARIANT.PRIMARY:
      return BUTTON_V2_VARIANT.PRIMARY
    case BUTTON_VARIANT.SECONDARY:
      return BUTTON_V2_VARIANT.SECONDARY
    case BUTTON_VARIANT.DANGER:
      return BUTTON_V2_VARIANT.PRIMARY
    case BUTTON_VARIANT.MINIMAL:
      return BUTTON_V2_VARIANT.TERTIARY
    default:
      return variant as BUTTON_V2_VARIANT | undefined
  }
}

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
            <ButtonV2
              key={idx}
              disabled={btn.disabled}
              variant={mapVariant(btn.variant)}
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
            </ButtonV2>
          ))}
        </div>
      )}
    </div>
  )
}
