/**
 * @author Pratik Awaik <pratik@hybr1d.io>
 */

import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import {Portal} from '@zag-js/react'

interface PopoverContentProps {
  /**
   * The content of the PopoverContent.
   */
  children: React.ReactNode
  /**
   * The popover API object.
   */
  api?: any
  /**
   * The background color of the PopoverContent.
   */
  bg?: 'black' | 'gray' | string
  /**
   * The styles to apply to the PopoverContent.
   */
  styles?: React.CSSProperties
  /**
   * The className to apply to the PopoverContent.
   */
  className?: string
  /**
   * The styles to apply to Popover positioner
   */
  positionerStyles?: React.CSSProperties
}

export function PopoverContent({
  children,
  api,
  bg = 'black',
  styles,
  className,
  positionerStyles,
}: PopoverContentProps) {
  const Wrapper = api?.portalled ? Portal : React.Fragment

  const clones = React.Children.toArray(children).map((child: any) => {
    return React.cloneElement(child, {
      ...child.props,
      api,
    })
  })

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
    <Wrapper>
      <div
        {...api?.getPositionerProps()}
        className={classes.positioner}
        style={{...api?.getPositionerProps()?.style, ...positionerStyles}}
      >
        <div {...arrowProps} className={clsx(classes.arrow, {[classes[bg]]: !isCustomBg})}>
          <div {...api?.getArrowTipProps()} />
        </div>
        <div
          {...api?.getContentProps()}
          className={clsx(classes.content, classes[bg], className)}
          style={{background: isCustomBg ? bg : '', ...styles}}
        >
          {clones}
        </div>
      </div>
    </Wrapper>
  )
}
