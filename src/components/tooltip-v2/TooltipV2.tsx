/* eslint-disable jsx-a11y/anchor-is-valid */
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
  content: string
  variant?: 'dark' | 'light' | 'success' | 'warning' | 'error' | 'info'
  customStyle?: React.CSSProperties
  opacity?: number
  portalId?: string
  portalClass?: string
  contentMaxLength?: number
}
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
  let portalContainer: HTMLElement | null = null
  if (portalId) {
    portalContainer = document.getElementById(portalId)
  }
  if (portalClass) {
    portalContainer = document.querySelector(`.${portalClass}`)
  }
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
        // whiteSpace: 'pre-line',
        // wordBreak: 'break-all',
        ...customStyle,
      }}
      opacity={1}
    />
  )

  const tooltipContent = truncate(content, contentMaxLength)

  return (
    <>
      <a data-tooltip-id={id} data-tooltip-content={tooltipContent} data-tooltip-variant={variant}>
        {trigger}
      </a>
      {portalContainer ? createPortal(tooltip, portalContainer) : tooltip}
    </>
  )
}
