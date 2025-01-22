import * as React from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import GroupedCustomColCheckbox from './GroupedCustomColCheckbox'
import classes from './table-custom-cols.module.css'
import {CustomColCheckedState} from '../types'

interface GroupedSelectionProps {
  checkedState: CustomColCheckedState[]
  setCheckedState: React.Dispatch<React.SetStateAction<CustomColCheckedState[]>>
  search: string
  onVisibilityChange?: (columnId: string, isVisible: boolean) => void
}

export function GroupedSelection({
  checkedState,
  setCheckedState,
  search,
  onVisibilityChange,
}: GroupedSelectionProps) {
  // Keep track of initial state
  const initialStateRef = React.useRef<CustomColCheckedState[]>([])

  // Initialize reference on mount
  React.useEffect(() => {
    initialStateRef.current = checkedState
  }, [])

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

  // Handle checkbox changes with state restoration capability
  const handleCheckboxChange = React.useCallback(
    (id: string, checked: boolean) => {
      setCheckedState(prev => {
        const newState = [...prev]
        const index = newState.findIndex(item => item.id === id)
        if (index !== -1) {
          newState[index] = {...newState[index], checked}
          onVisibilityChange?.(id, checked)
        }
        return newState
      })
    },
    [setCheckedState, onVisibilityChange],
  )

  // Sync with initial state when component unmounts
  useDeepCompareEffect(() => {
    return () => {
      if (initialStateRef.current.length) {
        setCheckedState(initialStateRef.current)
      }
    }
  }, [])

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
