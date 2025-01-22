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
  // Keep track of the source of truth for checked state
  const currentStateRef = React.useRef<CustomColCheckedState[]>([])

  React.useEffect(() => {
    // Update ref when checked state changes from parent
    if (JSON.stringify(currentStateRef.current) !== JSON.stringify(checkedState)) {
      currentStateRef.current = checkedState.map(item => ({...item}))
    }
  }, [checkedState])

  const handleCheckboxUpdate = React.useCallback(
    (oldState: CustomColCheckedState[]) => {
      // Create new state array to ensure proper re-render
      const newState = oldState.map(item => ({...item}))
      // Update ref with new state
      currentStateRef.current = newState
      // Update parent state
      setCheckedState(newState)
      return newState
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
      groups[group].push({...item})
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
                setCheckedState={value => {
                  if (typeof value === 'function') {
                    handleCheckboxUpdate(value(checkedState))
                  } else {
                    handleCheckboxUpdate(value)
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
