import React from 'react'
import ReactDOM from 'react-dom/client'
import {Table} from './components'
import {createColumnHelper} from '@tanstack/react-table'

const styles = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'gray',
}

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const data: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
]

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor('firstName', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.lastName, {
    id: 'lastName',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    footer: info => info.column.id,
  }),
]

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const defaultFilterOptions = [
  {
    id: 'software-owner',
    name: 'Software Owner',
    config: {
      hideSearch: false,
    },
    options: [
      {
        name: 'Owner 1',
        value: 'o1',
        checked: false,
      },
      {
        name: 'Figma',
        value: '123-156a',
        checked: false,
      },
      {
        name: 'Figma1',
        value: '123-156a1',
        checked: false,
      },
      {
        name: 'Figma a',
        value: '123-156aadf',
        checked: false,
      },
      {
        name: 'Figma b',
        value: '123-156aadf12',
        checked: false,
      },
      {
        name: 'Figma c',
        value: '123-156aadf21',
        checked: false,
      },
      {
        name: 'Figma d',
        value: '123-156aadf121',
        checked: false,
      },
      {
        name: 'Figma e',
        value: '123-156aadf214',
        checked: false,
      },
    ],
  },

  // {
  //   id: 'software-name',
  //   name: 'Software Name',
  //   options: [
  //     {
  //       name: 'Figma',
  //       value: '123-156afdafd',
  //       checked: false,
  //     },
  //   ],
  // },
]

function App() {
  const [search, setSearch] = React.useState('')
  return (
    <div style={styles}>
      <Table
        data={data}
        columns={columns}
        search={search}
        setSearch={setSearch}
        defaultFilterOptions={defaultFilterOptions}
      />
    </div>
  )
}
