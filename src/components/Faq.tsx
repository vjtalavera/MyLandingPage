import { HOME_FAQ } from '../data/faq.ts'
import type { QuestionAndAnswer } from '../data/contentTypes.ts'

/**
 * Preguntas frecuentes. El JSON-LD FAQPage se genera del mismo array que se
 * renderiza, así que nunca puede desincronizarse del texto visible, y se emite
 * dentro de la sección para que el prerender lo incluya en el HTML.
 *
 * Sin props pinta las preguntas transversales de la home. Cada página de
 * servicio o de reto le pasa las suyas y su propio `id`.
 *
 * Regla: un solo FAQPage por URL. Si algún día conviven dos secciones en la
 * misma página, hay que fusionar sus `mainEntity` en un único script.
 */
interface FaqProps {
  /** Si se omite, las preguntas transversales de la home. */
  items?: QuestionAndAnswer[]
  eyebrow?: string
  title?: string
  /** Ancla de la sección, y nombre del grupo de acordeón. Único por página. */
  id?: string
  /** Modificador de plano (`section--sunken`…) para la alternancia de fondos. */
  className?: string
}

export default function Faq({
  items = HOME_FAQ,
  eyebrow = 'Preguntas frecuentes',
  title = 'Lo que suelen preguntarme antes de empezar',
  id = 'faq',
  className = '',
}: FaqProps) {
  if (items.length === 0) {
    return null
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section id={id} className={className ? `section ${className}` : 'section'}>
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{eyebrow}</p>

          <h2>{title}</h2>
        </div>

        <div className="faq-list">
          {items.map((item) => (
            // El `name` agrupa el acordeón: con el id de la sección, dos FAQ
            // distintas no se cierran entre sí.
            <details className="faq-item" name={id} key={item.question}>
              <summary>{item.question}</summary>

              <p>{item.answer}</p>
            </details>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\u003c'),
          }}
        />
      </div>
    </section>
  )
}
