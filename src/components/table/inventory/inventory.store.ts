import {createTableStore, DEFAULT_LIMIT, DEFAULT_PAGE} from '../../../utils/table'

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

// * Inventory Allocation History Store
export const inventoryAllocationHistoryInitialQueries = {
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
  search: '',
  sort_by: '',
  sort_order: '',
  filters: {
    filter_team: '',
    filter_department: '',
  },
}

export type InventoryAllocationHistoryQueries = typeof inventoryAllocationHistoryInitialQueries
export const useInventoryAllocationHistoryStore = createTableStore(
  inventoryAllocationHistoryInitialQueries,
)
