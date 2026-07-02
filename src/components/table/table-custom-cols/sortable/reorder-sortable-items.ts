import {arrayMove} from '@dnd-kit/helpers'
import type {UniqueIdentifier} from '@dnd-kit/abstract'

type SortableItem = {
  id: UniqueIdentifier
  group?: string
  checked: boolean
}

/**
 * Applies a projected @dnd-kit sortable index to the complete column state.
 *
 * Sortable indices only include checked items within one group, while the
 * persisted state also contains unchecked items. Resolve the projected item
 * first, then move by the corresponding indices in the complete state.
 */
export function reorderSortableItems<T extends SortableItem>(
  items: T[],
  sourceId: UniqueIdentifier,
  destinationIndex: number,
): T[] {
  const sourceIndex = items.findIndex(item => item.id === sourceId)
  if (sourceIndex === -1 || !items[sourceIndex].checked) return items

  const sourceItem = items[sourceIndex]
  const sortableGroup = items.filter(item => item.checked && item.group === sourceItem.group)
  const destinationItem = sortableGroup[destinationIndex]
  if (!destinationItem || destinationItem.id === sourceId) return items

  const destinationStateIndex = items.findIndex(item => item.id === destinationItem.id)
  if (destinationStateIndex === -1) return items

  return arrayMove(items, sourceIndex, destinationStateIndex)
}
