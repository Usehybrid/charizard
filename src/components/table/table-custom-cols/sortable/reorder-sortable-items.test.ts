import {describe, expect, it} from 'vitest'
import {reorderSortableItems} from './reorder-sortable-items'

const item = (id: string, checked = true, group?: string) => ({
  id,
  label: id,
  checked,
  group,
})

describe('reorderSortableItems', () => {
  it('uses the projected source index when the drop target is the source', () => {
    const items = [item('location'), item('status'), item('purchase_date')]

    expect(reorderSortableItems(items, 'location', 1).map(column => column.id)).toEqual([
      'status',
      'location',
      'purchase_date',
    ])
  })

  it('maps checked-item indices back to the complete persisted state', () => {
    const items = [
      item('allocated_to', false),
      item('location'),
      item('status'),
      item('purchase_date'),
    ]

    expect(reorderSortableItems(items, 'location', 2).map(column => column.id)).toEqual([
      'allocated_to',
      'status',
      'purchase_date',
      'location',
    ])
  })

  it('resolves projected indices within the source group', () => {
    const items = [
      item('location', true, 'Device'),
      item('owner', true, 'User'),
      item('status', true, 'Device'),
    ]

    expect(reorderSortableItems(items, 'status', 0).map(column => column.id)).toEqual([
      'status',
      'location',
      'owner',
    ])
  })

  it('keeps the same state for an invalid or unchanged projection', () => {
    const items = [item('location'), item('status')]

    expect(reorderSortableItems(items, 'location', 0)).toBe(items)
    expect(reorderSortableItems(items, 'missing', 1)).toBe(items)
    expect(reorderSortableItems(items, 'location', 3)).toBe(items)
  })
})
