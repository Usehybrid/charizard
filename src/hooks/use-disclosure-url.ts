import * as React from 'react'
import {useSearchParams} from 'react-router'

/**
 * Custom hook to control the visibility of a component (like a dialog)
 * based on a URL search parameter.
 * @param paramName The name of the search parameter to control the visibility state. Defaults to 'dialog'.
 * @returns An object containing the dialog's open state, a function to open the dialog, and a function to close the dialog.
 */
export const useDisclosureUrl = (
  paramName: string = 'dialog',
): {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
} => {
  let [searchParams, setSearchParams] = useSearchParams()
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  // Read the initial dialog state from URL search params
  React.useEffect(() => {
    const isDialogOpen = searchParams.get(paramName) === 'true'
    setIsOpen(isDialogOpen)
  }, [searchParams, paramName])

  // Function to open the dialog and update URL
  const onOpen = (): void => {
    const params: URLSearchParams = new URLSearchParams(searchParams.toString())
    params.set(paramName, 'true')
    setSearchParams(params)
  }

  // Function to close the dialog and update URL
  const onClose = (): void => {
    const params: URLSearchParams = new URLSearchParams(searchParams.toString())
    params.delete(paramName)
    setSearchParams(params)
  }

  return {isOpen, onOpen, onClose}
}
