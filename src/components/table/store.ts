import {create} from 'zustand'
import {InternalTableFilters} from './types'
import {devtools} from 'zustand/middleware'

export interface TableStore {
  filters: InternalTableFilters[]
  setDefaultFilters: (filters: InternalTableFilters[]) => void
  addFilters: (filterKey: string, value: string, filterDispatch?: any) => void
  removeFilters: (filterKey: string, value: string, filterDispatch?: any) => void
  resetFilters: (filterKey: string) => void
  resetAllFilters: () => void
}

export const useTableStore = create<TableStore>()(
  devtools(set => ({
    filters: [],
    setDefaultFilters: filters => set({filters}),
    addFilters: (filterKey, value, filterDispatch) =>
      set(state => {
        const filters = state.filters.map(obj => {
          if (obj.key === filterKey) {
            const values = [...obj.values, value]
            if (typeof filterDispatch === 'function') {
              filterDispatch({filterType: filterKey, value: values.join(',')})
            }
            return {...obj, values}
          }
          return obj
        })
        return {filters}
      }),
    removeFilters: (filterKey, value, filterDispatch) =>
      set(state => {
        const filters = state.filters.map(obj => {
          if (obj.key === filterKey) {
            const values = obj.values.filter(objValue => objValue !== value)

            if (typeof filterDispatch === 'function') {
              filterDispatch({filterType: filterKey, value: values.join(',')})
            }
            return {...obj, values}
          }
          return obj
        })
        return {filters}
      }),
    resetFilters: filterKey =>
      set(state => {
        const filters = state.filters.map(obj => {
          if (obj.key === filterKey) {
            return {...obj, values: []}
          }
          return obj
        })
        return {filters}
      }),
    resetAllFilters: () =>
      set(state => ({filters: state.filters.map(obj => ({...obj, values: []}))})),
  })),
)
