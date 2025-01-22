import * as React from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {Table} from '@tanstack/react-table'
import {CustomColCheckedState} from '../types'

interface UseColumnVisibilityProps {
  table: Table<any>
  checkedState: CustomColCheckedState[]
  setCheckedState: React.Dispatch<React.SetStateAction<CustomColCheckedState[]>>
}

export function useColumnVisibility({
  table,
  checkedState,
  setCheckedState,
}: UseColumnVisibilityProps) {
  const initialStateRef = React.useRef<CustomColCheckedState[]>([])
  const [isInitialized, setIsInitialized] = React.useState(false)

  // Store initial state
  React.useEffect(() => {
    if (checkedState.length && !initialStateRef.current.length) {
      initialStateRef.current = checkedState
    }
  }, [checkedState])

  // Sync column visibility with checked state
  useDeepCompareEffect(() => {
    if (!checkedState.length || !isInitialized) return

    // Batch visibility updates
    const updates = checkedState.map(column => {
      const tableColumn = table.getColumn(column.id)
      return {column: tableColumn, visible: column.checked}
    })

    // Apply all updates at once
    updates.forEach(({column, visible}) => {
      if (column) {
        column.toggleVisibility(visible)
      }
    })
  }, [checkedState, table])

  // Handle column visibility changes
  const handleColumnVisibilityChange = React.useCallback(
    (columnId: string, isVisible: boolean) => {
      setCheckedState(prev => {
        const newState = [...prev]
        const columnIndex = newState.findIndex(col => col.id === columnId)
        if (columnIndex !== -1) {
          newState[columnIndex] = {...newState[columnIndex], checked: isVisible}

          // Also update the column visibility immediately
          const tableColumn = table.getColumn(columnId)
          if (tableColumn) {
            tableColumn.toggleVisibility(isVisible)
          }
        }
        return newState
      })
    },
    [setCheckedState, table],
  )

  // Initialize visibility tracking
  React.useEffect(() => {
    if (checkedState.length && !isInitialized) {
      // Batch initial visibility setup
      checkedState.forEach(column => {
        const tableColumn = table.getColumn(column.id)
        if (tableColumn) {
          tableColumn.toggleVisibility(column.checked)
        }
      })
      setIsInitialized(true)
    }

    // Cleanup function
    return () => {
      if (initialStateRef.current.length) {
        // Restore initial state on unmount
        initialStateRef.current.forEach(column => {
          const tableColumn = table.getColumn(column.id)
          if (tableColumn) {
            tableColumn.toggleVisibility(column.checked)
          }
        })
      }
    }
  }, [checkedState, table, isInitialized])

  return {handleColumnVisibilityChange}
}
