import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {FILTER_TYPE, InternalTableFilters} from './types'

// Define SINGLE_VALUE_FILTER_TYPES to categorize the types of filters
export const SINGLE_VALUE_FILTER_TYPES = [FILTER_TYPE.DATE_RANGE, FILTER_TYPE.TAB]

export interface InternalTableStore {
  filters: InternalTableFilters[]
  setDefaultFilters: (filters: InternalTableFilters[]) => void
  addFilters: (filterKey: string, value: string, filterDispatch: any) => void
  changeFiltersDrawer: (filterKey: string, value: string[], filterDispatch: any) => void
  removeFilters: (filterKey: string, value: string, filterDispatch: any) => void
  resetFilters: (filterKey: string, filterDispatch: any) => void
  resetAllFilters: (filterReset?: any) => void
}

export const useTableStore = create<InternalTableStore>()(
  devtools(
    set => ({
      filters: [],
      setDefaultFilters: filters => set({filters}),

      addFilters: (filterKey, value, filterDispatch) =>
        set(state => {
          const filters = state.filters.map(obj => {
            if (obj.key === filterKey) {
              switch (obj.type) {
                case FILTER_TYPE.DATE_RANGE:
                case FILTER_TYPE.TAB: {
                  filterDispatch?.({filterType: filterKey, value})
                  return {...obj, values: value}
                }
                default: {
                  const values = [...obj.values, value]
                  filterDispatch?.({filterType: filterKey, value: values.join(',')})
                  return {...obj, values}
                }
              }
            }
            return obj
          })
          return {filters}
        }),

      changeFiltersDrawer: (filterKey, value, filterDispatch) =>
        set(state => {
          const filters = state.filters.map(obj => {
            if (obj.key === filterKey) {
              const values = [...new Set(value)]
              filterDispatch?.({filterType: filterKey, value: values.join(',')})
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
              switch (obj.type) {
                case FILTER_TYPE.DATE_RANGE:
                case FILTER_TYPE.TAB:
                  return obj
                default: {
                  const values = (obj.values as string[]).filter(objValue => objValue !== value)
                  filterDispatch?.({filterType: filterKey, value: values.join(',')})
                  return {...obj, values}
                }
              }
            }
            return obj
          })
          return {filters}
        }),

      resetFilters: (filterKey, filterDispatch) =>
        set(state => {
          const filters = state.filters.map(obj => {
            if (obj.key === filterKey) {
              filterDispatch?.({filterType: filterKey, value: ''})
              return {
                ...obj,
                values: obj.type && SINGLE_VALUE_FILTER_TYPES.includes(obj.type) ? '' : [],
              }
            }
            return obj
          })
          return {filters}
        }),

      resetAllFilters: filterReset =>
        set(state => ({
          filters: state.filters.map(obj => {
            filterReset?.()
            return {
              ...obj,
              values: obj.type && SINGLE_VALUE_FILTER_TYPES.includes(obj.type) ? '' : [],
            }
          }),
        })),
    }),
    {
      name: 'table-store',
    },
  ),
)
