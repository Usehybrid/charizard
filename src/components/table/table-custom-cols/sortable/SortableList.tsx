import * as React from 'react'
import classes from './sortable.module.css'
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {SortableContext, arrayMove, sortableKeyboardCoordinates} from '@dnd-kit/sortable'
import {DragHandle, SortableItem} from './SortableItem'
import {SortableOverlay} from './SortableOverlay'
import type {Active, UniqueIdentifier} from '@dnd-kit/core'
import type {CustomColCheckedState} from '../../types'

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
  const groupedItems = React.useMemo(() => {
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

    return {groups, ungroupedItems}
  }, [_items])

  const [active, setActive] = React.useState<Active | null>(null)
  const activeItem = React.useMemo(
    () => _items.find(item => item.id === active?.id),
    [active, _items],
  )

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = React.useCallback(
    ({active, over}: DragEndEvent) => {
      if (over && active.id !== over.id) {
        onChange(prevItems => {
          const activeIndex = prevItems.findIndex(item => item.id === active.id)
          const overIndex = prevItems.findIndex(item => item.id === over.id)

          // Ensure items are in the same group (or both ungrouped)
          const activeItem = prevItems[activeIndex]
          const overItem = prevItems[overIndex]
          if (activeItem.group !== overItem.group) {
            return prevItems // Do not move if groups are different
          }

          return arrayMove(prevItems, activeIndex, overIndex)
        })
      }
      setActive(null)
    },
    [onChange],
  )

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({active}) => setActive(active)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActive(null)}
    >
      {Object.entries(groupedItems.groups).map(([group, items]) => (
        <div key={group} className={classes.grouped}>
          <p className={classes.info}>{group}</p>
          <SortableContext items={items}>
            <ul role="application" className={classes.sortList}>
              {items.map(item => (
                <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
              ))}
            </ul>
          </SortableContext>
        </div>
      ))}
      {groupedItems.ungroupedItems.length > 0 && (
        <div>
          <SortableContext items={groupedItems.ungroupedItems}>
            <ul role="application" className={classes.sortList}>
              {groupedItems.ungroupedItems.map(item => (
                <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
              ))}
            </ul>
          </SortableContext>
        </div>
      )}
      <SortableOverlay>{activeItem ? renderItem(activeItem) : null}</SortableOverlay>
    </DndContext>
  )
}

SortableList.Item = SortableItem
SortableList.DragHandle = DragHandle
