import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'
import RelatedLinks from '../../components/RelatedLinks'
import type { CatalogEntry } from '../../data/catalog'

/**
 * Plantilla de página de reto técnico. Mismo contrato que `ServicePage`: el
 * contenido sale del catálogo y los metadatos de `src/seo/routeMeta.ts`.
 */
export default function RetoPage({ entry }: { entry: CatalogEntry }) {
  return (
    <>
      <section className="service-hero challenge-hero">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Inicio', to: '/' },
              { label: 'Retos', to: '/retos/' },
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
          </div>

          <div>
            {entry.problemBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Qué se analiza</p>

          <ul className="service-list">
            {entry.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section service-technologies">
        <div className="container">
          <p className="eyebrow">Tecnologías relacionadas</p>

          <h2>Sobre el ecosistema Java empresarial</h2>

          <ul className="tech-list">
            {entry.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedLinks entry={entry} />

      <section className="section service-cta">
        <div className="container">
          <p className="eyebrow">¿Tienes este reto?</p>

          <h2>Analicemos tu aplicación</h2>

          <p>
            Cuéntame brevemente el estado actual de tu aplicación y qué
            necesitas evolucionar. Miramos el contexto técnico y las posibles
            líneas de actuación.
          </p>

          <Link className="button primary" to="/#contacto">
            Escríbeme
          </Link>
        </div>
      </section>
    </>
  )
}
