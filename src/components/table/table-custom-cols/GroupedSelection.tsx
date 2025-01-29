import * as React from 'react'
import CustomColCheckbox from './CustomColCheckbox'
import classes from './table-custom-cols.module.css'
import {CustomColCheckedState} from '../types'

interface GroupedSelectionProps {
  checkedState: CustomColCheckedState[]
  setCheckedState: React.Dispatch<React.SetStateAction<CustomColCheckedState[]>>
  search: string
}

export function GroupedSelection({checkedState, setCheckedState, search}: GroupedSelectionProps) {
  // Get group order based on first appearance in data
  const groupOrder = React.useMemo(() => {
    const order: Record<string, number> = {}
    let orderIndex = 0

    checkedState.forEach(item => {
      const group = item.group || 'Ungrouped'
      if (!(group in order)) {
        order[group] = orderIndex++
      }
    })

    return order
  }, [checkedState])

  const groupedItems = React.useMemo(() => {
    const groups: Record<string, CustomColCheckedState[]> = {}
    checkedState.forEach(item => {
      const group = item.group || 'Ungrouped'
      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(item)
    })
    return groups
  }, [checkedState])

  const filteredGroups = React.useMemo(() => {
    const filtered: Record<string, CustomColCheckedState[]> = {}
    Object.entries(groupedItems).forEach(([group, items]) => {
      const filteredItems = items.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase()),
      )
      if (filteredItems.length > 0) {
        filtered[group] = filteredItems
      }
    })
    return filtered
  }, [groupedItems, search])

  // Sort groups based on their first appearance in the data
  const sortedGroups = React.useMemo(() => {
    return Object.entries(filteredGroups).sort(([groupA], [groupB]) => {
      const orderA = groupOrder[groupA] ?? Number.MAX_VALUE
      const orderB = groupOrder[groupB] ?? Number.MAX_VALUE
      return orderA - orderB
    })
  }, [filteredGroups, groupOrder])

  return (
    <>
      {sortedGroups.map(([group, items]) => (
        <div key={group}>
          <h3 className={classes.groupTitle}>{group}</h3>
          {items.map(item => {
            return (
              <div key={item.id} className={classes.option}>
                <CustomColCheckbox
                  label={item.label}
                  id={item.id}
                  checked={item.checked}
                  setCheckedState={setCheckedState}
                  disabled={item.id === 'name'}
                />
              </div>
            )
          })}
        </div>
      ))}
    </>
  )
}
