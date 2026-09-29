/**
 * Metadatos de <head> por ruta: fuente única para el prerender (que los
 * escribe en el HTML de cada página) y para el cliente (que los reaplica al
 * navegar dentro de la SPA).
 *
 * Este módulo lo importa también Node durante el build, así que no puede
 * tocar el DOM, importar React ni usar `import.meta.env`.
 */

import { catalog, retos, services, SITE_URL } from '../data/catalog.ts'
import type { CatalogEntry } from '../data/catalog.ts'

export { SITE_URL }
export const SITE_NAME = 'JavaEvolve'

/** Marca las etiquetas del <head> gestionadas por este módulo. */
export const MANAGED_ATTR = 'data-seo'

/*
 * Nodos con @id, para que el resto del grafo los referencie en vez de
 * repetirlos. Dos descripciones sueltas de la misma marca compiten entre sí
 * como entidades distintas.
 */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

/**
 * Perfiles públicos de la MARCA, para `sameAs`.
 *
 * Nunca perfiles personales ni GitHub: el titular no aparece. Mientras esté
 * vacío no se emite el campo, porque un `sameAs: []` es peor que no declarar
 * nada.
 */
const SAME_AS: string[] = [
  // 'https://www.linkedin.com/company/javaevolve/',
]

export interface RouteMeta {
  title: string
  description: string
  /** Ruta del sitio, con barra final. */
  path: string
  robots?: string
  ogType?: string
  jsonLd?: Record<string, unknown>[]
}

/** '/servicios/spring-boot' → '/servicios/spring-boot/' ; '' → '/' */
export function normalizePath(pathname: string): string {
  if (!pathname) return '/'

  return pathname.endsWith('/') ? pathname : `${pathname}/`
}

function serviceSchema(entry: CatalogEntry): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: entry.title,
    description: entry.seoDescription,
    provider: { '@id': ORGANIZATION_ID },
    isPartOf: { '@id': WEBSITE_ID },
    url: `${SITE_URL}${entry.path}`,
    mainEntityOfPage: `${SITE_URL}${entry.path}`,
    areaServed: 'ES',
  }
}

/** ItemList de una página índice. El orden es el que ve quien la lee. */
function itemListSchema(
  entries: CatalogEntry[],
  name: string,
  path: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    url: `${SITE_URL}${path}`,
    numberOfItems: entries.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: entries.map((entry, position) => ({
      '@type': 'ListItem',
      position: position + 1,
      url: `${SITE_URL}${entry.path}`,
      name: entry.title,
    })),
  }
}

/**
 * La marca es un único nodo: `Organization` y `ProfessionalService` a la vez.
 * Declararlas por separado crearía dos entidades compitiendo por el mismo
 * nombre.
 */
const organizationSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  description:
    'Desarrollo backend Java, Spring Boot, APIs REST y modernización de aplicaciones empresariales.',
  email: 'contacto@javaevolve.com',
  areaServed: 'ES',
  availableLanguage: 'es',
  knowsLanguage: 'es',
  serviceType: [
    'Desarrollo Java',
    'Desarrollo Backend',
    'Spring Boot',
    'APIs REST',
    'Modernización de aplicaciones Java',
  ],
  ...(SAME_AS.length > 0 ? { sameAs: SAME_AS } : {}),
}

// Sin `potentialAction: SearchAction`: el sitio no tiene buscador y
// declararlo sería describir algo que no existe.
const webSiteSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: 'es-ES',
  publisher: { '@id': ORGANIZATION_ID },
}

const staticRoutes: Record<string, RouteMeta> = {
  '/': {
    title: 'JavaEvolve | Desarrollo Java, Backend y Modernización',
    description:
      'JavaEvolve ofrece desarrollo backend Java, Spring Boot, APIs REST y modernización de aplicaciones Java empresariales.',
    path: '/',
    jsonLd: [organizationSchema, webSiteSchema],
  },
  '/servicios/': {
    title: 'Servicios de desarrollo Java | JavaEvolve',
    description:
      'Servicios de desarrollo backend Java: Spring Boot, APIs REST, evolución de aplicaciones existentes y modernización de sistemas legacy.',
    path: '/servicios/',
    jsonLd: [
      itemListSchema(services, 'Servicios de desarrollo Java', '/servicios/'),
    ],
  },
  '/retos/': {
    title: 'Retos técnicos en aplicaciones Java | JavaEvolve',
    description:
      'Migración de Java EE a Jakarta EE, actualización de versiones de Java, evolución hacia Spring Boot y modernización de aplicaciones legacy.',
    path: '/retos/',
    jsonLd: [
      itemListSchema(retos, 'Retos técnicos en aplicaciones Java', '/retos/'),
    ],
  },
  '/aviso-legal/': {
    title: 'Aviso legal | JavaEvolve',
    description: 'Aviso legal e información del titular del sitio web de JavaEvolve.',
    path: '/aviso-legal/',
    robots: 'noindex, follow',
  },
  '/privacidad/': {
    title: 'Política de privacidad | JavaEvolve',
    description:
      'Cómo se tratan los datos facilitados a través del formulario de contacto de JavaEvolve.',
    path: '/privacidad/',
    robots: 'noindex, follow',
  },
  '/cookies/': {
    title: 'Política de cookies | JavaEvolve',
    description: 'Uso de cookies en el sitio web de JavaEvolve.',
    path: '/cookies/',
    robots: 'noindex, follow',
  },
}

const catalogRoutes: Record<string, RouteMeta> = Object.fromEntries(
  catalog.map((entry) => [
    entry.path,
    {
      title: entry.seoTitle,
      description: entry.seoDescription,
      path: entry.path,
      jsonLd: [serviceSchema(entry)],
    } satisfies RouteMeta,
  ]),
)

export const ROUTE_META: Record<string, RouteMeta> = {
  ...staticRoutes,
  ...catalogRoutes,
}

export const NOT_FOUND_META: RouteMeta = {
  title: 'Página no encontrada | JavaEvolve',
  description: 'La página solicitada no existe en JavaEvolve.',
  path: '/',
  robots: 'noindex, follow',
}

/** Rutas que se prerenderizan, en el orden en que las recorre el build. */
export const PRERENDER_ROUTES: string[] = [
  '/',
  '/servicios/',
  ...catalog.filter((entry) => entry.kind === 'servicio').map((entry) => entry.path),
  '/retos/',
  ...catalog.filter((entry) => entry.kind === 'reto').map((entry) => entry.path),
  '/aviso-legal/',
  '/privacidad/',
  '/cookies/',
]

export function getRouteMeta(pathname: string): RouteMeta {
  return ROUTE_META[normalizePath(pathname)] ?? NOT_FOUND_META
}

export interface HeadTag {
  tag: 'meta' | 'link' | 'script'
  attrs: Record<string, string>
  text?: string
}

/** Descriptores de las etiquetas del <head>, compartidos por build y cliente. */
export function buildHeadTags(meta: RouteMeta, currentPath = meta.path): HeadTag[] {
  const canonical = `${SITE_URL}${normalizePath(currentPath)}`
  const image = `${SITE_URL}/og.png`

  const tags: HeadTag[] = [
    { tag: 'meta', attrs: { name: 'description', content: meta.description } },
    { tag: 'meta', attrs: { name: 'robots', content: meta.robots ?? 'index, follow' } },
    { tag: 'link', attrs: { rel: 'canonical', href: canonical } },
    { tag: 'meta', attrs: { property: 'og:type', content: meta.ogType ?? 'website' } },
    { tag: 'meta', attrs: { property: 'og:url', content: canonical } },
    { tag: 'meta', attrs: { property: 'og:title', content: meta.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: meta.description } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: SITE_NAME } },
    { tag: 'meta', attrs: { property: 'og:locale', content: 'es_ES' } },
    { tag: 'meta', attrs: { property: 'og:image', content: image } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: meta.title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: meta.description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
  ]

  for (const data of meta.jsonLd ?? []) {
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      text: JSON.stringify(data),
    })
  }

  return tags
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Serializa el <head> gestionado. Solo lo usa el prerender, en Node. */
export function buildHeadHtml(meta: RouteMeta): string {
  const lines = [`    <title>${escapeHtml(meta.title)}</title>`]

  for (const { tag, attrs, text } of buildHeadTags(meta)) {
    const attrHtml = Object.entries(attrs)
      .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
      .join(' ')

    if (text === undefined) {
      lines.push(`    <${tag} ${MANAGED_ATTR} ${attrHtml} />`)
    } else {
      // \u003c evita que el JSON pueda cerrar el <script> desde dentro.
      lines.push(
        `    <${tag} ${MANAGED_ATTR} ${attrHtml}>${text.replace(/</g, '\\u003c')}</${tag}>`,
      )
    }
  }

  return lines.join('\n')
}
