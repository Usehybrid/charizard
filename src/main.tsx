import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  ButtonVariant,
  Input,
  InputContainer,
  InputGroup,
  InputLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTrigger,
  Progress,
  SegmentedControl,
  Select,
  Table,
} from './components'
import {createColumnHelper} from '@tanstack/react-table'
import {shallow} from 'zustand/shallow'

import randomIcon from './components/assets/check.svg'
import {Tooltip, TooltipContent, TooltipTrigger} from './components/tooltip'
import {SOFTWARE_ACTION_TYPES, useSoftwareStore} from './test'
import {FooterButtons} from './components/modal/ModalFooter'

const styles = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  flexDir: 'column',
}

export interface Software {
  id: string
  notes: string
  description: string
  is_deleted: boolean
  account_manager_name: any
  account_manager_email: any
  software: {
    id: string
    name: string
    logo_url: string
    company_id: any
    created_at: string
    updated_at: string
    is_deleted: boolean
    landing_page_url: any
  }
  software_users: {
    id: string
    last_name: string
    first_name: string
    license_id?: string | null
    profile_img_url: any
    software_tracking_id: string
  }[]
  software_owners: any[]
  software_license: {
    id: string
    cost: number
    seats: number
    status: string
    company_id: string
    created_at: string
    created_by: string
    deleted_by: any
    deleted_on: any
    is_deleted: boolean
    updated_at: any
    user_limit: any
    currency_id: string
    license_name: string
    plan_end_date: string | null
    billing_frequency: string
    pricing_structure: string
    billing_start_date: string
    software_tracking_id: string
  }[]
  created_by: {
    id: string
    first_name: string
    last_name: string
    profile_img_url: string
  }
  archived_by?: {
    id: string
    first_name: string
    last_name: string
    profile_img_url: string
  } | null
  created_at: string
  updated_at: string
  is_archived: boolean
  archived_on?: string | null
  deleted_on: any
  software_license_count: string
  software_users_count: string
}

const data: Software[] = [
  {
    id: 'f8e6f802-c1e8-437f-8507-1d68b1336b37',
    notes: 'Updated Adobde Xd Design',
    description: "This will be used for designing purpose and it's updated",
    is_deleted: false,
    account_manager_name: null,
    account_manager_email: null,
    software: {
      id: 'd8b1ef2e-08d3-4679-a981-61e01615b6bd',
      name: 'Adobe Xd',
      logo_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adobe_XD_CC_icon.svg/1200px-Adobe_XD_CC_icon.svg.png',
      company_id: null,
      created_at: '2023-06-06T12:38:43+00:00',
      updated_at: '2023-06-06T12:38:43+00:00',
      is_deleted: false,
      landing_page_url: null,
    },
    software_users: [
      {
        id: 'eaaf7e87-2995-4e1c-ad9b-9cb230efab07',
        last_name: 'Dhoni',
        first_name: 'Ms',
        license_id: '057aa05d-940e-4f0a-b15e-fa95c28d68e1',
        profile_img_url: null,
        software_tracking_id: 'f8e6f802-c1e8-437f-8507-1d68b1336b37',
      },
    ],
    software_owners: [
      {
        id: 'eaaf7e87-2995-4e1c-ad9b-9cb230efab07',
        last_name: 'Dhoni',
        first_name: 'Ms',
        license_id: '057aa05d-940e-4f0a-b15e-fa95c28d68e1',
        profile_img_url: null,
        software_tracking_id: 'f8e6f802-c1e8-437f-8507-1d68b1336b37',
      },
    ],
    software_license: [
      {
        id: '057aa05d-940e-4f0a-b15e-fa95c28d68e1',
        cost: 432,
        seats: 1,
        status: 'active',
        company_id: '99fe5378-d0da-4735-9167-0ba35578e168',
        created_at: '2023-07-04T13:08:37+00:00',
        created_by: '5a6858d4-9395-45a2-b329-893c82803d6f',
        deleted_by: null,
        deleted_on: null,
        is_deleted: false,
        updated_at: '2023-07-05T19:27:41+00:00',
        user_limit: null,
        currency_id: '2efb576a-be86-44f4-bef3-36ef08d80f77',
        license_name: 'Premium License',
        plan_end_date: null,
        billing_frequency: 'monthly',
        pricing_structure: 'per_seat',
        billing_start_date: '2023-03-20T00:00:00+00:00',
        software_tracking_id: 'f8e6f802-c1e8-437f-8507-1d68b1336b37',
      },
    ],
    created_by: {
      id: '5a6858d4-9395-45a2-b329-893c82803d6f',
      first_name: 'Hybrid',
      last_name: 'Dev ',
      profile_img_url:
        'https://hybrid-dev-test.s3.us-west-2.amazonaws.com/user_document/5a6858d4-9395-45a2-b329-893c82803d6f/T8XYUUcqKQEWsHDblZAdX4AH%40320.png.jpeg',
    },
    archived_by: null,
    created_at: '2023-06-19T05:40:18.000Z',
    updated_at: '2023-06-19T17:41:25.000Z',
    is_archived: false,
    archived_on: null,
    deleted_on: null,
    software_license_count: '1',
    software_users_count: '1',
  },
  {
    id: '963a877a-931c-421a-a070-2693ae69af59',
    notes: 'Ranomd',
    description: 'afasdd',
    is_deleted: false,
    account_manager_name: null,
    account_manager_email: null,
    software: {
      id: '89b6b8d7-c770-457b-808d-93bf12f028ea',
      name: 'Figma',
      logo_url: 'https://miro.medium.com/v2/resize:fit:320/1*j3GPPrDmy2CqnxPw-NtWHg.png',
      company_id: null,
      created_at: '2023-06-06T12:38:43+00:00',
      updated_at: '2023-06-06T12:38:43+00:00',
      is_deleted: false,
      landing_page_url: null,
    },
    software_users: [
      {
        id: 'ba1c3934-0121-44d8-917b-b1b96675d857',
        last_name: 'Emmerich',
        first_name: 'Tristin',
        license_id: null,
        profile_img_url: null,
        software_tracking_id: '963a877a-931c-421a-a070-2693ae69af59',
      },
    ],
    software_owners: [],
    software_license: [],
    created_by: {
      id: '5a6858d4-9395-45a2-b329-893c82803d6f',
      first_name: 'Hybrid',
      last_name: 'Dev ',
      profile_img_url:
        'https://hybrid-dev-test.s3.us-west-2.amazonaws.com/user_document/5a6858d4-9395-45a2-b329-893c82803d6f/T8XYUUcqKQEWsHDblZAdX4AH%40320.png.jpeg',
    },
    archived_by: {
      id: '5a6858d4-9395-45a2-b329-893c82803d6f',
      first_name: 'Hybrid',
      last_name: 'Dev ',
      profile_img_url:
        'https://hybrid-dev-test.s3.us-west-2.amazonaws.com/user_document/5a6858d4-9395-45a2-b329-893c82803d6f/T8XYUUcqKQEWsHDblZAdX4AH%40320.png.jpeg',
    },
    created_at: '2023-06-06T12:59:39.000Z',
    updated_at: '2023-06-19T17:41:25.000Z',
    is_archived: true,
    archived_on: '2023-06-29T19:36:01.000Z',
    deleted_on: null,
    software_license_count: '0',
    software_users_count: '1',
  },
]

const columnHelper = createColumnHelper<Software>()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const getFullName = (owner: any) => {
  if (!owner) return 'N/A'

  return `${owner.first_name} ${owner.last_name}`
}

const menuItems = [
  {
    label: 'Edit details',
    iconSrc: randomIcon,
    onClick: (data: any) => {
      console.log('Editing details', data)
    },
  },
  {
    label: 'Archive',
    iconSrc: randomIcon,
    onClick: (data: any) => {
      console.log('Archiving', data)
    },
  },
]

function App() {
  const [search, setSearch] = React.useState('')

  const columns = [
    columnHelper.accessor('software', {
      header: 'Software Name',
      cell: info => info.getValue().name,
    }),

    columnHelper.accessor('software_owners', {
      header: 'Software Owners',

      cell: info => {
        return <div>{getFullName(info.row.original.software_owners[0])}</div>
      },
      enableSorting: false,
    }),
    columnHelper.accessor('software_users', {
      header: 'Users',
      cell: info => {
        return <div>{info.row.original.software_users_count}</div>
      },
    }),
    columnHelper.accessor('software_license', {
      header: 'Licenses',
      cell: info => {
        return <div>{info.row.original.software_license_count}</div>
      },
    }),
  ]

  const tableFilters = useSoftwareStore(s => s.filters)

  const items = [
    {label: 'Purchase', value: 'purchase', component: <>Purchase</>},
    {label: 'Rental', value: 'rental', component: <>Rental</>},
    {label: 'Lease', value: 'lease', component: <>Lease</>},
  ]

  const options = [
    {label: 'Assigned', value: 'assigned'},
    {label: 'Unassigned', value: 'unassigned'},
    {label: 'Under maintenance', value: 'um'},
  ]

  const buttons: FooterButtons = [
    {variant: ButtonVariant.SECONDARY, onClick: () => {}, btnText: 'Cancel'},
    {variant: ButtonVariant.PRIMARY, onClick: () => {}, btnText: 'Upate'},
  ]

  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div style={styles}>
      <Table
        data={data}
        loaderConfig={{fetchingData: false, text: 'Getting softwares...'}}
        columns={columns}
        searchConfig={{
          search,
          setSearch,
          placeholder: 'Search by software name',
        }}
        filterConfig={{
          filters,
          isLoading: false,
          isError: false,
          filterDispatch: () => {},
          // tableFilters,
          // setDefaultFilters: setDefaultFilters,
          // addFilters: addFilters,
          // removeFilters: removeFilters,
          // resetFilters: resetFilters,
        }}
        sortConfig={{
          sortBy: '',
          setSortBy: () => {},
          sortOrd: '',
          setSortOrd: () => {},
          sortMap: {
            software: 'softwares.names',
          },
        }}
        isCheckboxActions={true}
        isDropdownActions={true}
        actionsConfig={{menuItems}}
        totalText={`${metaData.total_items} softwares`}
      />
      {/* <SegmentedControl items={items} defaultValue="purchase" controlId="control" /> */}

      {/* <Tooltip tooltipId="tooltip">
        <TooltipTrigger>trigger</TooltipTrigger>
        <TooltipContent>content</TooltipContent>
      </Tooltip> */}

      {/* <div style={{display: 'flex', alignItems: 'center'}}>
        <Button.MenuButton menuItems={menuItems} size="sm">
          Add software
        </Button.MenuButton>
        <div style={{marginLeft: '12px'}}>
          <Button.ActionsDropdown
            menuItems={softwareListMenuItems}
            id={'software-list-dropdown-action'}
            size="md"
          />
        </div>
      </div> */}
    </div>
  )
}

const metaData = {
  total_items: 6,
  page_no: 0,
  items_on_page: 3,
}

export const filters = [
  {
    id: 'software-owner',
    name: 'Software Owner',
    key: 'filter_software_owners',
    options: [
      {
        name: 'Owner 1',
        value: 'o1',
      },
      {
        name: 'Figma',
        value: '123-156a',
      },
      {
        name: 'Figma e',
        value: '123-156aadf214',
      },
    ],
  },

  {
    id: 'software-name',
    name: 'Software Name',
    key: 'filter_software_name',
    options: [
      {
        name: 'Maximum',
        value: '123-156afdafd-iohfuitg',
      },
    ],
  },
]
