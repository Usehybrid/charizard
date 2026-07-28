import * as React from 'react'
import {createColumnHelper} from '@tanstack/react-table'
import randomIcon from '../../components/assets/check.svg'
import {
  Badge,
  BADGE_HIGHLIGHT,
  BADGE_STATUS,
  createTableStore,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  Table,
  TABLE_ACTION_TYPES,
  TableDeviceCell,
} from '../../components'
import {fixtureInventories, type FixtureInventory} from '../fixtures'
import {DemoSection} from '../showcase/DemoSection'
import {PageHeader} from '../showcase/PageHeader'
import classes from './table.module.css'

const initialQueries = {
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
  search: '',
  sort_by: '',
  sort_order: '',
  filters: {
    filter_status: '',
    filter_type: '',
    filter_device_location: '',
  },
}

const useInventoryStore = createTableStore(initialQueries)

const tableCode = `
import {createColumnHelper} from '@tanstack/react-table'
import {Table, TableDeviceCell} from '@hybr1d-tech/charizard'

const columnHelper = createColumnHelper<Inventory>()

const columns = [
  columnHelper.accessor(
    row => ({
      id: row.id,
      name: row.name,
      type: row.product_type,
      serial_number: row.serial_number,
      isMdmConnected: row.mdm,
    }),
    {
      id: 'asset_details',
      header: 'Asset Details',
      cell: info => <TableDeviceCell device={info.getValue()} onClick={() => {}} />,
      enableSorting: true,
      enablePinning: true,
      size: 300,
    },
  ),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => <InventoryStatus status={info.getValue()} />,
    enableSorting: true,
    size: 180,
  }),
]

<Table
  data={inventories}
  columns={columns}
  loaderConfig={{isFetching: false, isError: false}}
  searchConfig={{search, setSearch, placeholder: 'Search your assets'}}
  paginationConfig={{metaData, page, limit, setPage, setLimit}}
  rowSelectionConfig={{isCheckbox: true, entityName: 'Asset', rowIdKey: 'id'}}
  tableStyleConfig={{stickyIds: ['asset_details']}}
/>
`

export default function TablePage() {
  return (
    <div>
      <PageHeader title="Table">
        The workhorse data table of the design system, built on TanStack Table. It composes search,
        filters, sorting, pagination, row selection, actions, customizable columns, sticky columns,
        and CSV export.
      </PageHeader>

      <DemoSection
        title="Inventory list"
        description="The production inventory-list configuration rendered with a sanitized 25-row snapshot from staging GET /v2/inventories. Search, filters, sorting, selection, actions, column customization, export, and API pagination metadata are wired locally with zero runtime network calls."
        code={tableCode}
      >
        <InventoryTableDemo />
      </DemoSection>
    </div>
  )
}

function InventoryTableDemo() {
  const query = useInventoryStore(state => state.query)
  const dispatch = useInventoryStore(state => state.dispatch)

  const rows = React.useMemo(() => {
    const search = query.search.trim().toLowerCase()
    const statuses = csvValues(query.filters.filter_status)
    const types = csvValues(query.filters.filter_type)
    const locations = csvValues(query.filters.filter_device_location)

    const filtered = fixtureInventories.filter(row => {
      const allocatedTo = fullName(row.allocated_to)
      const location = [row.location?.city, row.location?.country].filter(Boolean).join(', ')
      const matchesSearch =
        !search ||
        [row.name, row.serial_number, row.asset_tag, row.product_type, allocatedTo, location]
          .filter(Boolean)
          .some(value => String(value).toLowerCase().includes(search))

      return (
        matchesSearch &&
        (!statuses.length || statuses.includes(row.status)) &&
        (!types.length || types.includes(row.product_type)) &&
        (!locations.length || locations.includes(row.location?.type ?? ''))
      )
    })

    if (!query.sort_by || !query.sort_order) return filtered
    return [...filtered].sort((a, b) => {
      const left = sortableValue(a, query.sort_by)
      const right = sortableValue(b, query.sort_by)
      const result = left.localeCompare(right, undefined, {numeric: true})
      return query.sort_order === 'desc' ? -result : result
    })
  }, [query])

  return (
    <Table
      data={rows}
      columns={columns}
      loaderConfig={{isFetching: false, isError: false, text: 'Getting inventories...'}}
      searchConfig={{
        search: query.search,
        setSearch: (value: string) =>
          dispatch({type: TABLE_ACTION_TYPES.SEARCH, payload: value}),
        placeholder: 'Search your assets',
      }}
      totalText={`${fixtureMeta.total_items} Devices`}
      filterConfig={{
        initialFilters: query.filters,
        filters: inventoryFilters,
        isLoading: false,
        isError: false,
        filterDispatch: value => dispatch({type: TABLE_ACTION_TYPES.FILTER, payload: value}),
        filterReset: () => dispatch({type: TABLE_ACTION_TYPES.RESET_FILTERS, payload: null}),
      }}
      rowSelectionConfig={{
        isCheckbox: true,
        entityName: 'Asset',
        rowIdKey: 'id',
        actions: [
          {iconSrc: randomIcon, label: 'Bulk allocate', onClick: () => {}},
          {iconSrc: randomIcon, label: 'Archive', onClick: () => {}},
        ],
      }}
      actionsConfig={{
        isDropdownActions: true,
        menuItems: [
          {label: 'View details', onClick: () => {}},
          {label: 'Edit asset tag', onClick: () => {}},
          {label: 'Archive', onClick: () => {}},
        ],
      }}
      sortConfig={{
        sortBy: query.sort_by,
        sortOrd: query.sort_order as 'asc' | 'desc' | '',
        setSortBy: (value: string) =>
          dispatch({type: TABLE_ACTION_TYPES.SORT_BY, payload: value}),
        setSortOrd: (value: 'asc' | 'desc' | '') =>
          dispatch({type: TABLE_ACTION_TYPES.SORT_ORDER, payload: value}),
        sortMap,
      }}
      paginationConfig={{
        metaData: {...fixtureMeta, page_no: query.page},
        page: query.page,
        limit: query.limit,
        setPage: value => dispatch({type: TABLE_ACTION_TYPES.PAGE, payload: value}),
        setLimit: value => dispatch({type: TABLE_ACTION_TYPES.LIMIT, payload: value}),
      }}
      tableStyleConfig={{stickyIds: ['asset_details'], maxHeight: '720px'}}
      customColumnConfig={{
        columns: customColumns,
        isPending: false,
        isError: false,
        handleSaveColumns: async () => Promise.resolve(),
      }}
      exportConfig={{
        isPending: false,
        isError: false,
        handleExport: () => downloadCsv(rows),
      }}
    />
  )
}

const columnHelper = createColumnHelper<FixtureInventory>()

const columns = [
  columnHelper.accessor(
    row => ({
      id: row.id,
      name: row.name,
      type: row.product_type,
      serial_number: row.serial_number,
      isMdmConnected: row.mdm,
    }),
    {
      id: 'asset_details',
      header: 'Asset Details',
      cell: info => (
        <TableDeviceCell
          device={info.getValue()}
          onClick={() => {}}
          customStyle={{color: 'var(--p-p50)', fontWeight: 500}}
        />
      ),
      size: 300,
      enableSorting: true,
      enablePinning: true,
      enableHiding: false,
    },
  ),
  columnHelper.accessor('logistic_status', {
    header: 'Logistics Status',
    cell: info =>
      info.getValue() ? (
        <Badge highlight={BADGE_HIGHLIGHT.DOT} status={BADGE_STATUS.HIGHLIGHT}>
          {titleCase(info.getValue()!)}
        </Badge>
      ) : (
        'N/A'
      ),
    size: 190,
    enableSorting: true,
    enableHiding: true,
  }),
  columnHelper.accessor('product_type', {
    header: 'Device Type',
    cell: info => info.getValue() || '-',
    size: 180,
    enableSorting: true,
    enableHiding: true,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => <InventoryStatus status={info.getValue()} />,
    size: 180,
    enableSorting: true,
    enableHiding: true,
  }),
  columnHelper.accessor('location', {
    header: 'Device Location',
    cell: info => <InventoryLocation location={info.getValue()} />,
    size: 280,
    enableSorting: true,
    enableHiding: true,
  }),
  columnHelper.accessor('allocated_to', {
    header: 'Allocated To',
    cell: info => {
      const name = fullName(info.getValue())
      return name ? <span className={classes.link}>{name}</span> : '-'
    },
    size: 240,
    enableSorting: true,
    enableHiding: true,
  }),
  columnHelper.accessor('asset_tag', {
    header: 'Asset Tag',
    cell: info => info.getValue() || '-',
    size: 180,
    enableSorting: true,
    enableHiding: true,
  }),
]

function InventoryStatus({status}: {status: string}) {
  const config =
    statusConfig[status] ?? ({label: titleCase(status), badge: BADGE_STATUS.DEFAULT} as const)
  return (
    <Badge highlight={BADGE_HIGHLIGHT.DOT} status={config.badge}>
      {config.label}
    </Badge>
  )
}

function InventoryLocation({location}: {location: FixtureInventory['location']}) {
  if (!location) return <>-</>
  const place = [location.city, location.country].filter(Boolean).join(', ')
  return (
    <div>
      <div>{place || '-'}</div>
      {location.type && locationTypeLabels[location.type] && (
        <div className={classes.secondary}>{locationTypeLabels[location.type]}</div>
      )}
    </div>
  )
}

const fixtureMeta = {total_items: 205, page_no: 0, items_on_page: 25}

const statusConfig: Record<string, {label: string; badge: BADGE_STATUS}> = {
  assigned: {label: 'Assigned', badge: BADGE_STATUS.POSITIVE},
  unassigned: {label: 'Unassigned', badge: BADGE_STATUS.WARNING},
  in_transition: {label: 'In Transition', badge: BADGE_STATUS.HIGHLIGHT},
  under_maintenance: {label: 'Under Maintenance', badge: BADGE_STATUS.NEGATIVE},
  archived: {label: 'Archived', badge: BADGE_STATUS.NEUTRAL},
}

const locationTypeLabels: Record<string, string> = {
  company_hq: 'Company HQ',
  hybr1d_warehouse: 'ZenAdmin Warehouse',
  workwize_warehouse: 'Workwize Warehouse',
  office_location: 'Office Location',
}

const sortMap = {
  asset_details: 'name',
  logistic_status: 'logistic_status',
  product_type: 'product_type',
  status: 'status',
  location: 'location',
  allocated_to: 'allocated_to',
  asset_tag: 'asset_tag',
}

const inventoryFilters = {
  header: [
    {
      id: 'inventory-status',
      name: 'Status',
      key: 'filter_status',
      options: [
        {value: 'assigned', name: 'Assigned'},
        {value: 'unassigned', name: 'Unassigned'},
        {value: 'in_transition', name: 'In Transition'},
        {value: 'under_maintenance', name: 'Under Maintenance'},
      ],
      config: {hideSearch: true, placeholder: 'Search status'},
    },
  ],
  drawer: [
    {
      id: 'inventory-type',
      name: 'Type',
      key: 'filter_type',
      options: [...new Set(fixtureInventories.map(row => row.product_type))]
        .sort()
        .map(value => ({value, name: value})),
      config: {hideSearch: false, placeholder: 'Search asset types'},
    },
    {
      id: 'inventory-location',
      name: 'Device Location',
      key: 'filter_device_location',
      options: [
        {value: 'company_hq', name: 'Company HQ'},
        {value: 'hybr1d_warehouse', name: 'ZenAdmin Warehouse'},
        {value: 'work_location', name: 'Work location'},
      ],
      config: {hideSearch: true, placeholder: 'Search locations'},
    },
  ],
}

const customColumns = {
  checked_state: columns.map(column => ({
    id: String(column.id ?? ('accessorKey' in column ? column.accessorKey : '')),
    label: typeof column.header === 'string' ? column.header : String(column.id),
    checked: true,
  })),
  is_default: true,
  table_name: 'inventory_list',
}

function csvValues(value: string) {
  return value ? value.split(',').filter(Boolean) : []
}

function fullName(user: FixtureInventory['allocated_to']) {
  return user ? [user.first_name, user.middle_name, user.last_name].filter(Boolean).join(' ') : ''
}

function sortableValue(row: FixtureInventory, key: string) {
  if (key === 'location') return [row.location?.country, row.location?.city].filter(Boolean).join(' ')
  if (key === 'allocated_to') return fullName(row.allocated_to)
  return String(row[key as keyof FixtureInventory] ?? '')
}

function titleCase(value: string) {
  return value
    .replaceAll('_', ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase())
}

function downloadCsv(rows: FixtureInventory[]) {
  const values = rows.map(row => [
    row.name,
    row.serial_number,
    statusConfig[row.status]?.label ?? titleCase(row.status),
    row.product_type,
    [row.location?.city, row.location?.country].filter(Boolean).join(', '),
    fullName(row.allocated_to),
    row.asset_tag,
  ])
  const csv = [
    ['Asset', 'Serial number', 'Status', 'Device type', 'Location', 'Allocated to', 'Asset tag'],
    ...values,
  ]
    .map(row => row.map(value => `"${String(value ?? '').replaceAll('"', '""')}"`).join(','))
    .join('\n')
  const url = URL.createObjectURL(new Blob([csv], {type: 'text/csv;charset=utf-8'}))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'inventory-demo.csv'
  anchor.click()
  URL.revokeObjectURL(url)
}
