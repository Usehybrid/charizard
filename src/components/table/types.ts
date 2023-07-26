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

export type FilterConfig = {
  filters?: FilterOptions[]
  isLoading: boolean
  isError: boolean
  filterDispatch: (value: any) => void
  // tableFilters: InternalTableFilters[]
  // setDefaultFilters: SetInternalTableFilters
  // addFilters: (filterKey: string, value: string) => void
  // removeFilters: (filterKey: string, value: string) => void
  // resetFilters: (filterKey: string) => void
  // todo future apis
  // defaultSelected, same type as InternalTableFilters
}

export type InternalTableFilters = {
  key: string
  values: string[]
}

export type SetInternalTableFilters = (filters: InternalTableFilters[]) => void
