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
  bg?: 'black' | 'white'
  /**
   * The styles to apply to the PopoverContent.
   */
  styles?: React.CSSProperties
  /**
   * The className to apply to the PopoverContent.
   */
  className?: string
}

export function PopoverContent({
  children,
  api,
  bg = 'black',
  styles,
  className,
}: PopoverContentProps) {
  const Wrapper = api?.portalled ? Portal : React.Fragment

  const clones = React.Children.toArray(children).map((child: any) => {
    return React.cloneElement(child, {
      ...child.props,
      api,
    })
  })

  return (
    <Wrapper>
      <div {...api?.positionerProps} className={classes.positioner}>
        <div {...api?.arrowProps} className={clsx(classes.arrow, classes[bg])}>
          <div {...api?.arrowTipProps} className={classes.arrowTip} />
        </div>
        <div
          {...api?.contentProps}
          className={clsx(classes.content, classes[bg], className)}
          style={styles}
        >
          {clones}
        </div>
      </div>
    </Wrapper>
  )
}
