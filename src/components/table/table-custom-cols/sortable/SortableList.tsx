import * as React from 'react'
import classes from './sortable.module.css'
import {DragDropProvider, KeyboardSensor, PointerSensor} from '@dnd-kit/react'
import {RestrictToVerticalAxis} from '@dnd-kit/abstract/modifiers'
import type {DragEndEvent} from '@dnd-kit/react'
import type {UniqueIdentifier} from '@dnd-kit/abstract'
import {isSortable} from '@dnd-kit/react/sortable'
import {DragHandle, SortableItem, SortablePositionsContext} from './SortableItem'
import type {SortablePosition} from './SortableItem'
import type {CustomColCheckedState} from '../../types'
import {reorderSortableItems} from './reorder-sortable-items'

// Sentinel group for items without a `group`, so every sortable item belongs to
// exactly one `useSortable` group (ungrouped items reorder among themselves).
const UNGROUPED: UniqueIdentifier = '__ungrouped__'

interface BaseItem {
  id: UniqueIdentifier
  group?: string
  checked: boolean
  label: string
}

interface Props<T extends BaseItem> {
  items: T[]
  onChange: React.Dispatch<React.SetStateAction<CustomColCheckedState[]>>
  renderItem: (item: T) => React.ReactNode
}

export function SortableList<T extends BaseItem>({items: _items, onChange, renderItem}: Props<T>) {
  const {groups, ungroupedItems, positions} = React.useMemo(() => {
    const groups: {[key: string]: T[]} = {}
    const ungroupedItems: T[] = []

    _items.forEach(item => {
      if (item.checked) {
        if (item.group) {
          if (!groups[item.group]) {
            groups[item.group] = []
          }
          groups[item.group].push(item)
        } else {
          ungroupedItems.push(item)
        }
      }
    })

    // Sortable position (group + index-within-group) for each visible item.
    const positions = new Map<UniqueIdentifier, SortablePosition>()
    Object.entries(groups).forEach(([group, items]) =>
      items.forEach((item, index) => positions.set(item.id, {index, group})),
    )
    ungroupedItems.forEach((item, index) =>
      positions.set(item.id, {index, group: UNGROUPED}),
    )

    return {groups, ungroupedItems, positions}
  }, [_items])

  const sensors = React.useMemo(() => [PointerSensor, KeyboardSensor], [])

  const handleDragEnd = React.useCallback(
    ({operation, canceled}: DragEndEvent) => {
      if (canceled) return
      const {source} = operation
      if (!source || !isSortable(source)) return

      // Optimistic sorting changes the source index and then makes the source
      // itself the drop target. Reconcile from the sortable indices instead of
      // treating target.id as the destination item.
      if (source.initialGroup !== source.group) return
      onChange(prevItems => reorderSortableItems(prevItems, source.id, source.index))
    },
    [onChange],
  )

  return (
    <DragDropProvider sensors={sensors} modifiers={[RestrictToVerticalAxis]} onDragEnd={handleDragEnd}>
      <SortablePositionsContext.Provider value={positions}>
        {Object.entries(groups).map(([group, items]) => (
          <div key={group} className={classes.grouped}>
            <p className={classes.info}>{group}</p>
            <ul role="application" className={classes.sortList}>
              {items.map(item => (
                <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
              ))}
            </ul>
          </div>
        ))}
        {ungroupedItems.length > 0 && (
          <div>
            <ul role="application" className={classes.sortList}>
              {ungroupedItems.map(item => (
                <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
              ))}
            </ul>
          </div>
        )}
      </SortablePositionsContext.Provider>
    </DragDropProvider>
  )
}

SortableList.Item = SortableItem
SortableList.DragHandle = DragHandle
