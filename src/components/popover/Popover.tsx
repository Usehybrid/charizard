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
}

export function Popover({children, placement = 'top', popoverProps}: PopoverProps) {
  const [state, send] = useMachine(
    popover.machine({
      id: useId(),
      positioning: {placement},
      closeOnInteractOutside: true,
      ...popoverProps,
    }),
  )
  const api = popover.connect(state, send, normalizeProps)

  const clones = React.Children.toArray(children).map((child: any) => {
    return React.cloneElement(child, {
      ...child.props,
      api,
    })
  })

  return <>{clones}</>
}
