import * as React from 'react'
import classes from './sortable.module.css'
import {DragDropProvider, KeyboardSensor, PointerSensor} from '@dnd-kit/react'
import {RestrictToVerticalAxis} from '@dnd-kit/abstract/modifiers'
import {arrayMove} from '@dnd-kit/helpers'
import type {DragEndEvent} from '@dnd-kit/react'
import type {UniqueIdentifier} from '@dnd-kit/abstract'
import {DragHandle, SortableItem, SortablePositionsContext} from './SortableItem'
import type {SortablePosition} from './SortableItem'
import type {CustomColCheckedState} from '../../types'

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
      const {source, target} = operation
      if (!source || !target || source.id === target.id) return

      onChange(prevItems => {
        const activeIndex = prevItems.findIndex(item => item.id === source.id)
        const overIndex = prevItems.findIndex(item => item.id === target.id)
        if (activeIndex === -1 || overIndex === -1) return prevItems

        // Ensure items are in the same group (or both ungrouped)
        if (prevItems[activeIndex].group !== prevItems[overIndex].group) {
          return prevItems // Do not move if groups are different
        }

        return arrayMove(prevItems, activeIndex, overIndex)
      })
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
