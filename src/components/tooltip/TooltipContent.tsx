/**
 * @author Pratik Awaik <pratik@hybr1d.io>
 */

import clsx from 'clsx'
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
  /**
   * content background
   */
  bg?: 'black' | 'gray' | string
  /**
   * positioner styles
   */
  positionerStyles?: React.CSSProperties
  containerStyles?: React.CSSProperties
}

export function TooltipContent({
  children,
  api,
  bg = 'black',
  positionerStyles = {},
  containerStyles = {},
}: TooltipContentProps) {
  const isCustomBg = !['black', 'gray'].includes(bg)

  const arrowProps = {
    ...api?.arrowProps,
    ...(isCustomBg && {
      style: {
        ...api?.arrowProps?.style,
        '--arrow-background': bg,
      },
    }),
  }

  return (
    <>
      {api.open && (
        <div
          {...api.getPositionerProps()}
          style={{...api?.getPositionerProps()?.style, ...positionerStyles}}
        >
          <div {...arrowProps} className={clsx(classes.arrow, {[classes[bg]]: !isCustomBg})}>
            <div {...api.arrowTipProps} />
          </div>
          <div
            {...api.getContentProps()}
            className={clsx(classes.content, classes[bg])}
            style={{background: isCustomBg ? bg : '', ...containerStyles}}
          >
            {children}
          </div>
        </div>
      )}
    </>
  )
}
