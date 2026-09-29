import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { assertCatalogIntegrity } from '../src/data/catalog.ts'
import {
  NOT_FOUND_META,
  PRERENDER_ROUTES,
  SITE_URL,
  buildHeadHtml,
  getRouteMeta,
} from '../src/seo/routeMeta.ts'

const SEO_START = '<!--seo:start-->'
const SEO_END = '<!--seo:end-->'
const ROOT_PLACEHOLDER = '<div id="root"></div>'

/**
 * Escribe un index.html por ruta dentro de dist/client, con el marcado ya
 * renderizado y el <head> de esa ruta.
 *
 * Se ejecuta DESPUÉS del build de cliente, porque parte de su index.html: el
 * que ya lleva inyectados los <script> y <link> con hash.
 */
export async function writePrerenderedPages(root: string): Promise<void> {
  const clientDir = path.resolve(root, 'dist/client')
  const templatePath = path.join(clientDir, 'index.html')

  // Se lee una sola vez: la ruta '/' sobreescribe este mismo fichero.
  const template = fs.readFileSync(templatePath, 'utf-8')

  const start = template.indexOf(SEO_START)
  const end = template.indexOf(SEO_END)

  if (start === -1 || end === -1) {
    throw new Error(
      `index.html no tiene los marcadores ${SEO_START} / ${SEO_END}: el prerender no sabe dónde escribir el <head>.`,
    )
  }

  if (!template.includes(ROOT_PLACEHOLDER)) {
    throw new Error(
      `index.html no contiene exactamente ${ROOT_PLACEHOLDER}: el prerender no sabe dónde insertar el marcado.`,
    )
  }

  assertEveryRouteIsPrerendered(root)

  // En modo estricto: un enlace interno roto dentro de la copia larga es un
  // 404 que no ve nadie hasta que lo ve un buscador.
  assertCatalogIntegrity(true)

  const entry = pathToFileURL(path.resolve(root, 'dist/ssr/entry-server.js')).href
  const { render } = (await import(/* @vite-ignore */ entry)) as {
    render: (route: string) => string
  }

  /** Inserta el <head> y el marcado de una ruta en la plantilla del build. */
  function compose(appHtml: string, head: string, prerenderPath?: string): string {
    const root = prerenderPath
      ? `<div id="root" data-prerender-path="${prerenderPath}">${appHtml}</div>`
      : `<div id="root">${appHtml}</div>`

    return (
      template.slice(0, start + SEO_START.length) +
      '\n' +
      head +
      '\n    ' +
      template.slice(end)
    ).replace(ROOT_PLACEHOLDER, root)
  }

  for (const route of PRERENDER_ROUTES) {
    const html = compose(render(route), buildHeadHtml(getRouteMeta(route)), route)
    const outDir = route === '/' ? clientDir : path.join(clientDir, route)

    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8')
  }

  // Página de error, que Cloudflare sirve con status 404 ante cualquier ruta
  // sin fichero (`not_found_handling: "404-page"` en wrangler.jsonc).
  //
  // Va SIN data-prerender-path a propósito: el mismo fichero se sirve en
  // infinitas URLs distintas, así que main.tsx no debe hidratar. Al faltar el
  // atributo hace createRoot() y React pinta NotFound para la URL real.
  fs.writeFileSync(
    path.join(clientDir, '404.html'),
    compose(render('/404'), buildHeadHtml(NOT_FOUND_META)),
    'utf-8',
  )

  writeSitemap(clientDir)

  console.log(
    `✓ prerender: ${PRERENDER_ROUTES.length} páginas + 404.html escritas en dist/client`,
  )
}

/**
 * Comprueba que toda ruta declarada en AppRoutes.tsx se prerenderiza.
 *
 * Importa porque con `not_found_handling: "404-page"` una ruta sin fichero deja
 * de ser "una página fea con 200" y pasa a ser un 404 duro en una URL buena.
 * Es una lectura del fuente, no un análisis del árbol de React: basta para
 * cazar el descuido y falla de forma ruidosa en cada build.
 */
function assertEveryRouteIsPrerendered(root: string): void {
  const source = fs.readFileSync(path.resolve(root, 'src/AppRoutes.tsx'), 'utf-8')

  const declared = [...source.matchAll(/path="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((route) => route !== '*')

  const prerendered = new Set(PRERENDER_ROUTES)
  const missing = declared.filter((route) => !prerendered.has(route))

  if (missing.length > 0) {
    throw new Error(
      `Rutas declaradas en src/AppRoutes.tsx que no se prerenderizan: ${missing.join(', ')}.\n` +
        'Añádelas a src/seo/routeMeta.ts (o al catálogo del que salen) o servirán un 404.',
    )
  }

  const orphan = PRERENDER_ROUTES.filter((route) => !declared.includes(route))

  if (orphan.length > 0) {
    throw new Error(
      `Rutas prerenderizadas que no existen en src/AppRoutes.tsx: ${orphan.join(', ')}.`,
    )
  }
}

/**
 * El sitemap se genera de las mismas rutas que se prerenderizan, para que no
 * puedan desincronizarse. Se excluyen las que van con noindex (las legales).
 */
function writeSitemap(clientDir: string): void {
  const urls = PRERENDER_ROUTES.filter(
    (route) => !(getRouteMeta(route).robots ?? '').includes('noindex'),
  )

  const body = urls
    .map((route) => `  <url>\n    <loc>${SITE_URL}${route}</loc>\n  </url>`)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

  fs.writeFileSync(path.join(clientDir, 'sitemap.xml'), xml, 'utf-8')

  console.log(`✓ sitemap: ${urls.length} URL`)
}
