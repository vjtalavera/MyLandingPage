import { Outlet } from 'react-router-dom'
import ScrollManager from './ScrollManager'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

export default function Layout() {
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
