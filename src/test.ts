// @ts-nocheck
import {create} from 'zustand'
import {InternalTableFilters} from './components/table-legacy/types'

// * software list store

interface SoftwareStore {
  query: SoftwareQueries
  dispatch: (action: {type: SOFTWARE_ACTION_TYPES; payload: Partial<SoftwareQueries>}) => void
  filters: InternalTableFilters[]
  setDefaultFilters: (filters: InternalTableFilters[]) => void
  addFilters: (filterKey: string, value: string) => void
  removeFilters: (filterKey: string, value: string) => void
  resetFilters: (filterKey: string) => void
}

const softwareInitialQueries = {
  filters: {
    is_archived: false,
    filter_software_owners: '',
    filter_software_name: '',
  },
}

export type SoftwareQueries = {
  limit: number
  search: string
  sort_by: string
  sort_order: string
  filters: {
    is_archived: boolean
    filter_software_owners: string
    filter_software_name: string
  }
}

export enum SOFTWARE_ACTION_TYPES {
  SEARCH = 'search',
  SORT_BY = 'sort_by',
  SORT_ORDER = 'sort_order',
  INITIAL_FILTER = 'initial_filter',
  STATUS_FILTER = 'status',
  FILTER = 'filter',
  RESET_FILTERS = 'reset_filters',
}

export const softwareQueryReducer = (query, {payload, type}) => {
  switch (type) {
    case SOFTWARE_ACTION_TYPES.SEARCH:
      return {...query, search: payload}
    case SOFTWARE_ACTION_TYPES.SORT_BY:
      return {...query, sort_by: payload}
    case SOFTWARE_ACTION_TYPES.SORT_ORDER:
      return {...query, sort_order: payload}
    // set selected filters on mount
    case SOFTWARE_ACTION_TYPES.INITIAL_FILTER:
      return {...query, filter: payload}
    case SOFTWARE_ACTION_TYPES.FILTER:
      const {value, filterType} = payload
      return {
        ...query,
        filters: {
          ...query.filters,
          [filterType]: value,
        },
      }
    case SOFTWARE_ACTION_TYPES.RESET_FILTERS:
      return {...query, filters: softwareInitialQueries.filters}
    default:
      throw new Error(`Unhandled action type:${type}`)
  }
}

const softwareQueryDispatcher = (state: SoftwareStore, action) => {
  const updatedQuery = softwareQueryReducer(state.query, action)
  return {
    query: updatedQuery,
  }
}

export const useSoftwareStore = create<SoftwareStore>(set => ({
  query: softwareInitialQueries,
  dispatch: action => set(state => softwareQueryDispatcher(state, action)),
  setDefaultFilters: filters => set({filters}),
  addFilters: (filterKey, value) =>
    set(state => {
      const filters = state.filters.map(obj => {
        if (obj.key === filterKey) {
          return {...obj, values: [...obj.values, value]}
        }
        return obj
      })
      return {filters}
    }),
  removeFilters: (filterKey, value) =>
    set(state => {
      const filters = state.filters.map(obj => {
        if (obj.key === filterKey) {
          return {...obj, values: obj.values.filter(objValue => objValue !== value)}
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
}))

interface TableStore {
  filters: InternalTableFilters[]
  setDefaultFilters: (filters: InternalTableFilters[]) => void
  addFilters: (filterKey: string, value: string) => void
  removeFilters: (filterKey: string, value: string) => void
  resetFilters: (filterKey: string) => void
}

export const useTableStore = create<TableStore>(set => ({
  filters: [],
  setDefaultFilters: filters => set({filters}),
  addFilters: (filterKey, value) =>
    set(state => {
      const filters = state.filters.map(obj => {
        if (obj.key === filterKey) {
          return {...obj, values: [...obj.values, value]}
        }
        return obj
      })
      return {filters}
    }),
  removeFilters: (filterKey, value) =>
    set(state => {
      const filters = state.filters.map(obj => {
        if (obj.key === filterKey) {
          return {...obj, values: obj.values.filter(objValue => objValue !== value)}
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
}))
