import * as React from 'react'
import CustomColCheckbox from './CustomColCheckbox'
import classes from './table-custom-cols.module.css'
import {CustomColCheckedState} from '../types'

interface GroupedSelectionProps {
  checkedState: CustomColCheckedState[]
  setCheckedState: React.Dispatch<React.SetStateAction<CustomColCheckedState[]>>
  search: string
}

export const GroupedSelection = React.forwardRef<{applyChanges: () => void}, GroupedSelectionProps>(
  ({checkedState, setCheckedState, search}, ref) => {
    // Create drawer-specific state
    const [drawerState, setDrawerState] = React.useState<CustomColCheckedState[]>([])

    // Initialize drawer state when component mounts or checkedState changes
    React.useEffect(() => {
      setDrawerState(checkedState.map(item => ({...item})))
    }, [checkedState])

    // Handle checkbox changes within drawer
    const handleCheckboxUpdate = React.useCallback((id: string, value: boolean) => {
      setDrawerState(prev => {
        const newState = prev.map(item => ({...item}))
        const index = newState.findIndex(item => item.id === id)

        if (id === 'all') {
          return newState.map(item => ({...item, checked: value}))
        }

        if (index !== -1) {
          newState[index] = {...newState[index], checked: value}
        }
        return newState
      })
    }, [])

    const groupedItems = React.useMemo(() => {
      const groups: Record<string, CustomColCheckedState[]> = {}
      drawerState.forEach(item => {
        const group = item.group || 'Ungrouped'
        if (!groups[group]) {
          groups[group] = []
        }
        groups[group].push({...item})
      })
      return groups
    }, [drawerState])

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

    // Function to apply changes when saving
    const applyChanges = React.useCallback(() => {
      setCheckedState(drawerState)
    }, [drawerState, setCheckedState])

    // Expose applyChanges to parent
    React.useImperativeHandle(
      ref,
      () => ({
        applyChanges,
      }),
      [applyChanges],
    )

    // Calculate "All" checked state for each group
    const getGroupCheckedState = React.useCallback((items: CustomColCheckedState[]) => {
      const allChecked = items.every(item => item.checked)
      const someChecked = items.some(item => item.checked)
      return {checked: allChecked, indeterminate: someChecked && !allChecked}
    }, [])

    return (
      <>
        {Object.entries(filteredGroups).map(([group, items]) => {
          const groupState = getGroupCheckedState(items)

          return (
            <div key={group}>
              <h3 className={classes.groupTitle}>{group}</h3>
              <div className={classes.option}>
                <CustomColCheckbox
                  label="All"
                  id={`${group}-all`}
                  checked={groupState.checked}
                  setCheckedState={() => {
                    const newCheckedState = !groupState.checked
                    items.forEach(item => {
                      handleCheckboxUpdate(item.id, newCheckedState)
                    })
                  }}
                />
              </div>
              {items.map(item => (
                <div key={item.id} className={classes.option}>
                  <CustomColCheckbox
                    label={item.label}
                    id={item.id}
                    checked={item.checked}
                    setCheckedState={(value: any) => {
                      if (typeof value === 'function') {
                        const newState = value(drawerState)
                        if (Array.isArray(newState)) {
                          const foundItem = newState.find(i => i.id === item.id)
                          if (foundItem) {
                            handleCheckboxUpdate(item.id, foundItem.checked)
                          }
                        }
                      } else if (Array.isArray(value)) {
                        const foundItem = value.find(i => i.id === item.id)
                        if (foundItem) {
                          handleCheckboxUpdate(item.id, foundItem.checked)
                        }
                      } else {
                        handleCheckboxUpdate(item.id, value)
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          )
        })}
      </>
    )
  },
)

GroupedSelection.displayName = 'GroupedSelection'
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
