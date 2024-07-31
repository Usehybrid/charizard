import {create} from 'zustand'

// * inventory list store
interface InventoryStore {
  query: InventoryQueries
  dispatch: (action: {type: INV_ACTION_TYPES; payload: string | number | null}) => void
}

const invInitialQueries = {
  page: 0,
  limit: 20,
  search: '',
  sort_by: '',
  sort_order: '' as '' | 'asc' | 'desc',
  filters: {
    filter_type: '',
    filter_brand: '',
    filter_country: '',
    filter_status: '',
  },
}

export type InventoryQueries = typeof invInitialQueries

export enum INV_ACTION_TYPES {
  SEARCH = 'search',
  SORT_BY = 'sort_by',
  SORT_ORDER = 'sort_order',
  INITIAL_FILTER = 'initial_filter',
  STATUS_FILTER = 'status',
  FILTER = 'filter',
  RESET_FILTERS = 'reset_filters',
  RESET_ALL = 'reset_all',
  SELECTOR_FILTER = 'selector_filter',
  PAGE = 'page',
  LIMIT = 'limit',
}

// @ts-ignore
export const invQueryReducer = (query, {payload, type}) => {
  switch (type) {
    case INV_ACTION_TYPES.SEARCH:
      return {...query, search: payload}
    case INV_ACTION_TYPES.SORT_BY:
      return {...query, sort_by: payload}
    case INV_ACTION_TYPES.SORT_ORDER:
      return {...query, sort_order: payload}
    // set selected filters on mount
    case INV_ACTION_TYPES.INITIAL_FILTER:
      return {...query, filter: payload}
    case INV_ACTION_TYPES.FILTER:
      const {value, filterType} = payload
      return {
        ...query,
        page: 0,
        filters: {
          ...query.filters,
          [filterType]: value,
        },
      }
    case INV_ACTION_TYPES.RESET_FILTERS:
      return {...query, filters: invInitialQueries.filters}
    case INV_ACTION_TYPES.RESET_ALL:
      return invInitialQueries
    case INV_ACTION_TYPES.SELECTOR_FILTER:
      return {
        ...query,
        filters: {
          ...query.filters,
          filter_status: payload,
        },
      }
    case INV_ACTION_TYPES.PAGE:
      return {...query, page: payload}
    case INV_ACTION_TYPES.LIMIT:
      return {...query, limit: payload}
    default:
      throw new Error(`Unhandled action type:${type} in inventory query reducer`)
  }
}
// @ts-ignore
const invQueryDispatcher = (state: InventoryStore, action) => {
  const updatedQuery = invQueryReducer(state.query, action)
  return {
    query: updatedQuery,
  }
}

export const useInventoryStore = create<InventoryStore>(set => ({
  query: invInitialQueries,
  dispatch: action => set(state => invQueryDispatcher(state, action)),
}))
