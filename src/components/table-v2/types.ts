export type FilterOptions = {
  id: string
  name: string
  key: string
  options: {
    name: string
    value: string
    country_code?: string
    // custom jsx from api
    customName?: string
  }[]
  config?: {
    hideSearch?: boolean
    placeholder?: string
  }
}

/**
 * @param filters comes from an api, must follow the type definition strictly
 * @param isLoading is fetching from api
 * @param isError api threw error
 * @param filterDispatch must be of @type (value) => dispatch({type,payload})
 * this is used to sync the internal table filter state with the external zustand store of the consumer
 * @param filterReset same type as above but is used to reset all the filters
 * @param headerFilterIds this is used for the filters which should be in the table header itself, and not inside the filters drawer
 *
 *
 */
export type FilterConfig = {
  filters: {
    header?: FilterOptions[]
    drawer?: FilterOptions[]
  }
  isLoading: boolean
  isError: boolean
  filterDispatch: (value: any) => void
  filterReset: (value: any) => void
  headerFilterIds?: string[]
  // todo future apis
  // defaultSelected, same type as InternalTableFilters
}

export type InternalTableFilters = {
  key: string
  values: string[]
}
