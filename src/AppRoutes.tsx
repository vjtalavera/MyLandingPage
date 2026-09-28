import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

import ServiciosIndex from './pages/ServiciosIndex'
import ApisRest from './pages/ApisRest'
import DesarrolloJava from './pages/DesarrolloJava'
import ModernizacionJava from './pages/ModernizacionJava'
import SpringBoot from './pages/SpringBoot'

import RetosIndex from './pages/retos/RetosIndex'
import MigracionJavaEeJakarta from './pages/retos/MigracionJavaEeJakarta'
import JavaLegacy from './pages/retos/JavaLegacy'
import MigracionSpringBoot from './pages/retos/MigracionSpringBoot'
import ActualizacionJava from './pages/retos/ActualizacionJava'

import AvisoLegal from './pages/legal/AvisoLegal'
import Privacidad from './pages/legal/Privacidad'
import Cookies from './pages/legal/Cookies'

/**
 * Árbol de rutas sin router, para que cliente (BrowserRouter) y prerender
 * (StaticRouter, en src/entry-server.tsx) compartan exactamente el mismo árbol.
 *
 * Dos cosas a tener en cuenta al tocar este fichero:
 * - Ningún componente del árbol puede leer `window` o `document` durante el
 *   render: el prerender se ejecuta en Node y fallaría el build.
 * - Toda ruta nueva necesita su entrada en `src/seo/routeMeta.ts`, o no se
 *   prerenderiza y hereda los metadatos de "página no encontrada".
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route path="/servicios/" element={<ServiciosIndex />} />

        <Route
          path="/servicios/desarrollo-java/"
          element={<DesarrolloJava />}
        />

        <Route path="/servicios/spring-boot/" element={<SpringBoot />} />

        <Route path="/servicios/apis-rest/" element={<ApisRest />} />

        <Route
          path="/servicios/modernizacion-java/"
          element={<ModernizacionJava />}
        />

        <Route path="/retos/" element={<RetosIndex />} />

        <Route
          path="/retos/migracion-java-ee-jakarta-ee/"
          element={<MigracionJavaEeJakarta />}
        />

        <Route path="/retos/migracion-java-legacy/" element={<JavaLegacy />} />

        <Route
          path="/retos/migracion-spring-boot/"
          element={<MigracionSpringBoot />}
        />

        <Route
          path="/retos/actualizacion-java/"
          element={<ActualizacionJava />}
        />

        <Route path="/aviso-legal/" element={<AvisoLegal />} />

        <Route path="/privacidad/" element={<Privacidad />} />

        <Route path="/cookies/" element={<Cookies />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
