import * as React from 'react'
import classes from './sortable.module.css'
import {DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors} from '@dnd-kit/core'
import {SortableContext, arrayMove, sortableKeyboardCoordinates} from '@dnd-kit/sortable'
import {DragHandle, SortableItem} from './SortableItem'
import {SortableOverlay} from './SortableOverlay'
import type {Active, UniqueIdentifier} from '@dnd-kit/core'

interface BaseItem {
  id: UniqueIdentifier
}

interface Props<T extends BaseItem> {
  items: T[]
  onChange(items: T[]): void
  renderItem(item: T): React.ReactNode
}

export function SortableList<T extends BaseItem>({items: _items, onChange, renderItem}: Props<T>) {
  const items = _items.filter((i: any) => i.checked)
  console.log({items})
  const [active, setActive] = React.useState<Active | null>(null)
  const activeItem = React.useMemo(
    () => items.find(item => item.id === active?.id),
    [active, items],
  )
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({active}) => {
        setActive(active)
      }}
      onDragEnd={({active, over}) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({id}) => id === active.id)
          const overIndex = items.findIndex(({id}) => id === over.id)

          onChange(arrayMove(items, activeIndex, overIndex))
        }
        setActive(null)
      }}
      onDragCancel={() => {
        setActive(null)
      }}
    >
      <SortableContext items={items}>
        <ul className={classes.sortList} role="application">
          {items.map(item => (
            <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
          ))}
        </ul>
      </SortableContext>
      <SortableOverlay>{activeItem ? renderItem(activeItem) : null}</SortableOverlay>
    </DndContext>
  )
}

SortableList.Item = SortableItem
SortableList.DragHandle = DragHandle
