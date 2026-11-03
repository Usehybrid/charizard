import * as React from 'react'

export const SEARCH_DEBOUNCE_MS = 300

/**
 * Keeps a search input's text local and hands it to `setSearch` only once typing pauses, so a
 * server-side search sends one request per pause instead of one per keystroke.
 *
 * - `setSearch` is read through a ref, so an inline arrow (a new function every render) never
 *   re-sends the term, and nothing is sent on mount.
 * - Emptying the input (the clear icon, or deleting the whole term) is sent immediately.
 * - A term equal to the last one sent is not re-sent, so retyping it does not reset the page.
 * - When the parent changes `search` itself (a reset, a restored URL), the input shows it and any
 *   pending term is dropped.
 */
export function useDebouncedSearch(
  search: string | undefined,
  setSearch: ((value: string) => void) | undefined,
  delay: number = SEARCH_DEBOUNCE_MS,
) {
  const [value, setValue] = React.useState(search ?? '')
  const setSearchRef = React.useRef(setSearch)
  // the term the parent holds: either the last one sent, or the last external change seen
  const lastSentRef = React.useRef(search ?? '')
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  React.useLayoutEffect(() => {
    setSearchRef.current = setSearch
  })

  React.useEffect(() => {
    const next = search ?? ''
    // the parent echoing back the term this input sent
    if (next === lastSentRef.current) return
    lastSentRef.current = next
    clearTimeout(timerRef.current)
    setValue(next)
  }, [search])

  React.useEffect(() => () => clearTimeout(timerRef.current), [])

  const send = React.useCallback((next: string) => {
    if (next === lastSentRef.current) return
    lastSentRef.current = next
    setSearchRef.current?.(next)
  }, [])

  const onChange = React.useCallback(
    (next: string) => {
      setValue(next)
      clearTimeout(timerRef.current)
      if (next === '') {
        send('')
        return
      }
      timerRef.current = setTimeout(() => send(next), delay)
    },
    [delay, send],
  )

  const clear = React.useCallback(() => onChange(''), [onChange])

  return {value, onChange, clear}
}
