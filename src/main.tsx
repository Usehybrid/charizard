import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import randomIcon from './components/assets/check.svg'
import {createColumnHelper} from '@tanstack/react-table'
import {INV_ACTION_TYPES, useInventoryStore} from './components/table-v2/inventory/inventory.store'
import closeIcon from './components/assets/close.svg'
import {Badge, BADGE_HIGHLIGHT, TableV3, TaskCards} from './components'
import {Pill, PILL_STATUS} from './components'
import {SELECT_VARIANT, SelectV2} from './components/select-v2'
import '@hybr1d-tech/groudon/dist/typography.min.css'
import './components/styles/_variables.css'
import './components/styles/global.css'
import chevronDownIcon from './components/assets/chevron-down-16.svg'
const styles = {
  width: '90%',
  margin: 'auto',
  padding: '0 20px',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // backgroundColor: '#FAFAFB',
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
  {
    id: '963a877a-931c-421a-a070-2693ae69af59999',
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
  {
    id: '963a877a-931c-421a-a070-2693ae69af5939128736',
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

  {
    id: '963a877a-931c-421a-a070-2693ae69af5313dksb',
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
    label: 'Apply leave',
    onClick: (data: any) => {
      console.log(data)
    },
    filterFn: (data: any) => {
      return true
    },
  },

  {
    label: 'Apply Reimbursement',
    onClick: (data: any) => {},
    filterFn: (data: any) => {
      // return false
      return true
    },
  },
  {
    label: 'Archive',
    onClick: (data: any) => {},
    disabled: true,
  },
]

const columns = [
  columnHelper.accessor('software', {
    header: 'Software Name',
    cell: info => info.getValue().name,
    enableHiding: false,
    enableSorting: true,
    enablePinning: true,
    size: 100,
  }),
  columnHelper.accessor('software_owners', {
    header: 'Software Owners',
    cell: info => {
      return <div>{getFullName(info.row.original.software_owners[0])}</div>
    },
    enableHiding: true,
    enableSorting: true,
    size: 100,
  }),
  columnHelper.accessor('software_users', {
    header: 'Users',
    cell: info => {
      return <div>{info.row.original.software_users_count}</div>
    },
    enableHiding: true,
    enableSorting: true,
    size: 100,
  }),
  columnHelper.accessor('software_license', {
    header: 'Licenses',
    cell: info => {
      return <div>{info.row.original.software_license_count}</div>
    },
    enableHiding: true,
    enableSorting: true,
    size: 100,
  }),
]

const tasks = [
  {
    module_id: '3e22329e-2e6c-41f3-a55a-577021d00fa1',
    module_name: 'Attendance',
    module_reference: 'attendance',
    icon_url: 'https://assets.zenadmin.ai/zen-ex-icons/tasks/attendance.svg',
    static_module: true,
    external_link: null,
    form_link: null,
    name: 'Lunch Break',
    date: '10 Apr, 2023, 04:34 PM',
    details: [
      {
        key: 'Raised by',
        value: {
          first_name: 'Hybr1d',
          middle_name: 'hi',
          last_name: 'Dev',
          profile_img_url:
            'https://hybrid-dev-test.s3.us-west-2.amazonaws.com/user_document/undefined/Bertram_Gilfoyle.webp',
          work_email: 'dev@hybr1d.io',
        },
      },
      {
        key: 'Clock In',
        value: '12 PM',
      },
      {
        key: 'Clock Out',
        value: '1 PM',
      },
      {
        key: 'Note',
        value: 'Lunch Break',
      },
      {
        key: 'Cycle',
        value: '24hrs',
      },
    ],
    status: 'Pending',
  },
  {
    module_id: '29f78540-62da-40c8-be56-131522e752d9',
    module_name: 'Leave',
    module_reference: 'leave',
    icon_url: 'https://assets.zenadmin.ai/zen-ex-icons/tasks/leave.svg',
    static_module: true,
    external_link: null,
    form_link: null,
    name: 'Sick Leave',
    date: '10 Apr, 2023, 04:34 PM',
    details: [
      {
        key: 'Raised by',
        value: {
          first_name: 'Hybr1d',
          middle_name: 'hi',
          last_name: 'Dev',
          profile_img_url:
            'https://hybrid-dev-test.s3.us-west-2.amazonaws.com/user_document/undefined/Bertram_Gilfoyle.webp',
          work_email: 'dev@hybr1d.io',
        },
      },
      {
        key: 'Leave Duration',
        value: '3Days',
      },
      {
        key: 'Note',
        value: 'Fever and Cold',
      },
      {
        key: 'Attachment',
        value: null,
      },
    ],
    status: 'Cancelled',
  },
  {
    module_id: '90640ef8-7d4f-4542-8b9b-cfebaf33ecd5',
    module_name: 'IT Request',
    module_reference: 'it-request',
    icon_url: 'https://assets.zenadmin.ai/zen-ex-icons/tasks/it-request.svg',
    static_module: true,
    external_link: null,
    form_link: null,
    name: 'AWS Access',
    date: '10 Apr, 2023, 04:34 PM',
    details: [
      {
        key: 'Raised by',
        value: {
          first_name: 'Hybr1d',
          middle_name: 'hi',
          last_name: 'Dev',
          profile_img_url:
            'https://hybrid-dev-test.s3.us-west-2.amazonaws.com/user_document/undefined/Bertram_Gilfoyle.webp',
          work_email: 'dev@hybr1d.io',
        },
      },
      {
        key: 'Access for',
        value: 'AWS',
      },
      {
        key: 'Access level',
        value: 'user',
      },
      {
        key: 'Request type',
        value: 'Access',
      },
      {
        key: 'Note',
        value: 'To access cloudwatch logs',
      },
    ],
    status: 'Approved',
  },
]
const taskheaders = ['Task', 'Details', 'Status']

const pages = [
  {label: 'Breadcrumb Item 1', to: '/'},
  {label: 'Breadcrumb Item 2', to: '/'},
  {label: 'Breadcrumb Item 3', to: '/'},
  {label: 'Breadcrumb Item 4', to: '/'},
  {label: 'Breadcrumb Item 5', to: '/'},
  {label: 'Breadcrumb Item 6', to: '/'},
  {label: 'Breadcrumb Item 7', to: '/'},
]

const options = [
  {
    value: '1',
    label: 'Full Time',
    // icon: chevronDownIcon,
    profileImgUrl: 'https://picsum.photos/200',
    // subLabel: '3123123213213123',
  },
  {
    value: '2',
    label: 'Part Time',
    // icon: chevronDownIcon,
    profileImgUrl: 'https://picsum.photos/200',
    // subLabel: '3123123213213123',
  },
  {
    value: '3',
    label: 'Fixed Term',
    // icon: chevronDownIcon,
    profileImgUrl: 'https://picsum.photos/200',
    // subLabel: '3123123213213123',
  },
  {
    value: '4',
    label: 'Internship',
    // icon: chevronDownIcon,
    profileImgUrl: 'https://picsum.photos/200',
    // subLabel: '3123123213213123',
  },
]

function App() {
  const [search, setSearch] = React.useState('')

  const query = useInventoryStore(s => s.query)
  const dispatch = useInventoryStore(s => s.dispatch)

  // console.log(query.limit)

  return (
    <div style={styles}>
      {/* <TableV3
        data={data}
        loaderConfig={{isFetching: false, isError: false, text: 'Getting employees...'}}
        columns={columns}
        searchConfig={{
          search,
          setSearch,
          placeholder: 'Search your employees',
        }}
        filterConfig={{
          filters: filtersV2,
          isLoading: false,
          isError: false,
          // filterDispatch: value => dispatch({type: SOFTWARE_ACTION_TYPES.FILTER, payload: value}),
          // filterReset: value =>
          //   dispatch({type: SOFTWARE_ACTION_TYPES.RESET_FILTERS, payload: value}),
          filterDispatch: value => dispatch({type: INV_ACTION_TYPES.FILTER, payload: value}),
          filterReset: () => dispatch({type: INV_ACTION_TYPES.RESET_FILTERS, payload: null}),
        }}
        sortConfig={{
          sortBy: query.sort_by,
          sortOrd: query.sort_order,
          setSortBy: (value: any) => dispatch({type: INV_ACTION_TYPES.SORT_BY, payload: value}),
          setSortOrd: (value: any) => dispatch({type: INV_ACTION_TYPES.SORT_ORDER, payload: value}),
          sortMap: {
            software: 'softwares',
            software_owners: 'software_owners',
            software_users: 'software_users',
            software_license: 'software_license',
          },
        }}
        paginationConfig={{
          page: query.page,
          limit: query.limit,
          setPage: value => dispatch({type: INV_ACTION_TYPES.PAGE, payload: value}),
          setLimit: value => dispatch({type: INV_ACTION_TYPES.LIMIT, payload: value}),
          metaData: {
            total_items: 1000,
            page_no: 0,
            items_on_page: 10,
          },
          defaultLimit: '20',
        }}
        rowSelectionConfig={{
          // isRadio: true,
          entityName: 'Software',
          isCheckbox: true,
          rowIdKey: 'id',
          actions: [
            {
              icon: randomIcon,
              text: 'Action 1',
              onClick: () => {
                console.log('action 1 clicked')
              },
            },

            {
              icon: randomIcon,
              text: 'Action 2',
              onClick: () => {
                console.log('action 2 clicked')
              },
            },

            {
              icon: randomIcon,
              text: 'Action 3',
              onClick: () => {
                console.log('action 3 clicked')
              },
            },
          ],
          // rowIdKey: 'id',
        }}
        actionsConfig={{
          menuItems,
          isDropdownActions: true,
        }}
        totalText={`${4} Softwares`}
        emptyStateConfig={{
          icon: './components/assets/check.svg',
          title: 'Get started by adding your first inventory',
          desc: '',
          btnText: 'add inventory',
          onClick: () => {},
          columns: 6,
          emptySearchTitle: 'No inventories found',
        }}
        customColumnConfig={{
          description: 'Configure inventory columns',
          columns: cols,
          isPending: false,
          isError: false,
          handleSaveColumns: async (columns: any) => {
            await Promise.resolve(() => {
              console.log('test')
            })
          },
        }}
        tableStyleConfig={{stickyIds: ['software'], maxHeight: '200px'}}
      /> */}

      <TaskCards
        headers={taskheaders}
        data={tasks}
        // data={[]}
      />
      {/* <Pill status={PILL_STATUS.WARNING}>420</Pill> */}
      {/* <SelectV2
        options={options}
        onChange={(value, meta) => {
          console.log({value, meta})
        }}
        isLoading
        errorMsg="something went wrong"
        variant={SELECT_VARIANT.USERS}
        isMulti
      /> */}
    </div>
  )
}

const cols = {
  checked_state: [
    {
      id: 'location',
      label: 'Location',
      checked: true,
    },
    {
      id: 'compliant',
      label: 'Compliant',
      checked: true,
    },
    {
      id: 'encrypted',
      label: 'Encrypted',
      checked: true,
    },
    {
      id: 'operating_system',
      label: 'Operating System',
      checked: true,
    },
    {
      id: 'manufacturer',
      label: 'Manufacturer',
      checked: true,
    },
    {
      id: 'allocated_to',
      label: 'Allocated to',
      checked: true,
    },
    {
      id: 'imei_1',
      label: 'IMEI 1',
      checked: true,
    },
    {
      id: 'last_checked_at',
      label: 'Last Active',
      checked: true,
    },
    {
      id: 'device_status',
      label: 'Device Status',
      checked: true,
    },
    {
      id: 'ram',
      label: 'RAM',
      checked: true,
    },
    {
      id: 'enrollment_status',
      label: 'Enrollment Status',
      checked: true,
    },
    {
      id: 'total_storage',
      label: 'Total Storage',
      checked: true,
    },
    {
      id: 'battery_level',
      label: 'Battery Level',
      checked: true,
    },
    {
      id: 'wifi_mac',
      label: 'Wifi Mac',
      checked: true,
    },
    {
      id: 'available_storage',
      label: 'Available Storage',
      checked: true,
    },
    {
      id: 'os_version',
      label: 'OS Version',
      checked: true,
    },
    {
      id: 'build_version',
      label: 'Build Version',
      checked: true,
    },
    {
      id: 'wifi_ssid',
      label: 'Wifi ssid',
      checked: true,
    },
    {
      id: 'security_pin',
      label: 'Security Pin',
      checked: true,
    },
  ],
  is_default: false,
  table_name: 'mdm_devices',
}

const filtersV2 = {
  header: [
    {
      id: 'inventory-status',
      name: 'Status',
      key: 'filter_status',
      options: [
        {
          value: 'assigned',
          name: 'Assigned',
        },
        {
          value: 'unassigned',
          name: 'Unassigned',
        },
        {
          value: 'under_maintenance',
          name: 'Under Maintenance',
        },
        {
          value: 'in_transition',
          name: 'In Transition',
        },
      ],
      config: {
        hideSearch: true,
        placeholder: 'Search status',
      },
    },
    {
      id: 'inventory-status2',
      name: 'Status',
      key: 'filter_status',
      options: [
        {
          value: 'assigned',
          name: 'Assigned',
        },
        {
          value: 'unassigned',
          name: 'Unassigned',
        },
        {
          value: 'under_maintenance',
          name: 'Under Maintenance',
        },
        {
          value: 'in_transition',
          name: 'In Transition',
        },
      ],
      config: {
        hideSearch: true,
        placeholder: 'Search status',
      },
    },
  ],
  drawer: [
    {
      id: 'inventory-type',
      name: 'Type',
      key: 'filter_type',
      options: [
        {
          name: 'Laptops',
          value: '4fc805cc-d453-4f40-87d4-57185333eac1',
        },
        {
          name: 'Headsets',
          value: 'f497c3da-9751-48c9-8f07-e59dca26b688',
        },
        {
          name: 'Routers',
          value: '2d7ab2b4-4d5f-450a-836d-3f562b348e3b',
        },
        {
          name: 'Mouses',
          value: '3beeb99a-60af-4c12-9e19-4b81b2fb7760',
        },
        {
          name: 'Peripheral devices',
          value: '5c6516bd-fcc0-4991-ab7f-1aa86b5d5eee',
        },
        {
          name: 'Monitors',
          value: '7b846171-486b-4c8e-b5df-9cc063a1eb36',
        },
        {
          name: 'Printers',
          value: '96cfcc5e-5099-4a7b-b36b-0f9e1391f9a9',
        },
        {
          name: 'Trackpads',
          value: 'b1307d3c-7170-4f4c-960e-b1a36bb7b8a6',
        },
        {
          name: 'Keyboards',
          value: '5fda988d-9ea4-4db3-931d-2a1b3ac9ebed',
        },
        {
          name: 'Tablets',
          value: 'd65398b7-efec-4969-82b0-d8984fba5160',
        },
        {
          name: 'Microphones',
          value: 'ed3484eb-8fc3-4b4b-b41d-5de83cf26821',
        },
        {
          name: 'Webcams',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d',
        },
        {
          name: 'Webcams1',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d1',
        },
        {
          name: 'Webcams2',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d2',
        },
        {
          name: 'Webcams3',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d3',
        },
        {
          name: 'Webcams4',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d4',
        },
        {
          name: 'Webcams5',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d5',
        },
        {
          name: 'Webcams6',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d6',
        },
        {
          name: 'Webcams7',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d7',
        },
        {
          name: 'Webcams8',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d8',
        },
        {
          name: 'Webcams9',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d9',
        },
        {
          name: 'Webcams10',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d10',
        },
        {
          name: 'Webcams11',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d11',
        },
        {
          name: 'Webcams12',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d12',
        },
        {
          name: 'Webcams13',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d13',
        },
        {
          name: 'Webcams14',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d14',
        },
        {
          name: 'Webcams15',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d15',
        },
        {
          name: 'Webcams16',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d16',
        },
        {
          name: 'Webcams17',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d17',
        },
        {
          name: 'Webcams18',
          value: 'ef2e6a9e-e3c4-492d-9630-7f2170715a5d18',
        },
      ],
      config: {
        hideSearch: false,
        placeholder: 'Search asset types',
      },
    },
    {
      id: 'inventory-brand',
      name: 'Brand',
      key: 'filter_brand',
      options: [
        {
          name: 'Apple',
          value: '971b5fd2-a20e-4639-9fb7-dde915c13534',
        },
        {
          name: 'Acer',
          value: 'f76e669c-78b0-4b7b-93a5-37a5bfa4d29c',
        },
        {
          name: 'Samsung',
          value: '74b0f28e-57e8-4e5e-8e2f-19fe3e475970',
        },
        {
          name: 'Benq',
          value: '6b7328d2-780d-486a-ad17-65e3cb1364bd',
        },
        {
          name: 'Hp',
          value: '6ccd7d42-27c0-47c0-bbae-b750046a19b9',
        },
        {
          name: 'Asus',
          value: '53666b40-bb23-40ba-a950-b5be8dac65f1',
        },
        {
          name: 'Lenovo',
          value: 'b9badb8e-61bf-4200-83f9-5b63f03915ce',
        },
        {
          name: 'Microsoft',
          value: '97d48a36-a958-45c8-85e1-1ad61baf85b4',
        },
        {
          name: 'Dell',
          value: 'e533b40a-e3ac-4001-9f4f-6dc05b2b6197',
        },
        {
          name: 'Xiaomi',
          value: '855df100-0d07-4e73-bc04-846df8a5fc2a',
        },
        {
          name: 'Compaq',
          value: 'cdb744a5-2db8-41d3-b7a4-4cc301f91ba4',
        },
        {
          name: 'Plantronics',
          value: '6cf35b74-8612-436f-995e-94ac98be2ad9',
        },
        {
          name: 'DELL',
          value: '7ca47c47-1f6f-4f0d-80c8-745485c6c98e',
        },
        {
          name: 'Iball',
          value: '1869df28-e6b9-48ae-83b5-ab67e0bdfa90',
        },
        {
          name: 'LINKQNET',
          value: '3fbc8042-6c9d-479b-bd79-c806cb657e64',
        },
        {
          name: 'Logitech',
          value: '64ff36ab-6234-4f1a-9f22-93e5ce9124ef',
        },
      ],
      config: {
        hideSearch: true,
        placeholder: 'Search brands',
      },
    },
    {
      id: 'inventory-country',
      name: 'Country',
      key: 'filter_country',
      options: [
        {
          value: 'c05429a4-f8d5-4284-9b9a-ba40e35879b7',
          name: 'India',
          country_code: 'IN',
        },
        {
          value: 'f0270896-0ab1-46f2-8925-a9072a21113c',
          name: 'Indonesia',
          country_code: 'ID',
        },
        {
          value: 'abdadf28-76e0-412e-ad18-068dfbe43ec9',
          name: 'Afghanistan',
          country_code: 'AF',
        },
        {
          value: 'cc6ba9d9-dabc-4ab4-9d7a-bd6444236a52',
          name: 'Argentina',
          country_code: 'AR',
        },
        {
          value: 'e7ed5bc5-b286-4a45-a07b-d85d53f848dc',
          name: 'United Kingdom',
          country_code: 'GB',
        },
        {
          value: '38fa6b25-7709-41b3-8dca-a27c3747520c',
          name: 'Aland Islands',
          country_code: 'AX',
        },
        {
          value: '9ba0db04-6264-41d3-8d26-39b9c6b90f41',
          name: 'Albania',
          country_code: 'AL',
        },
        {
          value: 'bbf59d1e-4d91-4b09-b018-3a16a14aaf5f',
          name: 'Singapore',
          country_code: 'SG',
        },
        {
          value: '0f7540d0-1abd-4605-a7a4-834b6c834688',
          name: 'Hong Kong',
          country_code: 'HK',
        },
        {
          value: 'd8f3d737-401a-4530-9984-0a88b79b9ac6',
          name: 'Benin',
          country_code: 'BJ',
        },
        {
          value: '47cf3af5-2c13-42bb-ad0c-bca7d5ec8dff',
          name: 'Armenia',
          country_code: 'AM',
        },
        {
          value: '896d0896-3f2b-4f1d-be9b-ff22335bf5c1',
          name: 'Kyrgyzstan',
          country_code: 'KG',
        },
        {
          value: '464dea8b-8fc7-4d69-af22-035768ee3839',
          name: 'Kazakhstan',
          country_code: 'KZ',
        },
        {
          value: '32aa4257-1d07-4975-ada0-93300229e6c2',
          name: 'Costa Rica',
          country_code: 'CR',
        },
        {
          value: '586ef8eb-85c8-4093-a07a-d5c02d020d89',
          name: 'Barbados',
          country_code: 'BB',
        },
      ],
      config: {
        hideSearch: false,
        placeholder: 'Search countries',
      },
    },
  ],
}
