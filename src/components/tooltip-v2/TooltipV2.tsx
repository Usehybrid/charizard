import * as React from 'react'
import {createPortal} from 'react-dom'
import {Tooltip} from 'react-tooltip'
import classes from './styles.module.css'
import clsx from 'clsx'
import {TOOLTIP_DEFAULTS, truncate} from '../../utils'

export interface TooltipV2Props {
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
  trigger: React.ReactNode
  content: string | React.ReactNode
  variant?: 'dark' | 'light' | 'success' | 'warning' | 'error' | 'info'
  customStyle?: React.CSSProperties
  className?: string
  opacity?: number
  portalId?: string
  portalClass?: string
  contentMaxLength?: number | null
}

/**
 * TooltipV2 component that displays a tooltip on hover or focus of the trigger element.
 *
 * @param {TooltipV2Props} props - Props for the TooltipV2 component.
 * @param {'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end'} [props.placement='top'] - The placement of the tooltip relative to the trigger element.
 * @param {React.ReactNode} props.trigger - The element that triggers the tooltip (usually a button or link).
 * @param {string | React.ReactNode} props.content - The content to be displayed inside the tooltip. Can be a string or a React element.
 * @param {'dark' | 'light' | 'success' | 'warning' | 'error' | 'info'} [props.variant='dark'] - The variant or style of the tooltip, which changes its appearance based on the specified type.
 * @param {React.CSSProperties} [props.customStyle={}] - Inline custom styles to apply to the tooltip container.
 * @param {string} [props.className=''] - Additional custom CSS classes to apply to the tooltip for further styling.
 * @param {number} [props.opacity=TOOLTIP_DEFAULTS.opacity] - The opacity of the tooltip (between 0 and 1).
 * @param {string} [props.portalId] - The ID of the portal element where the tooltip should be rendered. If omitted, the tooltip will be rendered inline.
 * @param {string} [props.portalClass] - A CSS class used to locate the portal element by class name for tooltip rendering.
 * @param {number} [props.contentMaxLength=TOOLTIP_DEFAULTS.contentMaxLength] - The maximum length of the tooltip content. If exceeded and content is a string, it will be truncated. if pass null then max width will be removed.
 *
 * @returns {JSX.Element} The rendered TooltipV2 component.
 *
 * @example
 * <TooltipV2
 *   placement="bottom"
 *   trigger={<button>Hover me</button>}
 *   content="This is a tooltip"
 *   variant="light"
 *   customStyle={{ color: 'black' }}
 *   opacity={0.9}
 *   portalId="tooltip-portal"
 * />
 */

export function TooltipV2({
  placement = 'top',
  trigger,
  content = '',
  variant = 'dark',
  customStyle = {},
  className = '',
  opacity = TOOLTIP_DEFAULTS.opacity,
  portalId,
  portalClass,
  contentMaxLength = TOOLTIP_DEFAULTS.contentMaxLength,
}: TooltipV2Props) {
  const tooltipId = React.useId()
  let portalContainer = portalId
    ? document.getElementById(portalId)
    : portalClass
    ? document.querySelector(`.${portalClass}`)
    : null

  const tooltipContent = React.useMemo(() => {
    if (typeof content === 'string' && contentMaxLength) {
      return truncate(content, contentMaxLength)
    }
    return content
  }, [content, contentMaxLength])

  const tooltip = (
    <Tooltip
      id={tooltipId}
      place={placement}
      className={clsx('zap-content-medium', classes.tooltip, className)}
      style={customStyle}
      opacity={opacity}
    >
      {tooltipContent}
    </Tooltip>
  )

  return (
    <>
      <a data-tooltip-id={tooltipId} data-tooltip-variant={variant}>
        {trigger}
      </a>
      {portalContainer ? createPortal(tooltip, portalContainer) : tooltip}
    </>
  )
}
