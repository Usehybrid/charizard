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
  // store dispatch or react set state
  setFilters: (dispatchPayload: any) => void
  isLoading: boolean
  isError: boolean
  // todo future apis
  // defaultSelected, same type as InternalTableFilters
}

export type InternalTableFilters = {
  key: string
  values: string[]
}

export type SetInternalTableFilters = React.Dispatch<React.SetStateAction<InternalTableFilters[]>>
