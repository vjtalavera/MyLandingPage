import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import RelatedLinks from '../components/RelatedLinks'
import type { CatalogEntry } from '../data/catalog'

/**
 * Plantilla de página de servicio. Todo el contenido viene del catálogo
 * (`src/data/catalog.ts`) y los metadatos de `src/seo/routeMeta.ts`: aquí no
 * se define texto de negocio ni se toca el <head>.
 */
export default function ServicePage({ entry }: { entry: CatalogEntry }) {
  return (
    <>
      <section className="service-hero">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Inicio', to: '/' },
              { label: 'Servicios', to: '/servicios/' },
              { label: entry.navLabel },
            ]}
          />

          <p className="eyebrow">{entry.eyebrow}</p>

          <h1>{entry.title}</h1>

          <p className="service-intro">{entry.intro}</p>

          <Link className="button primary" to="/#contacto">
            {entry.ctaText}
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container service-content">
          <div>
            <p className="eyebrow">El reto</p>

            <h2>{entry.problemTitle}</h2>

            {entry.problemBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="service-list">
            {entry.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section service-technologies">
        <div className="container">
          <p className="eyebrow">Tecnologías</p>

          <h2>Tecnologías relacionadas</h2>

          <ul className="tech-list">
            {entry.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedLinks entry={entry} />

      <section className="service-cta section">
        <div className="container">
          <p className="eyebrow">JavaEvolve</p>

          <h2>¿Quieres analizar tu caso?</h2>

          <p>
            Cada aplicación tiene un contexto diferente. Explícame brevemente
            qué necesitas y te digo si puedo ayudarte y cómo.
          </p>

          <Link className="button primary" to="/#contacto">
            Escríbeme
          </Link>
        </div>
      </section>
    </>
  )
}
