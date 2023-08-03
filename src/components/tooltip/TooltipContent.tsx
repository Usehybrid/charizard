/**
 * @author Pratik Awaik <pratik@hybr1d.io>
 */

import classes from './styles.module.css'

interface TooltipContentProps {
  /**
   * tooltip content children
   */
  children: React.ReactNode
  /**
   * tooltip API object
   */
  api?: any
}

export function TooltipContent({children, api}: TooltipContentProps) {
  return (
    <>
      {api.isOpen && (
        <div {...api.positionerProps}>
          <div {...api.arrowProps} className={classes.arrow}>
            <div {...api.arrowTipProps} />
          </div>
          <div {...api.contentProps} className={classes.content}>
            {children}
          </div>
        </div>
      )}
    </>
  )
}
