import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'
import ContentSections from '../../components/ContentSections'
import Faq from '../../components/Faq'
import PageToc from '../../components/PageToc'
import type { GuideEntry } from '../../data/guides'

/**
 * Plantilla de guía técnica. Mismo contrato que `ServicePage`: el contenido
 * sale de `src/data/guides.ts` y los metadatos de `src/seo/routeMeta.ts`.
 */
export default function GuiaPage({ guide }: { guide: GuideEntry }) {
  return (
    <>
      <section className="service-hero">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Inicio', to: '/' },
              { label: 'Guías', to: '/guias/' },
              { label: guide.navLabel },
            ]}
          />

          <div className="hero-split">
            <div>
              <p className="eyebrow">{guide.eyebrow}</p>

              <h1>{guide.title}</h1>

              <p className="service-intro">{guide.intro}</p>
            </div>

            <PageToc blocks={guide.sections} />
          </div>
        </div>
      </section>

      <ContentSections blocks={guide.sections} />

      <Faq
        items={guide.faq}
        id={`faq-${guide.slug}`}
        title={guide.faqTitle ?? 'Preguntas frecuentes'}
      />

      <section className="service-cta section">
        <div className="container">
          <p className="eyebrow">JavaEvolve</p>

          <h2>¿Te has encontrado con esto en tu aplicación?</h2>

          <p>
            Si el caso concreto no encaja con lo que hay aquí, cuéntamelo y te
            digo por dónde lo abordaría.
          </p>

          <Link className="button primary" to="/#contacto">
            Escríbeme
          </Link>
        </div>
      </section>
    </>
  )
}
