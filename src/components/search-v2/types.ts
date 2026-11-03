import {InputGroupPropsV2, InputV2Props} from '../input-v2/types'

export interface SearchV2Props extends InputV2Props {
  search?: string
  setSearch?: (value: string) => void
  /** pause before `setSearch` fires, in ms (default 300) */
  debounceMs?: number
  inputGroupProps?: Omit<InputGroupPropsV2, 'children'>
}
