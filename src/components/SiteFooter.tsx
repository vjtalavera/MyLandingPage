import { Link } from 'react-router-dom'
import { retos, services } from '../data/catalog'

export default function SiteFooter() {
  // El HTML prerenderizado lleva el año del build y el navegador pinta el
  // actual: al cambiar de año, y hasta el siguiente despliegue, no coinciden.
  // Es la única diferencia esperada entre servidor y cliente.
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <strong>JavaEvolve</strong>
            <span>Desarrollo Java · Backend · Modernización</span>
          </div>

          <nav aria-labelledby="footer-servicios">
            <h2 id="footer-servicios">Servicios</h2>

            <ul>
              {services.map((entry) => (
                <li key={entry.slug}>
                  <Link to={entry.path}>{entry.navLabel}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-retos">
            <h2 id="footer-retos">Retos técnicos</h2>

            <ul>
              {retos.map((entry) => (
                <li key={entry.slug}>
                  <Link to={entry.path}>{entry.navLabel}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-contacto">
            <h2 id="footer-contacto">Contacto</h2>

            <ul>
              <li>
                <Link to="/#contacto">Formulario de contacto</Link>
              </li>
              <li>
                <Link to="/#faq">Preguntas frecuentes</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <span suppressHydrationWarning>© {year} JavaEvolve</span>

          <div className="footer-legal">
            <Link to="/aviso-legal/">Aviso Legal</Link>
            <Link to="/privacidad/">Privacidad</Link>
            <Link to="/cookies/">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
