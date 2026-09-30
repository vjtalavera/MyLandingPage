import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="service-hero not-found">
      <div className="container">
        <p className="eyebrow is-lead">Error 404</p>

        <h1>Esta página no existe</h1>

        <p className="service-intro">
          La dirección a la que has llegado no corresponde a ninguna página de
          JavaEvolve. Puede que el enlace esté desactualizado o que la URL
          contenga una errata.
        </p>

        <div className="hero-actions">
          <Link className="button primary" to="/">
            Volver al inicio
          </Link>

          <Link className="text-link" to="/servicios/">
            Ver servicios →
          </Link>

          <Link className="text-link" to="/retos/">
            Ver retos técnicos →
          </Link>
        </div>
      </div>
    </section>
  )
}
