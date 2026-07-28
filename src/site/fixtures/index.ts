import inventoriesJson from './inventories.json'
import usersJson from './users.json'

export interface FixtureInventory {
  id: string
  name: string
  status: string
  asset_tag: string | null
  serial_number: string | null
  mdm: boolean
  product_type: string
  logistic_status: string | null
  location: {
    city: string | null
    country: string | null
    type: string | null
  } | null
  allocated_to: {
    id: string
    first_name: string
    middle_name: string | null
    last_name: string
  } | null
}

/** Sanitized staging `GET /v2/inventories` list snapshot. */
export const fixtureInventories = inventoriesJson as FixtureInventory[]

/**
 * Sanitized snapshot of the staging `GET /users/team` response (see
 * scripts/snapshot-fixtures.mts). Field list mirrors the real API so demos
 * exercise production-shaped data.
 */
export interface FixtureUser {
  id: string
  email: string
  first_name: string
  middle_name: string | null
  last_name: string
  work_email: string
  profile_img_url: string
  status: string
  join_date: string | null
  start_date: string | null
  created_at: string
  country_id: string | null
  reporting_manager_id: string | null
  [key: string]: unknown
}

export const fixtureUsers = usersJson as FixtureUser[]

export const fixtureUserName = (u: FixtureUser) => `${u.first_name} ${u.last_name}`.trim()
