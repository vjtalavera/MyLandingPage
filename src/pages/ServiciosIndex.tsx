import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import { services } from '../data/catalog'

export default function ServiciosIndex() {
  return (
    <>
      <section className="service-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Servicios' }]} />

          <p className="eyebrow">Servicios</p>

          <h1>Desarrollo y evolución de aplicaciones Java</h1>

          <p className="index-intro">
            Cuatro formas de trabajar sobre un backend Java: construir lo que
            falta, llevarlo a Spring Boot, exponerlo como API o modernizar lo
            que ya hay sin parar la aplicación.
          </p>

          <p className="index-intro">
            Si no tienes claro cuál encaja con tu caso, el punto de partida
            siempre es el mismo: mirar el código y las dependencias antes de
            proponer nada.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards four">
            {services.map((entry, position) => (
              <article
                className={`card service-card${entry.featured ? ' featured' : ''}`}
                key={entry.slug}
              >
                <span className="service-tag">
                  {String(position + 1).padStart(2, '0')}
                </span>

                <h2>{entry.navLabel}</h2>

                <p>{entry.cardText}</p>

                <Link to={entry.path}>Ver servicio →</Link>
              </article>
            ))}
          </div>

          <div className="challenge-cta">
            <p>¿No sabes por dónde empezar?</p>

            <Link className="button primary" to="/#contacto">
              Cuéntame tu caso
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
