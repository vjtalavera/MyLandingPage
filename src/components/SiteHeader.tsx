import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// Servicios y Retos son páginas reales, no anclas de la home: así el menú
// lleva a un nivel de navegación propio y no siempre a la misma página.
const navLinks = [
  { to: '/servicios/', label: 'Servicios' },
  { to: '/retos/', label: 'Retos' },
  { to: '/guias/', label: 'Guías' },
  { to: '/#tecnologias', label: 'Tecnologías' },
  { to: '/#contacto', label: 'Contacto' },
]

/** Anclas que el menú puede señalar como sección actual. */
const navAnchors = navLinks
  .filter((link) => link.to.includes('#'))
  .map((link) => link.to.slice(link.to.indexOf('#') + 1))

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')
  const { pathname } = useLocation()

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  /*
   * Sección actual del menú. El estado arranca vacío tanto en el servidor como
   * en el cliente y solo cambia dentro del efecto, que corre después de
   * hidratar: el primer render coincide con el HTML prerenderizado y no hay
   * mismatch.
   *
   * El margen inferior del -55% hace que una sección deje de contar en cuanto
   * su mitad superior sale de pantalla; sin él, dos secciones largas se
   * disputan el marcado a la vez.
   */
  useEffect(() => {
    const sections = navAnchors
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        setActiveId((current) => {
          const visible = entries.filter((entry) => entry.isIntersecting)

          if (visible.length > 0) {
            return visible[visible.length - 1].target.id
          }

          // Al salir de la última marcada no hay relevo: se apaga el indicador
          // en vez de dejarlo encendido en una sección que ya no se ve.
          const leftCurrent = entries.some(
            (entry) => !entry.isIntersecting && entry.target.id === current,
          )

          return leftCurrent ? '' : current
        })
      },
      { rootMargin: '-20% 0px -55% 0px' },
    )

    sections.forEach((section) => observer.observe(section))

    // El apagado va en la limpieza, no al entrar: al salir de la home el
    // efecto siguiente no encuentra secciones y retorna sin tocar el estado,
    // así que sin esto "Contacto" se quedaría marcado en /servicios/.
    return () => {
      observer.disconnect()
      setActiveId('')
    }
  }, [pathname])

  return (
    <header className="header">
      {/*
        Progreso de lectura. Es puramente decorativo (aria-hidden) y se dibuja
        con una animación ligada al scroll del documento: sin soporte se queda
        en scaleX(0), es decir, invisible. Ningún JS lo toca.
      */}
      <div className="read-progress" aria-hidden="true" />

      <div className="container header-inner">
        <Link className="logo" to="/" onClick={() => setOpen(false)}>
          Java<span>Evolve</span>
        </Link>

        {/*
          Orden del DOM: logo, menú, CTA, botón de menú. Es el orden visual en
          escritorio (el botón no se pinta) y también en móvil con el menú
          cerrado, donde el <nav> sale del flujo y quedan logo, CTA y botón. El
          recorrido con Tab coincide así con lo que se ve en los dos casos.
        */}
        <nav
          id="nav-principal"
          className={open ? 'site-nav is-open' : 'site-nav'}
        >
          {navLinks.map((link) => {
            const anchor = link.to.includes('#')
              ? link.to.slice(link.to.indexOf('#') + 1)
              : ''

            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                aria-current={
                  anchor && anchor === activeId ? 'location' : undefined
                }
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/*
          CTA persistente. El header ya es sticky, así que esto cubre lo que en
          otras landings resuelve una barra flotante inferior, sin robar alto de
          pantalla en móvil ni duplicar la misma acción dos veces a la vista.
          En móvil se acorta el rótulo: el largo sigue ahí para el lector de
          pantalla.
        */}
        <Link className="button primary header-cta" to="/#contacto">
          <span className="header-cta-long">Cuéntame tu proyecto</span>
          <span className="header-cta-short" aria-hidden="true">
            Hablemos
          </span>
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
      </div>
    </header>
  )
}
