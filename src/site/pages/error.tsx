import * as React from 'react'
import {Error404, Error500, ErrorBoundaryFallback, ErrorsLayout} from '../../components'
import {DemoSection} from '../showcase/DemoSection'

// The error layout is designed to fill the whole viewport (min-height: 100dvh),
// so each demo is boxed into a fixed-height, scrollable frame.
const frameStyle: React.CSSProperties = {
  width: '100%',
  height: 420,
  overflow: 'auto',
  border: '1px solid #e2e2e2',
  borderRadius: 8,
}

const demoError = new Error('TypeError: cannot read properties of undefined')

export default function ErrorPage() {
  return (
    <div>
      <h1>Error</h1>
      <p>
        Full-page error layouts: branded 404/500 screens and an error-boundary fallback. Normally
        these own the entire viewport; here each one is rendered inside a fixed-height scrollable
        frame. The &quot;Go to homepage&quot; buttons really navigate (to this site&apos;s home).
      </p>

      <DemoSection
        title="404 page"
        description="ErrorsLayout provides the logo, illustration, action buttons and contact footer; Error404 supplies the message block. In an app you usually mount the whole bundle as a route via ErrorsPage, which wires /404 and /500 child routes for you."
        code={`
// route-level usage: renders Error404 at ./404 (and as the index) and Error500 at ./500
<Route path="/error/*" element={<ErrorsPage homeRoute="/" />} />

// or compose the pieces directly:
<ErrorsLayout homeRoute="/">
  <Error404 />
</ErrorsLayout>
`}
      >
        <div style={frameStyle}>
          <ErrorsLayout homeRoute="/">
            <Error404 />
          </ErrorsLayout>
        </div>
      </DemoSection>

      <DemoSection
        title="500 page"
        description="Same layout with the Error500 message block. ErrorsPage accepts isOnly500 to serve only the system-error screen."
        code={`
<ErrorsLayout homeRoute="/">
  <Error500 />
</ErrorsLayout>
`}
      >
        <div style={frameStyle}>
          <ErrorsLayout homeRoute="/">
            <Error500 />
          </ErrorsLayout>
        </div>
      </DemoSection>

      <DemoSection
        title="Error boundary fallback"
        description="ErrorBoundaryFallback is meant to be handed to an error boundary (e.g. Sentry's fallback prop). It adds a 'Reload page' button, and with isDev=true it shows the raw error message instead of the friendly copy. Here resetError is a no-op and isDev is on so you can see the message."
      >
        <div style={frameStyle}>
          <ErrorBoundaryFallback error={demoError} resetError={() => {}} isDev homeRoute="/" />
        </div>
      </DemoSection>
    </div>
  )
}
