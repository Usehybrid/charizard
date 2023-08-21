export type FilterOptions = {
  id: string
  name: string
  key: string
  options: {
    name: string
    value: string
    country_code?: string
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
