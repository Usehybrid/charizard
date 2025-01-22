import * as React from 'react'
import {Table} from '@tanstack/react-table'
import {CustomColCheckedState, TableCustomColumns} from '../types'

interface UseDrawerStateProps {
  table: Table<any>
  columns?: TableCustomColumns
  isPending: boolean
  isError: boolean
  handleSaveColumns: (columns: CustomColCheckedState[]) => Promise<void>
}

export function useDrawerState({
  table,
  columns,
  isPending,
  isError,
  handleSaveColumns,
}: UseDrawerStateProps) {
  // State for the drawer
  const [drawerState, setDrawerState] = React.useState<CustomColCheckedState[]>([])

  // Initial config when columns are loaded
  React.useEffect(() => {
    if (isError || isPending) return
    setDrawerState(columns?.checked_state || [])
  }, [isPending, isError, columns?.checked_state])

  const configureTable = React.useCallback(
    (state: CustomColCheckedState[]) => {
      // Configure column visibility
      state.forEach(obj => {
        const col = table.getColumn(obj.id)
        if (col) {
          col.toggleVisibility(obj.checked)
        }
      })
    },
    [table],
  )

  const handleSave = React.useCallback(async () => {
    try {
      await handleSaveColumns(drawerState)
      configureTable(drawerState)
    } catch (error) {
      console.error('Error saving columns:', error)
      // Reset to original state on error
      setDrawerState(columns?.checked_state || [])
      configureTable(columns?.checked_state || [])
    }
  }, [drawerState, handleSaveColumns, configureTable, columns?.checked_state])

  const handleCancel = React.useCallback(() => {
    // Reset to original state
    setDrawerState(columns?.checked_state || [])
    configureTable(columns?.checked_state || [])
  }, [columns?.checked_state, configureTable])

  return {
    drawerState,
    setDrawerState,
    handleSave,
    handleCancel,
  }
}
