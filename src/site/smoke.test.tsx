// @vitest-environment happy-dom
/**
 * Mount-smoke test: every showcase page must render without throwing.
 * Guards the deployed site against runtime crashes as components evolve.
 */
import {createRoot} from 'react-dom/client'
import {createMemoryRouter} from 'react-router'
import {RouterProvider} from 'react-router/dom'
import {describe, expect, it, vi} from 'vitest'
import {ALL_COMPONENTS} from './manifest'
import {pageModules} from './page-modules'
import {routes} from './routes'

// Minimal browser APIs happy-dom lacks.
if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
}
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia
}

it('every manifest entry has a page module', () => {
  const missing = ALL_COMPONENTS.filter(e => !pageModules[`./pages/${e.slug}.tsx`])
  expect(missing.map(e => e.slug)).toEqual([])
})

describe('showcase pages mount without throwing', () => {
  for (const entry of ALL_COMPONENTS) {
    it(entry.slug, async () => {
      const load = pageModules[`./pages/${entry.slug}.tsx`]
      const {default: Page} = await load()
      const container = document.createElement('div')
      document.body.appendChild(container)
      const errors: unknown[] = []
      const spy = vi.spyOn(console, 'error').mockImplementation((...args) => {
        errors.push(args[0])
      })
      const root = createRoot(container, {
        onUncaughtError: err => errors.push(err),
      })
      try {
        await new Promise<void>(resolve => {
          root.render(
            <RouterProvider
              router={createMemoryRouter(
                [{path: '/', element: <Page />}],
                {initialEntries: ['/']},
              )}
            />,
          )
          // Let effects (zag machines, timers scheduled at mount) flush.
          setTimeout(resolve, 20)
        })
        const thrown = errors.find(e => e instanceof Error)
        if (thrown) throw thrown
      } finally {
        spy.mockRestore()
        root.unmount()
        container.remove()
      }
    })
  }
})

it('root routes include home and all component paths', () => {
  const children = routes[0].children ?? []
  expect(children.length).toBe(ALL_COMPONENTS.length + 1)
})
