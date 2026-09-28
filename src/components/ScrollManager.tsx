import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Gestiona el scroll en las navegaciones de react-router:
 * - Con hash (/#contacto) hace scroll hasta la sección correspondiente.
 *   React Router usa pushState y el navegador no re-ancla el hash por sí solo.
 * - Sin hash y con cambio de ruta, vuelve al principio de la página.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
      return
    }

    const id = decodeURIComponent(hash.slice(1))

    // Se espera al siguiente frame para que la sección destino ya esté montada
    // tras el cambio de ruta.
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })

    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
