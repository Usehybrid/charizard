import * as React from 'react'
import GroupedCustomColCheckbox from './GroupedCustomColCheckbox'
import classes from './table-custom-cols.module.css'
import {CustomColCheckedState} from '../types'

interface GroupedSelectionProps {
  checkedState: CustomColCheckedState[]
  setCheckedState: React.Dispatch<React.SetStateAction<CustomColCheckedState[]>>
  search: string
}

export function GroupedSelection({checkedState, setCheckedState, search}: GroupedSelectionProps) {
  // Handle local state for checkboxes within the drawer
  const handleCheckboxChange = React.useCallback(
    (id: string, checked: boolean) => {
      setCheckedState(prev => {
        const newState = [...prev]
        const index = newState.findIndex(item => item.id === id)
        if (index !== -1) {
          newState[index] = {...newState[index], checked}
        }
        return newState
      })
    },
    [setCheckedState],
  )

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

  return (
    <>
      {Object.entries(filteredGroups).map(([group, items]) => (
        <div key={group}>
          <h3 className={classes.groupTitle}>{group}</h3>
          {items.map(item => (
            <div key={item.id} className={classes.option}>
              <GroupedCustomColCheckbox
                label={item.label}
                id={item.id}
                checked={item.checked}
                onCheckChange={checked => handleCheckboxChange(item.id, checked)}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
