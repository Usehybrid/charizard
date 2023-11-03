/**
 * @description https://zagjs.com/components/react/tooltip
 */

import * as React from 'react'
import * as tooltip from '@zag-js/tooltip'
import {useMachine, normalizeProps} from '@zag-js/react'
import {TooltipTrigger} from './TooltipTrigger'
import {TooltipContent} from './TooltipContent'
import type {Placement} from '@zag-js/popper'

type TooltipProps = {
  /**
   * tooltip children
   */
  children: React.ReactNode

  /**
   * open tooltip after delay
   */
  openDelay?: number
  /**
   * close tooltip after delay
   */
  closeDelay?: number

  /**
   * placement of the tooltip
   */
  placement?: Placement
}

export function Tooltip({
  children,
  openDelay = 0,
  closeDelay = 0,
  placement = 'top',
}: TooltipProps) {
  const [state, send] = useMachine(
    tooltip.machine({
      id: React.useId(),
      openDelay,
      closeDelay,
      positioning: {
        placement,
        gutter: 3,
      },
    }),
  )
  const api = tooltip.connect(state, send, normalizeProps)

  const clones = React.Children.toArray(children).map((child: any) => {
    return React.cloneElement(child, {
      ...(child.props ?? {}),
      api,
    })
  })

  return <>{clones}</>
}

Tooltip.Trigger = TooltipTrigger
Tooltip.Content = TooltipContent
