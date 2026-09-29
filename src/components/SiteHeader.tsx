import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Servicios y Retos son páginas reales, no anclas de la home: así el menú
// lleva a un nivel de navegación propio y no siempre a la misma página.
const navLinks = [
  { to: '/servicios/', label: 'Servicios' },
  { to: '/retos/', label: 'Retos' },
  { to: '/guias/', label: 'Guías' },
  { to: '/#tecnologias', label: 'Tecnologías' },
  { to: '/#contacto', label: 'Contacto' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <header className="header">
      <div className="container header-inner">
        <Link className="logo" to="/" onClick={() => setOpen(false)}>
          Java<span>Evolve</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-principal"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav-toggle-bars" aria-hidden="true" />
        </button>

        <nav
          id="nav-principal"
          className={open ? 'site-nav is-open' : 'site-nav'}
        >
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
