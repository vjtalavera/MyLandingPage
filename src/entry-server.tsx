import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'

/**
 * Punto de entrada del prerender. Debe producir exactamente el mismo DOM que
 * `main.tsx` + `App.tsx` en el navegador: si App.tsx añadiera marcado
 * alrededor de <AppRoutes />, habría que replicarlo aquí o la hidratación
 * fallaría en todas las rutas.
 *
 * Importa AppRoutes y no App a propósito: así el grafo del build de servidor
 * no arrastra App.css.
 */
export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={path}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
}
