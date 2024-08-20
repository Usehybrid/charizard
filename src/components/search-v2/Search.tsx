import * as React from 'react'
import {InputGroupV2, InputLeftIcon, InputRightIcon, InputV2} from '../input-v2'
import {SearchV2Props} from './types'
import searchIcon from '../assets/search.svg'
import closeIcon from '../assets/close.svg'
import {useDebounce} from '../../utils/hooks/use-debounce'

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
