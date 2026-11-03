import {InputGroupV2, InputLeftIcon, InputRightIcon, InputV2} from '../input-v2'
import {SearchV2Props} from './types'
import searchIcon from '../assets/search.svg'
import closeIcon from '../assets/close.svg'
import {useDebouncedSearch} from '../../hooks'

/**
 * SearchV2 is a customizable search input component that integrates with the `InputV2` component.
 * It includes search and clear icons, and supports controlled and uncontrolled modes for managing the search input value.
 *
 * @param {SearchV2Props} props - The properties for the SearchV2 component.
 * @param {string} [props.search=''] - The current search term value (used in uncontrolled mode).
 * @param {(value: string) => void} [props.setSearch] - Receives the term once typing pauses (controlled mode). An emptied input is sent at once.
 * @param {number} [props.debounceMs=300] - Pause before `setSearch` fires, in ms.
 * @param {InputV2Props} [props] - Additional properties to pass to the `InputV2` component.
 * @returns {JSX.Element} The rendered SearchV2 component.
 *
 * @example
 * <SearchV2
 *   search={searchTerm}
 *   setSearch={setSearchTerm}
 *   placeholder="Search..."
 * />
 */
export function SearchV2({
  search = '',
  setSearch,
  debounceMs,
  inputGroupProps = {},
  ...props
}: SearchV2Props) {
  const {value, onChange, clear} = useDebouncedSearch(search, setSearch, debounceMs)

  return (
    <InputGroupV2 {...inputGroupProps}>
      <InputLeftIcon icon={searchIcon} />
      <InputV2 {...props} value={value} onChange={e => onChange(e.target.value)} />
      {value && <InputRightIcon onClick={clear} icon={closeIcon} />}
    </InputGroupV2>
  )
}
