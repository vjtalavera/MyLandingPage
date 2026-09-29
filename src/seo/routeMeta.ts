/**
 * Metadatos de <head> por ruta: fuente única para el prerender (que los
 * escribe en el HTML de cada página) y para el cliente (que los reaplica al
 * navegar dentro de la SPA).
 *
 * Este módulo lo importa también Node durante el build, así que no puede
 * tocar el DOM, importar React ni usar `import.meta.env`.
 */

import { allPaths, catalog, retos, services, SITE_URL } from '../data/catalog.ts'
import { guides } from '../data/guides.ts'
import type { CatalogEntry } from '../data/catalog.ts'
import type { GuideEntry } from '../data/guides.ts'

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
  /** YYYY-MM-DD. Alimenta el <lastmod> del sitemap. Solo si es cierta. */
  updated?: string
  /** Ruta de una imagen propia para compartir, si algún día se dibuja. */
  ogImage?: string
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

/**
 * Las páginas de retos explican un problema; no son algo que se contrate. El
 * catálogo ya documenta esa distinción, y marcarlas como `Service` era
 * inexacto.
 *
 * `author` apunta a la organización, no a una persona: schema.org lo admite y
 * encaja con que el titular no aparezca.
 */
type ArticleLike = Pick<
  CatalogEntry,
  'title' | 'navLabel' | 'seoDescription' | 'path' | 'published' | 'updated'
>

function techArticleSchema(
  entry: ArticleLike,
  about?: Record<string, unknown>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: entry.title,
    description: entry.seoDescription,
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'es-ES',
    url: `${SITE_URL}${entry.path}`,
    mainEntityOfPage: `${SITE_URL}${entry.path}`,
    datePublished: entry.published,
    dateModified: entry.updated,
    // Ata el artículo a lo que sí se puede contratar sin crear un segundo
    // nodo principal que compita con él.
    ...(about ? { about } : {}),
  }
}

/** ItemList de una página índice. El orden es el que ve quien la lee. */
function itemListSchema(
  entries: { title: string; path: string }[],
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
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/apple-touch-icon.png`,
    width: 180,
    height: 180,
  },
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
    updated: '2026-09-29',
    jsonLd: [organizationSchema, webSiteSchema],
  },
  '/servicios/': {
    title: 'Servicios de desarrollo Java | JavaEvolve',
    description:
      'Servicios de desarrollo backend Java: Spring Boot, APIs REST, evolución de aplicaciones existentes y modernización de sistemas legacy.',
    path: '/servicios/',
    updated: '2026-09-29',
    jsonLd: [
      itemListSchema(services, 'Servicios de desarrollo Java', '/servicios/'),
    ],
  },
  '/retos/': {
    title: 'Retos técnicos en aplicaciones Java | JavaEvolve',
    description:
      'Migración de Java EE a Jakarta EE, actualización de versiones de Java, evolución hacia Spring Boot y modernización de aplicaciones legacy.',
    path: '/retos/',
    updated: '2026-09-29',
    jsonLd: [
      itemListSchema(retos, 'Retos técnicos en aplicaciones Java', '/retos/'),
    ],
  },
  '/guias/': {
    title: 'Guías técnicas de migración Java | JavaEvolve',
    description:
      'Guías con los comandos, los errores literales y las comprobaciones que hacen falta para migrar una aplicación Java sin sorpresas.',
    path: '/guias/',
    updated: '2026-09-29',
    jsonLd: [itemListSchema(guides, 'Guías técnicas', '/guias/')],
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
      updated: entry.updated,
      jsonLd: [
        entry.kind === 'reto'
          ? techArticleSchema(entry, {
              '@type': 'Service',
              name: entry.navLabel,
              provider: { '@id': ORGANIZATION_ID },
            })
          : serviceSchema(entry),
      ],
    } satisfies RouteMeta,
  ]),
)

const guideRoutes: Record<string, RouteMeta> = Object.fromEntries(
  guides.map((guide: GuideEntry) => [
    guide.path,
    {
      title: guide.seoTitle,
      description: guide.seoDescription,
      path: guide.path,
      updated: guide.updated,
      ogType: 'article',
      jsonLd: [techArticleSchema(guide)],
    } satisfies RouteMeta,
  ]),
)

export const ROUTE_META: Record<string, RouteMeta> = {
  ...staticRoutes,
  ...catalogRoutes,
  ...guideRoutes,
}

export const NOT_FOUND_META: RouteMeta = {
  title: 'Página no encontrada | JavaEvolve',
  description: 'La página solicitada no existe en JavaEvolve.',
  path: '/',
  robots: 'noindex, follow',
}

/**
 * Rutas que se prerenderizan, en el orden en que las recorre el build.
 *
 * Es exactamente `allPaths`: el catálogo es el único sitio donde se declara
 * una URL pública. Cuando eran dos listas separadas había que acordarse de
 * tocar las dos, y olvidar una hacía que `assertCatalogIntegrity` marcase
 * como roto un enlace interno que era perfectamente válido.
 */
export const PRERENDER_ROUTES: string[] = allPaths

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
  // og.png mide 1200x630, que es lo que declaran las etiquetas de abajo.
  const image = `${SITE_URL}${meta.ogImage ?? '/og.png'}`

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
    { tag: 'meta', attrs: { property: 'og:image:type', content: 'image/png' } },
    { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
    { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
    { tag: 'meta', attrs: { property: 'og:image:alt', content: meta.title } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: meta.title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: meta.description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
    { tag: 'meta', attrs: { name: 'twitter:image:alt', content: meta.title } },
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
