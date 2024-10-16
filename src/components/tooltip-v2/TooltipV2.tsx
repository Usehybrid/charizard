import * as React from 'react'
import {createPortal} from 'react-dom'
import {Tooltip} from 'react-tooltip'
import {truncate} from '../../utils/text'

export interface TooltipV2Props {
  id: string
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
  opacity?: number
  portalId?: string
  portalClass?: string
  contentMaxLength?: number
}

/**
 * TooltipV2 component that displays a tooltip on hover or focus of the trigger element.
 *
 * @param {TooltipV2Props} props - Props for the TooltipV2 component.
 * @param {string} props.id - Unique identifier for the tooltip.
 * @param {string} [props.placement='top'] - Placement of the tooltip relative to the trigger element.
 * @param {React.ReactNode} props.trigger - The element that triggers the tooltip.
 * @param {string | React.ReactNode} props.content - Content of the tooltip.
 * @param {'dark' | 'light' | 'success' | 'warning' | 'error' | 'info'} [props.variant='dark'] - Variant of the tooltip for styling.
 * @param {React.CSSProperties} [props.customStyle={}] - Custom styles to be applied to the tooltip.
 * @param {number} [props.opacity] - Opacity of the tooltip.
 * @param {string} [props.portalId] - ID of the portal element where the tooltip will be rendered.
 * @param {string} [props.portalClass] - Class name of the portal element where the tooltip will be rendered.
 * @param {number} [props.contentMaxLength] - Maximum length of content to display; truncates if exceeded.
 * @returns {JSX.Element} The rendered TooltipV2 component.
 */

export function TooltipV2({
  id,
  placement = 'top',
  trigger,
  content,
  variant = 'dark',
  customStyle = {},
  portalId,
  portalClass,
  contentMaxLength,
}: TooltipV2Props) {
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
      id={id}
      place={placement}
      style={{
        backgroundColor: 'var(--p-p90)',
        zIndex: 50,
        fontSize: '14px',
        fontWeight: 500,
        letterSpacing: '0.2px',
        lineHeight: '20px',
        maxWidth: '260px',
        padding: '8px 12px',
        borderRadius: '4px',
        ...customStyle,
      }}
      opacity={1}
    >
      {tooltipContent}
    </Tooltip>
  )

  return (
    <>
      <a data-tooltip-id={id} data-tooltip-variant={variant}>
        {trigger}
      </a>
      {portalContainer ? createPortal(tooltip, portalContainer) : tooltip}
    </>
  )
}
