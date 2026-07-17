import type * as React from 'react'

/**
 * Auto-discovered showcase pages: dropping a `<slug>.tsx` file into ./pages
 * registers it — the manifest stays pure data (it's also consumed by
 * scripts/generate-manifest.mts in Node, where import.meta.glob doesn't exist).
 */
export const pageModules = import.meta.glob<{default: React.ComponentType}>([
  './pages/*.tsx',
  '!./pages/home.tsx', // statically imported by routes.tsx
])

export const pageLoader = (slug: string) => pageModules[`./pages/${slug}.tsx`]
