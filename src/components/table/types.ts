export type FilterOptions = {
  id: string
  name: string
  key: string
  options: {
    name: string
    value: string
  }[]
  config?: {
    hideSearch?: boolean
  }
}

/**
 * @param filters comes from an api, must follow the type definition strictly
 * @param isLoading is fetching from api
 * @param isError api threw error
 * @param filterDispatch must be of @type (value) => dispatch({type,payload})
 * this is used to sync the internal table filter state with the external zustand store of the consumer
 * @param filterReset same type as above but is used to reset all the filters
 *
 *
 */
export type FilterConfig = {
  filters: FilterOptions[]
  isLoading: boolean
  isError: boolean
  filterDispatch: (value: any) => void
  filterReset: (value: any) => void
  // todo future apis
  // defaultSelected, same type as InternalTableFilters
}

export type InternalTableFilters = {
  key: string
  values: string[]
}

export type SetInternalTableFilters = (filters: InternalTableFilters[]) => void

const d = {
  id: 'inventory-brand',
  name: 'Inventory Brand',
  key: 'filter_brand',
  options: [
    {
      name: 'Apple',
      value: '971b5fd2-a20e-4639-9fb7-dde915c13534',
    },
  ],
  config: {
    hideSearch: true,
  },
}
