import * as React from 'react'
import classes from './table-tags-cell.module.css'
import {Badge} from '../../../badge'
import {Popover, PopoverTrigger, PopoverContent} from '../../../popover'

/**
 * Represents a tag item with a name and optional additional properties.
 */
interface TableTagItem {
  id: string
  name: string
  [key: string]: any
}

/**
 * Props for the TableTags component.
 * @typedef {Object} TableTagsCellProps
 * @property {TableTagItem[]} items - Array of group items to display.
 * @property {number} [maxVisible=3] - Maximum number of items to display before showing a count badge.
 * @property {string} [customStyles] - Optional CSS styles for the container.
 * @property {(item: TableTagItem) => React.ReactNode} [renderBadge] - Optional custom render function for badges.
 * @property {(items: TableTagItem[]) => React.ReactNode} [renderPopoverContent] - Optional custom render function for popover content.
 */
interface TableTagsCellProps {
  items: TableTagItem[]
  maxVisible?: number
  renderBadge?: (item: TableTagItem) => React.ReactNode
  renderPopoverContent?: (items: TableTagItem[]) => React.ReactNode
  customStyles?: React.CSSProperties
}

/**
 * A generic component to display a list of items as badges with a popover for overflow.
 *
 * @param {TableTagsCellProps} props - The component props.
 * @returns {React.ReactElement} The rendered component.
 */
export function TableTagsCell({
  items,
  maxVisible = 3,
  renderBadge = item => <Badge key={item.name}>{item.name}</Badge>,
  renderPopoverContent = items => items.map(item => item.name).join('\n'),
  customStyles = {},
}: TableTagsCellProps): React.ReactElement {
  if (!items || items.length === 0) return <>-</>

  const visibleItems = items.slice(0, maxVisible)
  const remainingItems = items.slice(maxVisible)

  return (
    <div className={classes.box} style={customStyles}>
      {visibleItems.map(renderBadge)}
      {remainingItems.length > 0 && (
        <Popover>
          <PopoverTrigger>
            <Badge>{`+${remainingItems.length}`}</Badge>
          </PopoverTrigger>
          <PopoverContent>{renderPopoverContent(remainingItems)}</PopoverContent>
        </Popover>
      )}
    </div>
  )
}
