import * as React from 'react'
import {
  BUTTON_SIZE,
  BUTTON_VARIANT,
  Breadcrumbs,
  Button,
  useBreadcrumbsStore,
} from '../../components'
import type {Breadcrumb} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow} from '../showcase/DemoRow'

// hrefs point at real site routes so the links stay navigable inside the hash router
const SHORT_TRAIL: Breadcrumb[] = [
  {label: 'Home', href: '/'},
  {label: 'Tabs', href: '/components/tabs'},
  {label: 'Breadcrumbs', active: true},
]

const LONG_TRAIL: Breadcrumb[] = [
  {label: 'Home', href: '/'},
  {label: 'Tabs', href: '/components/tabs'},
  {label: 'LayoutTabs', href: '/components/layout-tabs'},
  {label: 'EmptyState', href: '/components/empty-state'},
  {label: 'Breadcrumbs', active: true},
]

export default function BreadcrumbsPage() {
  const setBreadcrumbs = useBreadcrumbsStore(s => s.setBreadcrumbs)
  const [trail, setTrail] = React.useState<'short' | 'long'>('short')

  React.useEffect(() => {
    setBreadcrumbs(trail === 'short' ? SHORT_TRAIL : LONG_TRAIL)
    return () => setBreadcrumbs([])
  }, [trail, setBreadcrumbs])

  return (
    <div>
      <h1>Breadcrumbs</h1>
      <p>
        Router-aware breadcrumb trail fed by a global zustand store — pages declare their trail
        with the useBreadcrumbs hook and a single Breadcrumbs instance in the app header renders
        it.
      </p>

      <DemoSection
        title="Trail from the global store"
        description="Breadcrumbs takes no props: it subscribes to the breadcrumbs store. A page sets its trail with useBreadcrumbs (which also clears it on unmount). Non-active items render as react-router Links, so the hrefs here navigate to real pages on this site; the active item renders as plain text."
        code={`
// in the app shell (rendered once):
<Breadcrumbs />

// in a page component:
useBreadcrumbs([
  {label: 'Home', href: '/'},
  {label: 'Tabs', href: '/components/tabs'},
  {label: 'Breadcrumbs', active: true},
])
`}
      >
        <Breadcrumbs />
      </DemoSection>

      <DemoSection
        title="Overflow collapsing (4+ items)"
        description="Trails longer than three items collapse: the first and last crumbs stay visible and the middle ones move into a '...' hover dropdown. The store is app-global, so switching the trail here updates every Breadcrumbs instance on the page — including the one in the section above."
        code={`
useBreadcrumbs([
  {label: 'Home', href: '/'},
  {label: 'Tabs', href: '/components/tabs'},
  {label: 'LayoutTabs', href: '/components/layout-tabs'},
  {label: 'EmptyState', href: '/components/empty-state'},
  {label: 'Breadcrumbs', active: true},
])
`}
      >
        <div style={{width: '100%'}}>
          <DemoRow label="Switch the stored trail">
            <Button
              size={BUTTON_SIZE.SMALL}
              variant={trail === 'short' ? BUTTON_VARIANT.PRIMARY : BUTTON_VARIANT.GHOST}
              onClick={() => setTrail('short')}
            >
              3 items
            </Button>
            <Button
              size={BUTTON_SIZE.SMALL}
              variant={trail === 'long' ? BUTTON_VARIANT.PRIMARY : BUTTON_VARIANT.GHOST}
              onClick={() => setTrail('long')}
            >
              5 items (collapsed)
            </Button>
          </DemoRow>
          <div style={{marginTop: 16}}>
            <Breadcrumbs />
          </div>
          {trail === 'long' && (
            <p style={{marginTop: 12}}>Hover the &quot;...&quot; to reveal the hidden crumbs.</p>
          )}
        </div>
      </DemoSection>
    </div>
  )
}
