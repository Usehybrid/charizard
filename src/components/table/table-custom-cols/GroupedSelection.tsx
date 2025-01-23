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
  // Track previous checked state to detect changes
  const prevCheckedStateRef = React.useRef<CustomColCheckedState[]>([])

  // Force re-initialization when structure changes
  React.useEffect(() => {
    if (!checkedState?.length) return

    const prevIds = new Set(prevCheckedStateRef.current.map(item => item.id))
    const currentIds = new Set(checkedState.map(item => item.id))

    const hasStructuralChanges =
      prevCheckedStateRef.current.length !== checkedState.length ||
      ![...currentIds].every(id => prevIds.has(id))

    if (hasStructuralChanges) {
      prevCheckedStateRef.current = structuredClone(checkedState)
    }
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
                setCheckedState={setCheckedState}
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
