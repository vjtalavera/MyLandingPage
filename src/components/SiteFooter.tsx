import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return (
    <footer>
      <div className="container footer-inner">
        <div>
          <strong>JavaEvolve</strong>
          <span>Desarrollo Java · Backend · Modernización</span>
        </div>

        <div className="footer-links">
          <Link to="/#servicios">Servicios</Link>
          <Link to="/#retos">Retos técnicos</Link>
          <Link to="/#contacto">Contacto</Link>
        </div>

        <div className="footer-legal">
          <Link to="/aviso-legal/">Aviso Legal</Link>
          <Link to="/privacidad/">Privacidad</Link>
          <Link to="/cookies/">Cookies</Link>
        </div>
      </div>
    </footer>
  )
}
