import * as React from 'react'
import * as popover from '@zag-js/popover'
import type {Placement} from '@zag-js/popper'
import {normalizeProps, useMachine} from '@zag-js/react'
import {useId} from 'react'

interface PopoverProps {
  /**
   * Content of the trigger
   */
  children: React.ReactNode
  /**
   * Placement of the popover
   */
  placement?: Placement
  /**
   * Props to pass to the popover machine
   */
  popoverProps?: any
  /**
   * close popover on scroll
   */
  closeOnScroll?: boolean
  /**
   * when using closeOnScroll, its necessary to pass containerRef to track scroll movement of the container you want to close the popover with respect to.
   */
  containerRef?: any
}

export function Popover({
  children,
  placement = 'top',
  popoverProps,
  closeOnScroll = false,
  containerRef,
}: PopoverProps) {
  const [state, send] = useMachine(
    popover.machine({
      id: useId(),
      positioning: {placement},
      closeOnInteractOutside: true,
      ...popoverProps,
    }),
  )
  const api = popover.connect(state, send, normalizeProps)

  function closePopover() {
    api?.close()
  }

  React.useEffect(() => {
    if (closeOnScroll && containerRef && containerRef.current) {
      containerRef.current.addEventListener('scroll', closePopover)
    }

    return () => {
      if (closeOnScroll) containerRef.current?.removeEventListener('scroll', closePopover)
    }
  }, [containerRef?.current])

  const clones = React.Children.toArray(children).map((child: any) => {
    return React.cloneElement(child, {
      ...child.props,
      api,
    })
  })

  return <>{clones}</>
}
