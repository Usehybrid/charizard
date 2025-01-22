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
  const prevCheckedStateRef = React.useRef<CustomColCheckedState[]>([])

  // Sync local state with parent state whenever it changes
  React.useEffect(() => {
    // Only update if the checked states are actually different
    if (JSON.stringify(prevCheckedStateRef.current) !== JSON.stringify(checkedState)) {
      setLocalCheckedState(checkedState)
      prevCheckedStateRef.current = checkedState
    }
  }, [checkedState])

  // Wrap the state update function to maintain type safety
  const handleStateUpdate: React.Dispatch<React.SetStateAction<CustomColCheckedState[]>> =
    React.useCallback(
      value => {
        const newState = typeof value === 'function' ? value(localCheckedState) : value

        // Update local state first
        setLocalCheckedState(newState)

        // Update parent state ensuring visibility sync
        setCheckedState(newState)

        // Store current state for comparison
        prevCheckedStateRef.current = newState
      },
      [setCheckedState, localCheckedState],
    )

  const groupedItems = React.useMemo(() => {
    const groups: Record<string, CustomColCheckedState[]> = {}
    localCheckedState.forEach(item => {
      const group = item.group || 'Ungrouped'
      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push({...item}) // Create new reference for each item
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
                setCheckedState={handleStateUpdate}
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
