import {InputGroupPropsV2, InputV2Props} from '../input-v2/types'

export interface SearchV2Props extends InputV2Props {
  search?: string
  setSearch?: React.Dispatch<React.SetStateAction<string>>
  inputGroupProps?: Omit<InputGroupPropsV2, 'children'>
}
