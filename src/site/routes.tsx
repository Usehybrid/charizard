import * as React from 'react'
import {Layout} from './layout/Layout'
import {ALL_COMPONENTS, type ComponentEntry} from './manifest'
import {pageLoader} from './page-modules'
import Home from './pages/home'
import type {RouteObject} from 'react-router'

// React.lazy must be called once per page, not on every render.
const lazyPages = new Map<string, React.LazyExoticComponent<React.ComponentType>>()

function pageFor(entry: ComponentEntry): React.ReactNode {
  const load = pageLoader(entry.slug)
  if (!load) return <ComingSoon title={entry.title} />
  let Page = lazyPages.get(entry.slug)
  if (!Page) {
    Page = React.lazy(load)
    lazyPages.set(entry.slug, Page)
  }
  return (
    <React.Suspense fallback={null}>
      <Page />
    </React.Suspense>
  )
}

function ComingSoon({title}: {title: string}) {
  return (
    <div>
      <h1>{title}</h1>
      <p>Showcase page coming soon.</p>
    </div>
  )
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <Home />},
      ...ALL_COMPONENTS.map(entry => ({
        path: `components/${entry.slug}`,
        element: pageFor(entry),
      })),
    ],
  },
]
