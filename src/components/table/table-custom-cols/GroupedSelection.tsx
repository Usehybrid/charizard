import * as React from 'react'
import CustomColCheckbox from './CustomColCheckbox'
import classes from './table-custom-cols.module.css'
import {CustomColCheckedState} from '../types'
import {Table} from '@tanstack/react-table'

interface GroupedSelectionProps {
  checkedState: CustomColCheckedState[]
  setCheckedState: React.Dispatch<React.SetStateAction<CustomColCheckedState[]>>
  search: string
  table: Table<any> // Add table prop
}

export function GroupedSelection({
  checkedState,
  setCheckedState,
  search,
  table,
}: GroupedSelectionProps) {
  // Handle checkbox changes
  const handleColumnToggle = React.useCallback(
    (id: string, checked: boolean) => {
      // Update checkedState
      setCheckedState(prev => {
        const newState = prev.map(item => (item.id === id ? {...item, checked} : item))

        // Directly update table visibility
        const column = table.getColumn(id)
        if (column) {
          column.toggleVisibility(checked)
        }

        return newState
      })
    },
    [table, setCheckedState],
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
              <CustomColCheckbox
                label={item.label}
                id={item.id}
                checked={item.checked}
                setCheckedState={oldState => {
                  if (typeof oldState === 'function') {
                    // For function updates
                    const newState = oldState(checkedState)
                    const changedItem = newState.find(i => i.id === item.id)
                    if (changedItem) {
                      handleColumnToggle(item.id, changedItem.checked)
                    }
                  } else {
                    // For direct state updates
                    const newState = [...oldState]
                    const index = newState.findIndex(i => i.id === item.id)
                    if (index !== -1) {
                      handleColumnToggle(item.id, newState[index].checked)
                    }
                  }
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
// import * as React from 'react'
// import CustomColCheckbox from './CustomColCheckbox'
// import classes from './table-custom-cols.module.css'
// import {CustomColCheckedState} from '../types'

// interface GroupedSelectionProps {
//   checkedState: CustomColCheckedState[]
//   setCheckedState: React.Dispatch<React.SetStateAction<CustomColCheckedState[]>>
//   search: string
// }

// export function GroupedSelection({checkedState, setCheckedState, search}: GroupedSelectionProps) {
//   const groupedItems = React.useMemo(() => {
//     const groups: Record<string, CustomColCheckedState[]> = {}
//     checkedState.forEach(item => {
//       const group = item.group || 'Ungrouped'
//       if (!groups[group]) {
//         groups[group] = []
//       }
//       groups[group].push(item)
//     })
//     return groups
//   }, [checkedState])

//   const filteredGroups = React.useMemo(() => {
//     const filtered: Record<string, CustomColCheckedState[]> = {}
//     Object.entries(groupedItems).forEach(([group, items]) => {
//       const filteredItems = items.filter(item =>
//         item.label.toLowerCase().includes(search.toLowerCase()),
//       )
//       if (filteredItems.length > 0) {
//         filtered[group] = filteredItems
//       }
//     })
//     return filtered
//   }, [groupedItems, search])

//   return (
//     <>
//       {Object.entries(filteredGroups).map(([group, items]) => (
//         <div key={group}>
//           <h3 className={classes.groupTitle}>{group}</h3>
//           {items.map(item => (
//             <div key={item.id} className={classes.option}>
//               <CustomColCheckbox
//                 label={item.label}
//                 id={item.id}
//                 checked={item.checked}
//                 setCheckedState={setCheckedState}
//               />
//             </div>
//           ))}
//         </div>
//       ))}
//     </>
//   )
// }
