import usersJson from './users.json'

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
