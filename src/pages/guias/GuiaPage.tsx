import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'
import ContentSections from '../../components/ContentSections'
import Faq from '../../components/Faq'
import OfferCta from '../../components/OfferCta'
import PageToc from '../../components/PageToc'
import type { GuideEntry } from '../../data/guides'
import { OFFER } from '../../data/offer'

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
              <p className="eyebrow is-lead">{guide.eyebrow}</p>

              <h1>{guide.title}</h1>

              <p className="service-intro">{guide.intro}</p>

              {/* Discreto a propósito: quien llega a una guía viene a leer.
                  Es la salida para quien, a la segunda línea, ya sabe que
                  prefiere que se lo miren. */}
              <p className="guide-offer">
                ¿Prefieres que lo mire en tu aplicación?{' '}
                <Link to="/#diagnostico">
                  Diagnóstico gratuito de {OFFER.duration} →
                </Link>
              </p>
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

      <OfferCta
        eyebrow="JavaEvolve"
        title={guide.ctaTitle ?? '¿Te has encontrado con esto en tu aplicación?'}
        body={
          guide.ctaBody ??
          'Si el caso concreto no encaja con lo que hay aquí, cuéntamelo y te digo por dónde lo abordaría.'
        }
      />
    </>
  )
}
