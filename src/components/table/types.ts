import {DateRangePickerProps} from '../date-picker/type'

export type FilterOptions = {
  id: string
  name: string
  key: string
  type?: FILTER_TYPE
  options: {
    name: string
    value: string
    country_code?: string
    // custom jsx from api
    customName?: string
  }[]
  config?: MenuConfig | DateConfig
}

export type MenuConfig = {
  hideSearch?: boolean
  placeholder?: string
  type?: string
}

export type DateConfig = Partial<DateRangePickerProps>

export enum FILTER_TYPE {
  DATE_RANGE = 'date_range',
  MENU = 'menu',
  TAB = 'tab',
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
  initialFilters?: {
    [key: string]: string | string[]
  }
  filters?: TableFilters
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
  values: string[] | string
  type?: FILTER_TYPE
}

export type TableFilters = {
  header?: FilterOptions[]
  drawer?: FilterOptions[]
}

export type TableCustomColumns = {
  checked_state: Array<{id: string; label: string; checked: boolean; group?: string}>
  is_default: boolean
  table_name: string
}
