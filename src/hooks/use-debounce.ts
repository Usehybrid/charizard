import * as React from 'react'
import {SEARCH_DEBOUNCE_MS} from './use-debounced-search'

export function useDebounce(value: string, delay: number = SEARCH_DEBOUNCE_MS) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
