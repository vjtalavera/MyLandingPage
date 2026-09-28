import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { normalizePath } from './seo/routeMeta'
import { assertCatalogIntegrity } from './data/catalog'

if (import.meta.env.DEV) {
  assertCatalogIntegrity()
}

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// El HTML prerenderizado declara a qué ruta corresponde. Hace falta
// comprobarlo: con `not_found_handling: single-page-application`, Cloudflare
// sirve el HTML de la home ante cualquier URL desconocida, así que hidratar a
// ciegas ahí daría un desajuste total contra el árbol de la 404.
const prerendered = container.dataset.prerenderPath

const canHydrate =
  prerendered !== undefined &&
  container.firstChild !== null &&
  normalizePath(prerendered) === normalizePath(window.location.pathname)

if (canHydrate) {
  hydrateRoot(container, app)
} else {
  container.replaceChildren()
  createRoot(container).render(app)
}
