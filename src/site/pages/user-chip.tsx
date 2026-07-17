import {UserChip, USER_CHIP_STATUS} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'

/** Tiny inline SVG avatar so the showcase works offline. */
const avatar = (initials: string, bg: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" rx="32" fill="${bg}"/><text x="32" y="41" font-family="Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" text-anchor="middle">${initials}</text></svg>`,
  )}`

const priya = avatar('PN', '#254dda')
const marcus = avatar('MC', '#0f766e')

export default function UserChipPage() {
  return (
    <div>
      <h1>UserChip</h1>
      <p>Compact user identity chip — avatar plus name — in seven status colorways.</p>

      <DemoSection
        title="Statuses"
        description="Pass a USER_CHIP_STATUS to tint the chip. DEFAULT is used when omitted."
        code={`
import {UserChip, USER_CHIP_STATUS} from '@hybr1d-tech/charizard'

<UserChip
  status={USER_CHIP_STATUS.POSITIVE}
  username="Priya Nair"
  profileImgUrl={priya.profile_img_url}
/>
`}
      >
        <DemoRow>
          <DemoItem label="DEFAULT">
            <UserChip username="Priya Nair" profileImgUrl={priya} />
          </DemoItem>
          <DemoItem label="WHITE">
            <UserChip status={USER_CHIP_STATUS.WHITE} username="Priya Nair" profileImgUrl={priya} />
          </DemoItem>
          <DemoItem label="NEUTRAL">
            <UserChip
              status={USER_CHIP_STATUS.NEUTRAL}
              username="Priya Nair"
              profileImgUrl={priya}
            />
          </DemoItem>
          <DemoItem label="POSITIVE">
            <UserChip
              status={USER_CHIP_STATUS.POSITIVE}
              username="Priya Nair"
              profileImgUrl={priya}
            />
          </DemoItem>
          <DemoItem label="WARNING">
            <UserChip
              status={USER_CHIP_STATUS.WARNING}
              username="Priya Nair"
              profileImgUrl={priya}
            />
          </DemoItem>
          <DemoItem label="ERROR">
            <UserChip status={USER_CHIP_STATUS.ERROR} username="Priya Nair" profileImgUrl={priya} />
          </DemoItem>
          <DemoItem label="HIGHLIGHT">
            <UserChip
              status={USER_CHIP_STATUS.HIGHLIGHT}
              username="Priya Nair"
              profileImgUrl={priya}
            />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Selected"
        description="selected renders a remove icon on the chip, for use in pickers and filters."
        code={`
<UserChip
  selected
  username="Marcus Chen"
  profileImgUrl={marcus.profile_img_url}
/>
`}
      >
        <DemoRow>
          <DemoItem label="selected">
            <UserChip selected username="Marcus Chen" profileImgUrl={marcus} />
          </DemoItem>
          <DemoItem label="selected + HIGHLIGHT">
            <UserChip
              selected
              status={USER_CHIP_STATUS.HIGHLIGHT}
              username="Marcus Chen"
              profileImgUrl={marcus}
            />
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
