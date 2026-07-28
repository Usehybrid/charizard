import * as React from 'react'
import {Layout} from './layout/Layout'
import {ALL_COMPONENTS, type ComponentEntry} from './manifest'
import {pageLoader} from './page-modules'
import {ApiReference} from './showcase/ApiReference'
import {Pager} from './showcase/Pager'
import Changelog from './pages/changelog'
import Home from './pages/home'
import type {RouteObject} from 'react-router'

// React.lazy must be called once per page, not on every render.
const lazyPages = new Map<string, React.LazyExoticComponent<React.ComponentType>>()

/**
 * A component route = the showcase page, then the generated API reference, then
 * the pager. Both tails live here rather than in the 40 page files so every
 * page gets them without repetition.
 */
function pageFor(entry: ComponentEntry): React.ReactNode {
  const load = pageLoader(entry.slug)
  return (
    <>
      {load ? (
        <React.Suspense fallback={null}>
          {React.createElement(lazyPage(entry.slug, load))}
        </React.Suspense>
      ) : (
        <ComingSoon title={entry.title} />
      )}
      <ApiReference entry={entry} />
      <Pager slug={entry.slug} />
    </>
  )
}

function lazyPage(slug: string, load: () => Promise<{default: React.ComponentType}>) {
  let Page = lazyPages.get(slug)
  if (!Page) {
    Page = React.lazy(load)
    lazyPages.set(slug, Page)
  }
  return Page
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
      {path: 'changelog', element: <Changelog />},
      ...ALL_COMPONENTS.map(entry => ({
        path: `components/${entry.slug}`,
        element: pageFor(entry),
      })),
    ],
  },
]
