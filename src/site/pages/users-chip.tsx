import {UsersChip, USER_CHIP_STATUS} from '../../components'
import {fixtureUsers} from '../fixtures'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'

/** Tiny inline SVG avatar so the showcase works offline. */
const avatar = (initials: string, bg: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" rx="32" fill="${bg}"/><text x="32" y="41" font-family="Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" text-anchor="middle">${initials}</text></svg>`,
  )}`

const users = [
  {
    first_name: 'Priya',
    middle_name: null,
    last_name: 'Nair',
    work_email: 'priya.nair@acme.io',
    profile_img_url: avatar('PN', '#254dda'),
    id: 'cea4d3ed-bc4b-4092-ba5d-8245a106e08d',
  },
  {
    first_name: 'Marcus',
    middle_name: null,
    last_name: 'Chen',
    work_email: 'marcus.chen@acme.io',
    profile_img_url: avatar('MC', '#0f766e'),
    id: '20297f5a-7349-425e-8c52-22ad78897e65',
  },
]

export default function UsersChipPage() {
  return (
    <div>
      <h1>UsersChip</h1>
      <p>Overflow-aware chip for a set of users: stacked avatars plus a count.</p>

      <DemoSection
        title="Statuses"
        description="The chip shows up to two stacked avatars and the number of users. Status tints the container."
        code={`
import {UsersChip, USER_CHIP_STATUS} from '@hybr1d-tech/charizard'

const users = [
  {
    first_name: 'Priya',
    last_name: 'Nair',
    work_email: 'priya.nair@acme.io',
    profile_img_url: '...',
    id: 'cea4d3ed-bc4b-4092-ba5d-8245a106e08d',
  },
  // ...
]

<UsersChip status={USER_CHIP_STATUS.POSITIVE} users={users} />
`}
      >
        <DemoRow>
          <DemoItem label="WHITE">
            <UsersChip status={USER_CHIP_STATUS.WHITE} users={users} />
          </DemoItem>
          <DemoItem label="NEUTRAL">
            <UsersChip status={USER_CHIP_STATUS.NEUTRAL} users={users} />
          </DemoItem>
          <DemoItem label="POSITIVE">
            <UsersChip status={USER_CHIP_STATUS.POSITIVE} users={users} />
          </DemoItem>
          <DemoItem label="ERROR">
            <UsersChip status={USER_CHIP_STATUS.ERROR} users={users} />
          </DemoItem>
          <DemoItem label="WARNING">
            <UsersChip status={USER_CHIP_STATUS.WARNING} users={users} />
          </DemoItem>
          <DemoItem label="HIGHLIGHT">
            <UsersChip status={USER_CHIP_STATUS.HIGHLIGHT} users={users} />
          </DemoItem>
          <DemoItem label="DEFAULT">
            <UsersChip status={USER_CHIP_STATUS.DEFAULT} users={users} />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Counts and empty state"
        description="userCount overrides the displayed number (e.g. total from the API while only the first users are passed). An empty users array renders the zero state."
        code={`
<UsersChip users={users} userCount={45} />
<UsersChip users={[]} />
`}
      >
        <DemoRow>
          <DemoItem label="single user">
            <UsersChip users={users.slice(0, 1)} />
          </DemoItem>
          <DemoItem label="userCount={45}">
            <UsersChip users={users} userCount={45} />
          </DemoItem>
          <DemoItem label="empty">
            <UsersChip users={[]} />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="API-shaped data"
        description="Fed directly with a sanitized snapshot of the staging GET /users/team response (src/site/fixtures/users.json) — the exact row shape the console passes in production. Empty profile_img_url falls back to initials."
        code={`
// rows straight from the users-list API response
<UsersChip users={apiUsers.slice(0, 5)} userCount={meta.total_items} />
`}
      >
        <DemoRow>
          <DemoItem label="first 5 of 279 (real meta total)">
            <UsersChip users={fixtureUsers.slice(0, 5)} userCount={279} />
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
