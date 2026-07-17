// Explicit global-styles import — mirrors the `styles.css` subpath consumers
// use; the barrel's side-effect import can be tree-shaken in app builds.
import '../components/styles/charizard.css'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createHashRouter} from 'react-router'
import {RouterProvider} from 'react-router/dom'
import {routes} from './routes'

// Hash router so the static GitHub Pages deployment needs no 404 fallback.
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={createHashRouter(routes)} />
  </StrictMode>,
)
