import { Outlet } from 'react-router-dom'
import ScrollManager from './ScrollManager'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import useRouteMeta from '../seo/useRouteMeta'

export default function Layout() {
  // Envuelve todas las rutas, incluida la de 404, y no se desmonta al navegar:
  // es el único sitio donde basta con gestionar el <head> una vez.
  useRouteMeta()

  return (
    <div className="site">
      <ScrollManager />

      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <SiteHeader />

      <main id="contenido">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  )
}
