import * as React from 'react'
import {InputGroupV2, InputLeftIcon, InputRightIcon, InputV2} from '../input-v2'
import {SearchV2Props} from './types'
import searchIcon from '../assets/search.svg'
import closeIcon from '../assets/close.svg'
import {useDebounce} from '../../utils/hooks/use-debounce'

/**
 * SearchV2 is a customizable search input component that integrates with the `InputV2` component.
 * It includes search and clear icons, and supports controlled and uncontrolled modes for managing the search input value.
 *
 * @param {SearchV2Props} props - The properties for the SearchV2 component.
 * @param {string} [props.search=''] - The current search term value (used in uncontrolled mode).
 * @param {React.Dispatch<React.SetStateAction<string>>} [props.setSearch] - Function to update the search term (used in controlled mode).
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
export function SearchV2({search = '', setSearch, ...props}: SearchV2Props) {
  const [searchTerm, setSearchTerm] = React.useState(search)
  const debouncedSearchTerm = useDebounce(searchTerm as string)
  const isControlled = typeof setSearch === 'function'

  React.useEffect(() => {
    if (isControlled) {
      setSearch(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm, isControlled, setSearch])

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const clearSearchHandler = () => {
    setSearchTerm('')
    if (isControlled) {
      setSearch('')
    }
  }

  return (
    <InputGroupV2>
      <InputLeftIcon icon={searchIcon} />
      <InputV2 {...props} value={searchTerm} onChange={searchHandler} />
      {!!searchTerm.length && <InputRightIcon onClick={clearSearchHandler} icon={closeIcon} />}
    </InputGroupV2>
  )
}
