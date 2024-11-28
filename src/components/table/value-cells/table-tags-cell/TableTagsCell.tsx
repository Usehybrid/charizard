import * as popover from '@zag-js/popover'
import * as React from 'react'
import clsx from 'clsx'
import classes from './table-tags-cell.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {Badge} from '../../../badge'

interface TableTagItem {
  id: string
  name: string
  [key: string]: any
}

interface TableTagsCellProps {
  items: TableTagItem[]
  maxVisible?: number
  renderBadge?: (item: TableTagItem) => React.ReactNode
  renderPopoverContent?: (items: TableTagItem[]) => React.ReactNode
  customStyles?: React.CSSProperties
}

export function TableTagsCell({
  items,
  maxVisible = 3,
  renderBadge = item => <Badge key={item.name}>{item.name}</Badge>,
  renderPopoverContent = items => (
    <div className={classes.tags}>
      {items.map(item => (
        <Badge key={item.id}>{item.name}</Badge>
      ))}
    </div>
  ),
  customStyles = {},
}: TableTagsCellProps): React.ReactElement {
  if (!items || items.length === 0) return <>-</>

  const visibleItems = items.slice(0, maxVisible)
  const remainingItems = items.slice(maxVisible)

  const [state, send] = useMachine(
    popover.machine({
      id: React.useId(),
      positioning: {placement: 'bottom'},
      closeOnInteractOutside: true,
    }),
  )

  const api = popover.connect(state, send, normalizeProps)

  return (
    <div className={classes.box} style={customStyles}>
      {visibleItems.map(renderBadge)}
      {remainingItems.length > 0 && (
        <>
          <button {...api.getTriggerProps()} className={clsx('zap-reset-btn', classes.trigger)}>
            <Badge>{`+${remainingItems.length}`}</Badge>
          </button>
          <div {...api.getPositionerProps()} className={classes.positioner}>
            <div {...api.getArrowProps()}>
              <div {...api.getArrowTipProps()} />
            </div>
            <div {...api.getContentProps()} className={classes.content}>
              {renderPopoverContent(remainingItems)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
