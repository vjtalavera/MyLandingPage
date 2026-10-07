import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'
import ContentSections from '../../components/ContentSections'
import Faq from '../../components/Faq'
import PageToc from '../../components/PageToc'
import { Paragraphs } from '../../components/Prose'
import RelatedLinks from '../../components/RelatedLinks'
import type { CatalogEntry } from '../../data/catalog'
import { OFFER } from '../../data/offer'

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

          <div className="hero-split">
            <div>
              <p className="eyebrow is-lead">{entry.eyebrow}</p>

              <h1>{entry.title}</h1>

              <p className="service-intro">{entry.intro}</p>

              <Link className="button primary" to="/#contacto">
                {entry.ctaText}
              </Link>
            </div>

            {entry.sections ? <PageToc blocks={entry.sections} /> : null}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container service-content">
          <div>
            <p className="eyebrow">El reto</p>

            <h2>{entry.problemTitle}</h2>
          </div>

          <div>
            <Paragraphs value={entry.problemBody} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Qué se analiza</p>

          <h2>{entry.bulletsTitle ?? 'Puntos que entran en el análisis'}</h2>

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

          <h2>
            {entry.technologiesTitle ?? 'Sobre el ecosistema Java empresarial'}
          </h2>

          <ul className="tech-list">
            {entry.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </section>

      {entry.sections ? <ContentSections blocks={entry.sections} /> : null}

      {entry.faq ? (
        <Faq
          items={entry.faq}
          id={`faq-${entry.slug}`}
          title={entry.faqTitle ?? 'Preguntas frecuentes sobre este reto'}
        />
      ) : null}

      <RelatedLinks entry={entry} title={entry.relatedTitle} />

      <section className="section service-cta">
        <div className="container">
          <p className="eyebrow">¿Tienes este reto?</p>

          <h2>{entry.ctaTitle ?? 'Analicemos tu aplicación'}</h2>

          <p>
            {entry.ctaBody ??
              'Cuéntame brevemente el estado actual de tu aplicación y qué necesitas evolucionar. Miramos el contexto técnico y las posibles líneas de actuación.'}
          </p>

          <Link className="button primary" to="/#contacto">
            {OFFER.cta}
          </Link>

          <p className="cta-note">{OFFER.note}</p>
        </div>
      </section>
    </>
  )
}
