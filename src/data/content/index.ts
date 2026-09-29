/**
 * Contenido largo de las páginas de servicio y de reto, por slug.
 *
 * Va un fichero por página en vez de dentro de `catalog.ts`: ocho páginas de
 * 1.500 palabras allí lo dejarían inservible como mapa de rutas y metadatos,
 * que es para lo que existe.
 *
 * `catalog.ts` lo fusiona en la entrada correspondiente, así que basta con
 * registrar aquí el fichero nuevo; no hay que tocar la página.
 */

import { actualizacionJava } from './actualizacion-java.ts'
import { apisRest } from './apis-rest.ts'
import { desarrolloJava } from './desarrollo-java.ts'
import { migracionJavaEeJakartaEe } from './migracion-java-ee-jakarta-ee.ts'
import { migracionJavaLegacy } from './migracion-java-legacy.ts'
import { migracionSpringBoot } from './migracion-spring-boot.ts'
import { modernizacionJava } from './modernizacion-java.ts'
import { springBoot } from './spring-boot.ts'
import type { EntryContent } from '../contentTypes.ts'

export const contentBySlug: Record<string, EntryContent> = {
  'actualizacion-java': actualizacionJava,
  'migracion-java-ee-jakarta-ee': migracionJavaEeJakartaEe,
  'migracion-java-legacy': migracionJavaLegacy,
  'migracion-spring-boot': migracionSpringBoot,
  'modernizacion-java': modernizacionJava,
  'desarrollo-java': desarrolloJava,
  'spring-boot': springBoot,
  'apis-rest': apisRest,
}
