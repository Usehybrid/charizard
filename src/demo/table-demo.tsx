import * as React from 'react'
import randomIcon from '../components/assets/check.svg'
import {createColumnHelper} from '@tanstack/react-table'
import {DEFAULT_LIMIT, DEFAULT_PAGE, Table, TABLE_ACTION_TYPES, TableTagsCell} from '../components'
import {FILTER_TYPE} from '../components/table/types'
import {createTableStore} from '../utils/table'

// * Inventory List Store
export const invInitialQueries = {
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
  search: '',
  sort_by: '',
  sort_order: '',
  filters: {
    filter_type: '',
    filter_brand: '',
    filter_country: '',
    filter_status: '',
    filter_mdm_enrolled: '',
    filter_ram: '',
    filter_storage: '',
    filter_processor: '',
    filter_procurement_type: '',
    filter_procurement_from: '',
    filter_model: '',
    filter_device_location: '',
    filter_device_grading: '',
  },
}

export type InventoryQueries = typeof invInitialQueries
export const useInventoryStore = createTableStore(invInitialQueries)

export function TableDemo() {
  const [search, setSearch] = React.useState('')
  const query = useInventoryStore(s => s.query)
  const dispatch = useInventoryStore(s => s.dispatch)

  return (
    <Table
      data={data}
      loaderConfig={{isFetching: false, isError: false, text: 'Getting employees...'}}
      columns={columns}
      searchConfig={{
        search,
        setSearch,
        placeholder: 'Search your employees',
      }}
      filterConfig={{
        initialFilters: query.filters,
        filters: filtersV2,
        isLoading: false,
        isError: false,
        filterDispatch: value => dispatch({type: TABLE_ACTION_TYPES.FILTER, payload: value}),
        filterReset: () => dispatch({type: TABLE_ACTION_TYPES.RESET_FILTERS, payload: null}),
      }}
      sortConfig={{
        sortBy: query.sort_by,
        sortOrd: query.sort_order as any,
        setSortBy: (value: any) => dispatch({type: TABLE_ACTION_TYPES.SORT_BY, payload: value}),
        setSortOrd: (value: any) => dispatch({type: TABLE_ACTION_TYPES.SORT_ORDER, payload: value}),
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
        setPage: value => dispatch({type: TABLE_ACTION_TYPES.PAGE, payload: value}),
        setLimit: value => dispatch({type: TABLE_ACTION_TYPES.LIMIT, payload: value}),
        // metaData: {
        //   total_items: 1000,
        //   page_no: 0,
        //   items_on_page: 25,
        // },
        metaData: {
          total_items: 181,
          page_no: 1,
          items_on_page: 81,
        },
      }}
      rowSelectionConfig={{
        entityName: 'Software',
        // isRadio: true,
        isCheckbox: true,
        rowIdKey: 'id',
        actions: [
          {
            iconSrc: randomIcon,
            label: 'Action 1',
            onClick: () => {
              console.log('action 1 clicked')
            },
          },

          {
            iconSrc: randomIcon,
            label: 'Action 2',
            onClick: () => {
              console.log('action 2 clicked')
            },
          },

          {
            iconSrc: randomIcon,
            label: 'Action 3',
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
        btnText: 'add inventory',
        onClick: () => {},
      }}
      customColumnConfig={{
        columns: cols,
        isPending: false,
        isError: false,
        handleSaveColumns: async () => {
          await Promise.resolve(() => {
            console.log('test')
          })
        },
        variant: 'selection',
      }}
      tableStyleConfig={{stickyIds: ['software'], maxHeight: '200px'}}
      exportConfig={{
        isPending: false,
        isError: false,
        handleExport: (...args: any[]) => {
          console.log(args)
          console.log('export works')
        },
      }}
    />
  )
}

const menuItems = [
  {
    label: 'Test 1',
    onClick: () => {},
    // filterFn: (data: any) => {
    //   console.log('test', data)
    //   return true
    // },
  },
]

const columnHelper = createColumnHelper<Software>()

const getFullName = (owner: any) => {
  if (!owner) return 'N/A'
  return `${owner.first_name} ${owner.last_name}`
}

const columns = [
  columnHelper.accessor('software', {
    header: 'Software Name',
    cell: info => info.getValue().name,
    enableHiding: false,
    enableSorting: true,
    enablePinning: true,
    size: 100,
  }),

  columnHelper.accessor('tags', {
    header: 'Software Name',
    cell: info => (
      <TableTagsCell items={info.getValue()?.map(g => ({name: g.group_name})) as any} />
    ),
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

const cols = {
  checked_state: [
    {
      id: 'location',
      label: 'Location',
      checked: true,
      group: 'Banking',
    },
    {
      id: 'compliant',
      label: 'Compliant',
      checked: true,
      group: 'Banking',
    },
    {
      id: 'encrypted',
      label: 'Encrypted',
      checked: true,
      group: 'Banking',
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
      group: 'Profile',
    },
    {
      id: 'allocated_to',
      label: 'Allocated to',
      checked: true,
      group: 'Profile',
    },
    {
      id: 'imei_1',
      label: 'IMEI 1',
      checked: true,
      group: 'Profile',
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
      name: 'Status 2',
      key: 'filter_status_2',
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
      id: 'joining-date',
      name: 'Joining Date',
      key: 'joining_date',
      type: FILTER_TYPE.DATE_RANGE,
      options: [],
      config: {
        mode: 'range',
        showQuickSelect: false,
        disabled: undefined,
        customDisable: undefined,
        disableWeekends: false,
        disableDatepicker: false,
        showOutsideDays: false,
      },
    },
    {
      id: 'table-type',
      name: 'Table Type',
      key: 'table_type',
      type: FILTER_TYPE.TAB,
      options: [
        {
          value: 'folders',
          name: 'Folder',
        },
        {
          value: 'reports',
          name: 'Reports',
        },
        {
          value: 'files',
          name: 'Files',
        },
      ],
      config: {},
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

export interface Software {
  id: string
  notes: string
  tags: any[]
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
    tags: [
      {
        id: '0147n2zr2dyeih7',
        group_name: 'IT',
        group_email: 'it@usehybrid.io',
      },
      {
        id: '01ljsd9k2f056wp',
        group_name: 'People',
        group_email: 'people@usehybrid.io',
      },
      {
        id: '03x8tuzt38el7bf',
        group_name: 'sales group',
        group_email: 'sales_group@usehybrid.io',
      },
      {
        id: '02y3w24744wmjjy',
        group_name: 'tech_test',
        group_email: 'tech_test@usehybrid.io',
      },
      {
        id: '04h042r01jhck6o',
        group_name: 'test-tech',
        group_email: 'test-tech@usehybrid.io',
      },
    ],
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
    tags: [],
  },
  {
    tags: [],
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
    tags: [],
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
    tags: [],
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
