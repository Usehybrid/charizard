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
  // Local state for drawer changes
  const [localCheckedState, setLocalCheckedState] = React.useState<CustomColCheckedState[]>([])

  // Initialize local state when drawer opens
  React.useEffect(() => {
    setLocalCheckedState(checkedState)
  }, [checkedState])

  const groupedItems = React.useMemo(() => {
    const groups: Record<string, CustomColCheckedState[]> = {}
    localCheckedState.forEach(item => {
      const group = item.group || 'Ungrouped'
      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(item)
    })
    return groups
  }, [localCheckedState])

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

  // We'll use this to update both local and parent state
  const handleLocalStateUpdate: React.Dispatch<React.SetStateAction<CustomColCheckedState[]>> =
    React.useCallback(
      value => {
        const newState = typeof value === 'function' ? value(localCheckedState) : value
        setLocalCheckedState(newState)
        setCheckedState(newState)
      },
      [setCheckedState, localCheckedState],
    )

  return (
    <>
      {Object.entries(filteredGroups).map(([group, items]) => (
        <div key={group}>
          <h3 className={classes.groupTitle}>{group}</h3>
          {items.map(item => (
            <div key={item.id} className={classes.option}>
              <CustomColCheckbox
                label={item.label}
                id={item.id}
                checked={item.checked}
                setCheckedState={handleLocalStateUpdate}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
