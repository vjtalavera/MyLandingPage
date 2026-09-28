import { Link } from 'react-router-dom'
import { SITE_URL } from '../data/catalog'

export type Crumb = {
  label: string
  to?: string
}

/**
 * Migas de pan + su BreadcrumbList en JSON-LD, que se emite aquí mismo (no en
 * el <head>) para que el prerender lo incluya en el HTML: schema.org admite
 * JSON-LD en el cuerpo del documento.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.to ? { item: `${SITE_URL}${item.to}` } : {}),
    })),
  }

  return (
    <nav className="breadcrumbs" aria-label="Migas de pan">
      <ol>
        {items.map((item, index) => (
          <li key={item.label}>
            {item.to && index < items.length - 1 ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
    </nav>
  )
}
