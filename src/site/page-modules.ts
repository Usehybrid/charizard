import type * as React from 'react'

/**
 * Auto-discovered showcase pages: dropping a `<slug>.tsx` file into ./pages
 * registers it — the manifest stays pure data (it's also consumed by
 * scripts/generate-manifest.mts in Node, where import.meta.glob doesn't exist).
 */
export const pageModules = import.meta.glob<{default: React.ComponentType}>([
  './pages/*.tsx',
  // statically imported by routes.tsx — not component pages
  '!./pages/home.tsx',
  '!./pages/changelog.tsx',
])

export const pageLoader = (slug: string) => pageModules[`./pages/${slug}.tsx`]

/**
 * The same pages as raw text, for the "Copy page" button: it rebuilds the
 * component's markdown (description, import, snippets) from source on demand.
 * Lazy loaders, so no page source lands in the initial bundle.
 */
const pageSources = import.meta.glob<string>('./pages/*.tsx', {
  query: '?raw',
  import: 'default',
})

export const pageSource = (slug: string) => pageSources[`./pages/${slug}.tsx`]
