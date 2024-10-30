import {ButtonV2Props} from '../components'

export type DialogFooterButtons = Array<
  Omit<ButtonV2Props, 'children'> & {
    btnText: string
    isLoading?: boolean
    loadingText?: string
  }
>

export enum DOCS_TYPE {
  USER_DOCS = 'user_document',
  COMPANY_DOCS = 'company_document',
  IDENTIFICATION_DOC = 'identification_document',
  COMMENT_DOCS = 'comment_document',
  ORDER_DOC = 'order_document',
  SOFTWARE_DOCS = 'software_document',
  SOFTWARE_LOGO = 'software_logo',
  INVENTORY_DOCS = 'inventory_document',
  INVENTORY_DOCS_EQUIPMENT = 'equipment',
  INVENTORY_DOCS_FINANCE = 'finance',
  USER_OFFBOARDING_DOCS = 'user_offboarding_document',
  LEAVE_DOCS = 'leave_document',
  INTEGRATION_DOCS = 'integration_document',
  OFFBOARDING_PHOTO_COLLECTION = 'offboarding_photo_collection',
}
