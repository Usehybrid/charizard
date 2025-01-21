import {create} from 'zustand'

export const DEFAULT_PAGE = 0
export const DEFAULT_LIMIT = 25

export enum TABLE_ACTION_TYPES {
  SEARCH = 'search',
  SORT_BY = 'sort_by',
  SORT_ORDER = 'sort_order',
  INITIAL_FILTER = 'initial_filter',
  FILTER = 'filter',
  RESET_FILTERS = 'reset_filters',
  RESET_ALL = 'reset_all',
  SELECTOR_FILTER = 'selector_filter',
  PAGE = 'page',
  LIMIT = 'limit',
  SET_DURATION = 'set_duration',
}

type TBaseQuery = {
  page: number
  limit: number
  search: string
  sort_by: string
  sort_order: string
  filters: Record<string, any>
}

interface TableStore<TQuery> {
  query: TQuery
  dispatch: (action: {type: TABLE_ACTION_TYPES; payload: any | null}) => void
}

// Utility function to build filter query
export const buildFilterQuery = (
  queryFilters: Record<string, any>,
  exclude: string[] = [],
): Record<string, any> => {
  const filters: Record<string, any> = {}

  if (queryFilters) {
    Object.keys(queryFilters).forEach(key => {
      if (queryFilters[key] && !exclude.includes(key)) {
        filters[key] = queryFilters[key]
      }
    })
  }

  return filters
}

// Utility function to get sort parameter
export const getSortBy = (query: {sort_by?: string; sort_order?: string}) => {
  if (!query.sort_by) return undefined
  switch (query.sort_order) {
    case 'asc':
      return `+${query.sort_by}`
    case 'desc':
      return `-${query.sort_by}`
    default:
      return `${query.sort_by}`
  }
}

// Utility function to build table query parameters
export const buildTableQuery = (query: TBaseQuery): Record<string, any> => {
  const params: Record<string, any> = {
    page: query.page,
    limit: query.limit,
  }

  if (query.search) {
    params.search = query.search
  }

  if (query.sort_by) {
    params.sort_by = getSortBy({
      sort_by: query.sort_by,
      sort_order: query.sort_order,
    })
  }

  if (query.filters) {
    Object.assign(params, buildFilterQuery(query.filters))
  }

  Object.keys(params).forEach(key => {
    if (params[key] === undefined) {
      delete params[key]
    }
  })

  return params
}

// Reusable table query dispatcher
const tableQueryReducer = <TQuery extends TBaseQuery>(
  query: TQuery,
  {payload, type}: {payload: any | null; type?: TABLE_ACTION_TYPES},
  initialQueries: TQuery,
): TQuery => {
  switch (type) {
    case TABLE_ACTION_TYPES.SEARCH:
      return {...query, search: payload, page: 0}
    case TABLE_ACTION_TYPES.SORT_BY:
      return {...query, sort_by: payload, page: 0}
    case TABLE_ACTION_TYPES.SORT_ORDER:
      return {...query, sort_order: payload}
    case TABLE_ACTION_TYPES.INITIAL_FILTER:
      return {...query, filters: payload}
    case TABLE_ACTION_TYPES.FILTER: {
      const {value, filterType} = payload
      return {
        ...query,
        page: 0,
        filters: {
          ...query.filters,
          [filterType]: value,
        },
      }
    }
    case TABLE_ACTION_TYPES.RESET_ALL:
      return initialQueries
    case TABLE_ACTION_TYPES.RESET_FILTERS:
      return {...query, filters: initialQueries.filters}
    case TABLE_ACTION_TYPES.PAGE:
      return {...query, page: payload}
    case TABLE_ACTION_TYPES.LIMIT:
      return {...query, limit: payload, page: 0}
    case TABLE_ACTION_TYPES.SET_DURATION:
      return {
        ...query,
        filters: {
          ...query.filters,
          filter_date_range: payload,
        },
      }
    case TABLE_ACTION_TYPES.SELECTOR_FILTER:
      return {
        ...query,
        filters: {
          ...query.filters,
          filter_status: payload,
        },
      }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

export const createTableStore = <TQuery extends TBaseQuery>(initialQueries: TQuery) => {
  return create<TableStore<TQuery>>(set => ({
    query: initialQueries,
    dispatch: action =>
      set(state => ({
        query: tableQueryReducer(state.query, action, initialQueries),
      })),
  }))
}

type TableNameValue = {label: string; value: string}
type TableNames = {
  [key: string]: {
    [key: string]: {
      [key: string]: TableNameValue
    }
  }
}

export const TABLE_NAMES: TableNames = {
  team: {
    employeeDirectory: {
      list: {label: 'People', value: 'team_list'},
      hiringTemplate: {label: 'Hiring Templates', value: 'team_hiring_template'},
      profileSoftwares: {label: 'Profile Softwares', value: 'team_profile_softwares'},
    },
  },
  zenIT: {
    inventory: {
      list: {label: 'Inventory List', value: 'inventory_list'},
      archive: {label: 'Inventory Archive List', value: 'inventory_archive_list'},
      allocationHistory: {
        label: 'Inventory Allocation History',
        value: 'inventory_allocation_history',
      },
    },
    software: {
      list: {label: 'Software List', value: 'software_list'},
      users: {label: 'Software Users', value: 'software_users'},
      detailsUsers: {label: 'Software Details Users', value: 'software_details_users'},
    },
    mdm: {
      devices: {label: 'MDM Devices', value: 'mdm_devices'},
      users: {label: 'MDM Users', value: 'mdm_users'},
    },
    webstore: {
      quotation: {label: 'Quotation List', value: 'quotation_list'},
    },
  },
  zenCore: {
    workflow: {
      list: {label: 'Workflow List', value: 'workflow_list'},
      history: {label: 'Workflow History', value: 'workflow_history'},
      forms: {label: 'Workflow Forms', value: 'workflow_forms'},
    },
  },
  zenPerformance: {
    goal: {
      list: {label: 'Goal List', value: 'goal_list'},
      departmentList: {label: 'Department Goals', value: 'departments_goal_list'},
    },
  },
  zenHR: {
    attendance: {
      timesheetList: {label: 'Attendance Timesheets', value: 'attendance_timesheets_list'},
      policyList: {label: 'Attendance Policy List', value: 'attendance_policy_list'},
    },
    leave: {
      policies: {label: 'Leave Policies', value: 'leave_policies'},
      publicHolidays: {label: 'Leave Public Holidays', value: 'leave_public_holidays'},
    },
  },
}

export type TableNameValueString = typeof TABLE_NAMES extends {[key: string]: infer T}
  ? T extends {[key: string]: infer U}
    ? U extends {[key: string]: infer V}
      ? V extends {value: string}
        ? V['value']
        : never
      : never
    : never
  : never

export const getTableNameInfo = (value: TableNameValueString): TableNameValue | undefined => {
  for (const category of Object.values(TABLE_NAMES)) {
    for (const subcategory of Object.values(category)) {
      for (const table of Object.values(subcategory)) {
        if (table.value === value) {
          return table
        }
      }
    }
  }
  return undefined
}
