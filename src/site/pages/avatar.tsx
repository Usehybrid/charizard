import {Avatar} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'

/** Tiny inline SVG avatar so the showcase works offline. */
const avatarImg = (initials: string, bg: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="${bg}"/><text x="48" y="61" font-family="Arial, sans-serif" font-size="36" font-weight="600" fill="#ffffff" text-anchor="middle">${initials}</text></svg>`,
  )}`

const priya = {
  first_name: 'Priya',
  last_name: 'Nair',
  work_email: 'priya.nair@acme.io',
  profile_img_url: avatarImg('PN', '#254dda'),
}

const marcus = {
  first_name: 'Marcus',
  last_name: 'Chen',
  work_email: 'marcus.chen@acme.io',
  profile_img_url: avatarImg('MC', '#0f766e'),
}

export default function AvatarPage() {
  return (
    <div>
      <h1>Avatar</h1>
      <p>Circular user avatar rendered from the user object&apos;s profile_img_url.</p>

      <DemoSection
        title="Basic"
        description="Pass a user object; the component reads user.profile_img_url."
        code={`
import {Avatar} from '@hybr1d-tech/charizard'

const user = {
  first_name: 'Priya',
  last_name: 'Nair',
  work_email: 'priya.nair@acme.io',
  profile_img_url: '...',
}

<Avatar user={user} />
`}
      >
        <DemoRow>
          <DemoItem label="Priya Nair">
            <Avatar user={priya} />
          </DemoItem>
          <DemoItem label="Marcus Chen">
            <Avatar user={marcus} />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Custom sizes"
        description="imageStyles merges into the img element's inline style — use it for sizing."
        code={`
<Avatar user={user} imageStyles={{width: 24, height: 24}} />
<Avatar user={user} imageStyles={{width: 40, height: 40}} />
<Avatar user={user} imageStyles={{width: 64, height: 64}} />
`}
      >
        <DemoRow>
          <DemoItem label="24px">
            <Avatar user={priya} imageStyles={{width: 24, height: 24}} />
          </DemoItem>
          <DemoItem label="40px">
            <Avatar user={priya} imageStyles={{width: 40, height: 40}} />
          </DemoItem>
          <DemoItem label="64px">
            <Avatar user={priya} imageStyles={{width: 64, height: 64}} />
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
