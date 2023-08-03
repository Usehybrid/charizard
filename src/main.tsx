import React from 'react'
import ReactDOM from 'react-dom/client'
import {createColumnHelper} from '@tanstack/react-table'

import randomIcon from './components/assets/check.svg'
import {
  Button,
  ButtonVariant,
  Input,
  InputContainer,
  InputGroup,
  InputLabel,
  InputRightAddon,
  RadioGroup,
  SegmentedControl,
  Table,
} from './components'

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
}

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

  // ! replace any with IUserDetails
  const columnHelper = createColumnHelper<any>()

  const columns = [
    columnHelper.accessor('user', {
      // id: 'user',
      // ! need no. of people here as well
      header: 'People',
      cell: info => <div>{JSON.stringify(info.getValue())}</div>,
    }),

    // ! should be user's home address
    columnHelper.accessor('work_location', {
      // id: 'work_location',
      header: 'Location',
      cell: info => {
        const data = info.getValue()
        return (
          <p>
            {data.city}, {data.country.name}
          </p>
        )
      },
      enableSorting: false,
    }),
    columnHelper.accessor('user_tags', {
      // id: 'user_tags',
      header: 'Team tag',
      cell: info => {
        const data = info.getValue()
        return <div>{JSON.stringify(info.getValue())}</div>
      },
    }),
    columnHelper.accessor('allocated_product', {
      // id: 'allocated_product',
      header: 'Allocated Product',
      cell: info => {
        return <div>{JSON.stringify(info.getValue())}</div>
      },
    }),
  ]

  const data = [
    {
      id: 1,
      user: {
        id: 1,
        first_name: 'Peter',
        last_name: 'Park',
        profile_img_url: null,
      },
      user_position: {id: 1, position: {id: '1', name: 'Designer'}},
      user_department: {id: 1, department: {id: '2', name: 'Product'}},
      work_location: {id: 1, city: 'Bangalore', country: {id: '1', name: 'India'}},
      user_tags: [{id: '1', tag: {id: '1', name: 'Design'}}],
      allocated_product: [
        {
          id: 1,
          serial_number: 'CG575653HJ',
          name: 'Macbook Pro 16"',
          tag: 'LP0213',
          type: 'Laptop',
        },
      ],
    },
    {
      id: 2,
      user: {
        id: 1,
        first_name: 'Alex',
        last_name: 'Fernando',
        profile_img_url: null,
      },
      user_position: {id: 1, position: {id: '1', name: 'Designer'}},
      user_department: {id: 1, department: {id: '2', name: 'Product'}},
      work_location: {id: 1, city: 'Bangalore', country: {id: '1', name: 'India'}},
      user_tags: [
        {id: '1', tag: {id: '1', name: 'Finance'}},
        {id: '2', tag: {id: '2', name: 'Sales'}},
      ],
      allocated_product: [
        {
          id: 1,
          serial_number: 'ESE75653HJ',
          name: 'Macbook Pro 16"',
          tag: 'LP0213',
          type: 'Laptop',
        },
        {
          id: 1,
          serial_number: 'CG575653HJ',
          name: 'Macbook Pro 16"',
          tag: 'LP0213',
          type: 'Laptop',
        },
        {
          id: 1,
          serial_number: 'CG575653HJ',
          name: 'Macbook Pro 16"',
          tag: 'LP0213',
          type: 'Laptop',
        },
      ],
    },
    {
      id: 3,
      user: {
        id: 1,
        first_name: 'Antony',
        last_name: 'Das',
        profile_img_url: null,
      },
      user_position: {id: 1, position: {id: '1', name: 'Designer'}},
      user_department: {id: 1, department: {id: '2', name: 'Product'}},
      work_location: {id: 1, city: 'Bangalore', country: {id: '1', name: 'India'}},
      user_tags: [{id: '1', tag: {id: '1', name: 'Marketing'}}],
      allocated_product: [
        {
          id: 1,
          serial_number: 'GDE75653HJ',
          name: 'Macbook Pro 16"',
          tag: 'LP0213',
          type: 'Laptop',
        },
      ],
    },
    {
      id: 4,
      user: {
        id: 1,
        first_name: 'James',
        last_name: 'Caren',
        profile_img_url: null,
      },
      user_position: {id: 1, position: {id: '1', name: 'Designer'}},
      user_department: {id: 1, department: {id: '2', name: 'Product'}},
      work_location: {id: 1, city: 'Bangalore', country: {id: '1', name: 'India'}},
      user_tags: [{id: '1', tag: {id: '1', name: 'Tech'}}],
      allocated_product: null,
    },
    {
      id: 5,
      user: {
        id: 1,
        first_name: 'Vetri',
        last_name: 'Govindarajan',
        profile_img_url: null,
      },
      user_position: {id: 1, position: {id: '1', name: 'Designer'}},
      user_department: {id: 1, department: {id: '2', name: 'Product'}},
      work_location: {id: 1, city: 'Bangalore', country: {id: '1', name: 'India'}},
      user_tags: [{id: '1', tag: {id: '1', name: 'Marketing'}}],
      allocated_product: null,
    },
    {
      id: 6,
      user: {
        id: 1,
        first_name: 'Vetri',
        last_name: 'Govindarajan',
        profile_img_url: null,
      },
      user_position: {id: 1, position: {id: '1', name: 'Designer'}},
      user_department: {id: 1, department: {id: '2', name: 'Product'}},
      work_location: {id: 1, city: 'Bangalore', country: {id: '1', name: 'India'}},
      user_tags: [{id: '1', tag: {id: '1', name: 'Marketing'}}],
      allocated_product: null,
    },
    {
      id: 7,
      user: {
        id: 1,
        first_name: 'Vetri',
        last_name: 'Govindarajan',
        profile_img_url: null,
      },
      user_position: {id: 1, position: {id: '1', name: 'Designer'}},
      user_department: {id: 1, department: {id: '2', name: 'Product'}},
      work_location: {id: 1, city: 'Bangalore', country: {id: '1', name: 'India'}},
      user_tags: [{id: '1', tag: {id: '1', name: 'Marketing'}}],
      allocated_product: null,
    },
    {
      id: 8,
      user: {
        id: 1,
        first_name: 'Vetri',
        last_name: 'Govindarajan',
        profile_img_url: null,
      },
      user_position: {id: 1, position: {id: '1', name: 'Designer'}},
      user_department: {id: 1, department: {id: '2', name: 'Product'}},
      work_location: {id: 1, city: 'Bangalore', country: {id: '1', name: 'India'}},
      user_tags: [{id: '1', tag: {id: '1', name: 'Marketing'}}],
      allocated_product: null,
    },
    {
      id: 9,
      user: {
        id: 1,
        first_name: 'Vetri',
        last_name: 'Govindarajan',
        profile_img_url: null,
      },
      user_position: {id: 1, position: {id: '1', name: 'Designer'}},
      user_department: {id: 1, department: {id: '2', name: 'Product'}},
      work_location: {id: 1, city: 'Bangalore', country: {id: '1', name: 'India'}},
      user_tags: [{id: '1', tag: {id: '1', name: 'Marketing'}}],
      allocated_product: null,
    },
    {
      id: 10,
      user: {
        id: 1,
        first_name: 'Vetri',
        last_name: 'Govindarajan',
        profile_img_url: null,
      },
      user_position: {id: 1, position: {id: '1', name: 'Designer'}},
      user_department: {id: 1, department: {id: '2', name: 'Product'}},
      work_location: {id: 1, city: 'Bangalore', country: {id: '1', name: 'India'}},
      user_tags: [{id: '1', tag: {id: '1', name: 'Marketing'}}],
      allocated_product: null,
    },
    {
      id: 11,
      user: {
        id: 1,
        first_name: 'Vetri',
        last_name: 'Govindarajan',
        profile_img_url: null,
      },
      user_position: {id: 1, position: {id: '1', name: 'Designer'}},
      user_department: {id: 1, department: {id: '2', name: 'Product'}},
      work_location: {id: 1, city: 'Bangalore', country: {id: '1', name: 'India'}},
      user_tags: [{id: '1', tag: {id: '1', name: 'Marketing'}}],
      allocated_product: null,
    },
    {
      id: 12,
      user: {
        id: 1,
        first_name: 'Vetri',
        last_name: 'Govindarajan',
        profile_img_url: null,
      },
      user_position: {id: 1, position: {id: '1', name: 'Designer'}},
      user_department: {id: 1, department: {id: '2', name: 'Product'}},
      work_location: {id: 1, city: 'Bangalore', country: {id: '1', name: 'India'}},
      user_tags: [{id: '1', tag: {id: '1', name: 'Marketing'}}],
      allocated_product: null,
    },
    {
      id: 13,
      user: {
        id: 1,
        first_name: 'Vetri',
        last_name: 'Govindarajan',
        profile_img_url: null,
      },
      user_position: {id: 1, position: {id: '1', name: 'Designer'}},
      user_department: {id: 1, department: {id: '2', name: 'Product'}},
      work_location: {id: 1, city: 'Bangalore', country: {id: '1', name: 'India'}},
      user_tags: [{id: '1', tag: {id: '1', name: 'Marketing'}}],
      allocated_product: null,
    },
    {
      id: 14,
      user: {
        id: 1,
        first_name: 'Vetri',
        last_name: 'Govindarajan',
        profile_img_url: null,
      },
      user_position: {id: 1, position: {id: '1', name: 'Designer'}},
      user_department: {id: 1, department: {id: '2', name: 'Product'}},
      work_location: {id: 1, city: 'Bangalore', country: {id: '1', name: 'India'}},
      user_tags: [{id: '1', tag: {id: '1', name: 'Marketing'}}],
      allocated_product: null,
    },
    {
      id: 15,
      user: {
        id: 1,
        first_name: 'Vetri',
        last_name: 'Govindarajan',
        profile_img_url: null,
      },
      user_position: {id: 1, position: {id: '1', name: 'Designer'}},
      user_department: {id: 1, department: {id: '2', name: 'Product'}},
      work_location: {id: 1, city: 'Bangalore', country: {id: '1', name: 'India'}},
      user_tags: [{id: '1', tag: {id: '1', name: 'Marketing'}}],
      allocated_product: null,
    },
  ]

  const options = [
    // {label: 'Red', value: 'red', component: <>Red</>},
    // {label: 'Blue', value: 'blue', component: <>Red</>},
    // {label: 'Pink', value: 'pink', component: <>Red</>},
    // {label: 'White', value: 'white', component: <>Red</>},
    // {label: 'Yellow', value: 'yellow', component: <>Red</>},
    // {label: 'Light blue', value: 'light_blue', component: <>Red</>},
    // {label: 'Saffron', value: 'saffron', component: <>Red</>},
    {label: 'Purchase', value: 'purchase', component: <>purchase</>},
    {label: 'Rental', value: 'rental', component: <>rental</>},
    {label: 'Lease', value: 'lease', component: <>lease</>},
  ]
  const [selectedVal, setSelectedVal] = React.useState({label: '', value: ''})

  return (
    <div style={styles}>
      {/* <Table
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
        checkboxConfig={{
          isCheckboxActions: true,
          actions: [
            {
              icon: randomIcon,
              text: 'Archive',
              onClick: () => {},
            },
          ],
        }}
        isDropdownActions={false}
        actionsConfig={{menuItems: []}}
        totalText={`softwares`}
      /> */}
      {/* <SegmentedControl items={options} defaultValue="purchase" /> */}
      {/* <SegmentedControl items={items} defaultValue="purchase" controlId="control" /> */}
      {/* <InputContainer size="md">
        <InputLabel>Label</InputLabel>
        <InputGroup>
          <Input value={'value'} />
          <InputRightAddon
            isDropdown
            dropdownOptions={options}
            handleOptionClick={opt => setSelectedVal(opt)}
          >
            {selectedVal.label}
          </InputRightAddon>
        </InputGroup>
      </InputContainer> */}
      {/* <Tooltip>
        <TooltipTrigger>trigger</TooltipTrigger>
        <TooltipContent>content</TooltipContent>
      </Tooltip> */}
      <Button size="xs" variant={ButtonVariant.GHOST}>
        button
      </Button>

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
