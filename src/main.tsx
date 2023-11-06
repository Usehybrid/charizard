import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import randomIcon from './components/assets/check.svg'
import randomIcon2 from './components/assets/search-2.svg'
import {createColumnHelper} from '@tanstack/react-table'
import {Button, BUTTON_VARIANT, Table} from './components'

const styles = {
  width: '90%',
  margin: 'auto',
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
  status: string
}

const data: Software[] = [
  {
    id: 'f8e6f802-c1e8-437f-8507-1d68b1336b37',
    notes: 'Updated Adobde Xd Design',
    description: 'In transit',
    is_deleted: false,
    status: 'In transit',
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
    status: 'Delivered',
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
    label: 'Allocate',
    iconSrc: randomIcon,
    onClick: (data: any) => {},
    filterFn: (data: any) => {
      return data.software.name === 'Figma'
    },
  },

  {
    label: 'De-allocate',
    iconSrc: randomIcon,
    onClick: (data: any) => {},
  },
  {
    label: 'Archive',
    iconSrc: randomIcon2,
    onClick: (data: any) => {},
  },
]

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
    // size: 80,
  }),
]

function App() {
  const [search, setSearch] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const options = [
    {label: 'one', value: 'one-value'},
    {label: 'two', value: 'two-value'},
    {label: 'three', value: 'three-value'},
    {label: 'four', value: 'four-value'},
  ]

  return (
    <div style={styles}>
      {/* <Table
        data={data}
        loaderConfig={{isFetching: false, isError: false, text: 'Getting employees...'}}
        columns={columns}
        searchConfig={{
          search,
          setSearch,
          placeholder: 'Search your employees',
        }}
        filterConfig={{
          filters,
          isLoading: false,
          isError: false,
          // filterDispatch: value => dispatch({type: SOFTWARE_ACTION_TYPES.FILTER, payload: value}),
          // filterReset: value =>
          //   dispatch({type: SOFTWARE_ACTION_TYPES.RESET_FILTERS, payload: value}),
          filterDispatch: () => {},
          filterReset: () => {},
        }}
        selectorConfig={{
          selectors: [
            {name: 'All devices', onClick: () => {}},
            {name: 'Approved devices', onClick: () => {}},
          ],
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
        rowSelectionConfig={{
          // isRadio: true,
          // isCheckbox: true,
          actions: [
            {
              icon: randomIcon,
              text: 'Archive',
              onClick: () => {},
            },
          ],
        }}
        actionsConfig={{
          menuItems,
          isDropdownActions: true,
          key: 'description',
          // customComp: <div onClick={() => console.log('works')}>View more info</div>,
        }}
        totalText={`${4} softwares`}
        emptyStateConfig={{
          icon: './components/assets/check.svg',
          title: 'Get started by adding your first inventory',
          desc: '',
          btnText: 'add inventory',
          onClick: () => {
            console.log('works')
          },
          columns: 6,
          emptySearchTitle: 'No inventories found',
        }}
      />  */}
      <Button variant={BUTTON_VARIANT.PRIMARY}>Primary</Button>
    </div>
  )
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
        name: 'Owner 2',
        value: 'o2',
      },
      {
        name: 'Owner 3',
        value: 'o3',
      },
      {
        name: 'Owner 4',
        value: 'o4',
      },
      {
        name: 'Owner 5',
        value: 'o5',
      },
      {
        name: 'Owner 6',
        value: 'o6',
      },
      {
        name: 'Owner 7',
        value: 'o7',
      },
      {
        name: 'Figma',
        value: '123-156a',
      },
      {
        name: 'Figma e',
        value: '123-156aadf24',
      },
      {
        name: 'Figma e',
        value: '123-15aadf214',
      },
      {
        name: 'Figma e',
        value: '13-156aadf214',
      },
      {
        name: 'Figma e',
        value: '123-156af24',
      },
      {
        name: 'Figma e',
        value: '23-156aadf214',
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
