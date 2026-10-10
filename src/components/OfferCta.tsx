import { Link } from 'react-router-dom'
import { OFFER } from '../data/offer'

/**
 * Cierre de las páginas de servicio, de reto y de guía. Cada página aporta su
 * propio titular y su texto; lo común (el botón, la nota de la oferta y qué
 * pasa en la llamada) vive aquí, para que las tres digan lo mismo.
 */
export default function OfferCta({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <section className="service-cta section">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>

        <h2>{title}</h2>

        <p>{body}</p>

        <Link className="button primary" to="/#contacto">
          {OFFER.cta}
        </Link>

        <p className="cta-note">{OFFER.note}</p>

        <p className="cta-includes">
          En la llamada: versión de Java, framework, servidor y qué duele hoy.
          Si no puedo ayudarte, te lo digo.{' '}
          <Link to="/#diagnostico">Qué incluye el diagnóstico</Link>
        </p>
      </div>
    </section>
  )
}
