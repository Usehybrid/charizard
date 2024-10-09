import {ButtonV2Props} from '../components'

export type DialogFooterButtons = Array<
  Omit<ButtonV2Props, 'children'> & {
    btnText: string
    isLoading?: boolean
    loadingText?: string
  }
>
