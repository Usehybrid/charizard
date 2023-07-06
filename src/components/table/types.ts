export type FilterOptions = {
  id: string
  name: string
  config?: {
    hideSearch?: boolean
  }
  options: {
    name: string
    value: string
    checked: boolean
  }[]
}

export type SetFilterOptions = React.Dispatch<React.SetStateAction<FilterOptions[]>>
