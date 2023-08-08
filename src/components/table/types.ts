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
