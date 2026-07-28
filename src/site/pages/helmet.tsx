import * as React from 'react'
import {CheckboxV2, Helmet, InputV2} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {PageHeader} from '../showcase/PageHeader'

export default function HelmetPage() {
  const [applied, setApplied] = React.useState(false)
  const [title, setTitle] = React.useState('Devices — ZenAdmin')

  return (
    <div>
      <PageHeader title="Helmet">
        Document head manager: renders title, description, canonical link, Open Graph and Twitter
        Card tags, relying on React 19&apos;s native hoisting of metadata elements into the document
        head.
      </PageHeader>

      <DemoSection
        title="Setting the document title"
        description="While the checkbox below is on, a <Helmet title={...}> element is mounted and React hoists its <title> into the document head — watch this browser tab's label change. Unchecking (or navigating away) unmounts it and the tab reverts."
        code={`
<Helmet title="Devices — ZenAdmin" />
`}
      >
        <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16}}>
          <div style={{minWidth: 280}}>
            <InputV2
              aria-label="Document title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <CheckboxV2 label="Apply to the browser tab" checked={applied} onChange={setApplied} />
          {applied && <Helmet title={title} />}
        </div>
      </DemoSection>

      <DemoSection
        title="Full metadata API"
        description="Everything except title targets crawlers and link unfurlers, so there is nothing visible on the page — the tags land in <head>. canonicalUrl and site default to window.location.href, ogImage to the ZenAdmin logo, and extra tags can be passed as children. Only one Helmet should be mounted per page, since the tags are not deduplicated."
        code={`
<Helmet
  title="Devices — ZenAdmin"
  description="Manage every company device from one place."
  keywords="devices, MDM, IT asset management"
  canonicalUrl="https://app.zenadmin.ai/devices"
  ogImage="https://app.zenadmin.ai/og/devices.png"
  site="https://app.zenadmin.ai"
>
  {/* extra head tags as children */}
  <meta name="robots" content="noindex" />
</Helmet>
`}
      >
        <ul style={{margin: 0, paddingLeft: 20, lineHeight: 1.8}}>
          <li>
            <strong>title</strong> — document title, plus og:title and twitter:title
          </li>
          <li>
            <strong>description</strong> — meta description, og:description, twitter:description
          </li>
          <li>
            <strong>keywords</strong> — meta keywords
          </li>
          <li>
            <strong>canonicalUrl</strong> — rel=&quot;canonical&quot; link and og:url
          </li>
          <li>
            <strong>ogImage</strong> — og:image and twitter:image
          </li>
          <li>
            <strong>site</strong> — twitter:domain (hostname) and twitter:url
          </li>
          <li>
            <strong>children</strong> — any additional head elements
          </li>
        </ul>
      </DemoSection>
    </div>
  )
}
