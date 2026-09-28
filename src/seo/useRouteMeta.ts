import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { MANAGED_ATTR, buildHeadTags, getRouteMeta } from './routeMeta'

/**
 * Mantiene el <head> sincronizado con la ruta activa durante la navegación.
 *
 * Borra y reinserta en lugar de actualizar en sitio: es la única forma de
 * garantizar que no queden og:* ni JSON-LD de la página anterior, que es
 * justo lo que pasaba cuando cada plantilla se gestionaba sus metadatos.
 */
export default function useRouteMeta(): void {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = getRouteMeta(pathname)

    document.title = meta.title

    for (const element of document.head.querySelectorAll(`[${MANAGED_ATTR}]`)) {
      element.remove()
    }

    for (const { tag, attrs, text } of buildHeadTags(meta, pathname)) {
      const element = document.createElement(tag)
      element.setAttribute(MANAGED_ATTR, '')

      for (const [key, value] of Object.entries(attrs)) {
        element.setAttribute(key, value)
      }

      if (text !== undefined) {
        element.textContent = text
      }

      document.head.appendChild(element)
    }
  }, [pathname])
}
