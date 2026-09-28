import { Link } from 'react-router-dom'

export type Crumb = {
  label: string
  to?: string
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
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
    </nav>
  )
}
