import clsx from 'clsx'
import {SVG} from '../svg'
import closeIcon from '../assets/close.svg'
import classes from './styles.module.css'

interface ModalHeaderProps {
  /**
   * Modal header children
   */
  children: React.ReactNode
  /**
   * Zagjs modal API (no need to pass when using this component)
   * will be inserted by default
   */
  api?: any
  /**
   * Show cross button or not
   */
  showCrossBtn?: boolean
  /**
   * Show border or not
   */
  showBorder?: boolean
}

export function ModalHeader({
  children,
  api,
  showCrossBtn = true,
  showBorder = true,
}: ModalHeaderProps) {
  return (
    <div
      {...api?.getTitleProps()}
      className={clsx(classes.header, {[classes.showBorder]: showBorder})}
    >
      <div>{children}</div>
      {showCrossBtn && (
        <button
          {...api.getCloseTriggerProps()}
          type="button"
          onClick={() => api?.setOpen(false)}
          className="zap-reset-btn"
        >
          <SVG
            path={closeIcon}
            svgClassName={classes.closeIcon}
            spanClassName={classes.closeIconSpan}
          />
        </button>
      )}
    </div>
  )
}
