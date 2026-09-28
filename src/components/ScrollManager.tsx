import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Gestiona el scroll en las navegaciones de react-router:
 * - Con hash (/#contacto) hace scroll hasta la sección correspondiente.
 *   React Router usa pushState y el navegador no re-ancla el hash por sí solo.
 * - Sin hash y con cambio de ruta, vuelve al principio de la página.
 *
 * En el primer montaje no toca el scroll: con el HTML prerenderizado la página
 * ya llega con contenido y el navegador puede estar restaurando la posición
 * previa al recargar o al volver atrás.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false

      // Salvo que la URL traiga un ancla: ahí sí hay que ir a la sección.
      if (!hash) return
    }

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
