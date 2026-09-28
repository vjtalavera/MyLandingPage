import { Link } from 'react-router-dom'
import { relatedOf } from '../data/catalog'
import type { CatalogEntry } from '../data/catalog'

/**
 * Enlaces cruzados al pie de una página de servicio o de reto. El texto del
 * enlace describe el destino (nunca "ver más"), porque es lo que da contexto
 * tanto a quien lee como a quien indexa.
 */
export default function RelatedLinks({ entry }: { entry: CatalogEntry }) {
  const items = relatedOf(entry)

  if (items.length === 0) {
    return null
  }

  return (
    <section className="section related">
      <div className="container">
        <p className="eyebrow">Relacionado</p>

        <h2>Sigue por aquí</h2>

        <ul className="related-grid">
          {items.map(({ entry: target, anchor }) => (
            <li key={target.slug}>
              <Link to={target.path}>
                <span className="related-kind">
                  {target.kind === 'servicio' ? 'Servicio' : 'Reto'}
                </span>

                <strong>{anchor}</strong>

                <span>{target.cardText}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
