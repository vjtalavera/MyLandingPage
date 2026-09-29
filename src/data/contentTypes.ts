/**
 * Tipos del contenido largo de las páginas de servicio y de reto.
 *
 * Viven aquí y no en `catalog.ts` para que los ficheros de `content/` no
 * dependan del catálogo y no haya importaciones circulares.
 *
 * Son datos puros: este módulo lo acaba importando Node durante el prerender
 * (a través de `catalog.ts` y `routeMeta.ts`), así que no puede tocar el DOM
 * ni importar React.
 */

/** Texto con enlaces internos y fragmentos de código, sin escribir HTML. */
export type RichText = string | InlineSegment[]

export type InlineSegment =
  | string
  /** Enlace interno. Siempre una ruta del propio sitio, con barra final. */
  | { to: `/${string}/`; text: string }
  /** Fragmento monoespaciado: nombres de clase, excepciones, propiedades. */
  | { code: string }

export interface QuestionAndAnswer {
  question: string
  answer: string
}

/** Fila de una matriz de compatibilidad. `header` es la celda de cabecera. */
export interface TableRow {
  /** Lo que identifica la fila: la versión, el servidor, el framework. */
  header: string
  /** Admiten enlaces internos: en las tablas de las páginas índice, la última
   *  columna lleva al detalle. */
  cells: RichText[]
}

/** Un error concreto, su causa y qué se hace con él. */
export interface KnownError {
  /** Traza o mensaje literal, tal y como aparece en el log. */
  signature: string
  cause: RichText
  fix: RichText
}

interface BlockBase {
  /**
   * Ancla estable de la sección.
   *
   * Va en el dato y NO se deriva del encabezado: así se puede reescribir el
   * título sin romper los enlaces con `#` que ya existan. Único en su página.
   */
  id: string
  /** H2 de la sección. Único dentro de su página. */
  heading: string
  /** Entradilla opcional, antes del cuerpo del bloque. */
  intro?: RichText
}

export type ContentBlock =
  | (BlockBase & { type: 'prose'; body: RichText[] })
  | (BlockBase & {
      type: 'table'
      /** Cabecera de la primera columna, y luego el resto. */
      columns: string[]
      rows: TableRow[]
      /** `<caption>` de la tabla: es lo que la hace legible fuera de contexto. */
      caption: string
      /** Matiz al pie: fuentes, excepciones, "a fecha de". */
      note?: RichText
    })
  | (BlockBase & { type: 'errors'; items: KnownError[] })
  | (BlockBase & {
      type: 'steps'
      items: { title: string; body: RichText }[]
    })
  | (BlockBase & {
      type: 'checklist'
      items: RichText[]
      /** Cierra la lista con un párrafo, para no terminar en seco. */
      outro?: RichText
    })

/** Todo lo que aporta un fichero de `src/data/content/`. */
export interface EntryContent {
  sections: ContentBlock[]
  faq: QuestionAndAnswer[]
  /** H2 de la FAQ de esa página. Distinto en cada una. */
  faqTitle?: string
}

/** Aplana un RichText a texto plano: para contar palabras y para los asserts. */
export function plainTextOf(rich: RichText): string {
  if (typeof rich === 'string') {
    return rich
  }

  return rich
    .map((segment) => {
      if (typeof segment === 'string') {
        return segment
      }

      return 'code' in segment ? segment.code : segment.text
    })
    .join('')
}

/** Rutas internas a las que apunta un RichText. Las valida el catálogo. */
export function internalLinksOf(rich: RichText): string[] {
  if (typeof rich === 'string') {
    return []
  }

  return rich.flatMap((segment) =>
    typeof segment !== 'string' && 'to' in segment ? [segment.to] : [],
  )
}
