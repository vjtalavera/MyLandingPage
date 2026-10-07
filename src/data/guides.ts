/**
 * Guías técnicas: procedimientos, comandos y errores concretos.
 *
 * Van aparte del catálogo a propósito. Una guía no es un servicio que se
 * contrate ni un reto que se diagnostique: no tiene `bullets`, ni
 * `technologies`, ni `ctaText`, así que meterla en `CatalogEntry` obligaría a
 * dejar medio tipo vacío.
 *
 * REGLA DE CONTENIDO: registro impersonal. Se describe cómo se hace algo, con
 * comandos y salidas reales, nunca quién lo hizo ni en qué proyecto. Sin
 * cifras de rendimiento, sin clientes, sin anécdotas.
 */

import { erroresJava8A17 } from './content/guias/errores-java-8-a-17.ts'
import { inventarioDependencias } from './content/guias/inventario-dependencias.ts'
import { javaxAJakartaOpenrewrite } from './content/guias/javax-a-jakarta-openrewrite.ts'
import type { ContentBlock, QuestionAndAnswer } from './contentTypes.ts'

export interface GuideEntry {
  slug: string
  /** Ruta absoluta, siempre con barra final. */
  path: `/guias/${string}/`
  /** H1 de la página. Único en todo el sitio. */
  title: string
  /** Etiqueta corta para tarjetas y migas de pan. */
  navLabel: string
  eyebrow: string
  /** Texto de la tarjeta en la página índice. */
  cardText: string
  /** Párrafo bajo el H1. */
  intro: string
  seoTitle: string
  seoDescription: string
  /** YYYY-MM-DD, mantenidas a mano igual que en el catálogo. */
  published: string
  updated: string
  sections: ContentBlock[]
  faq: QuestionAndAnswer[]
  faqTitle?: string
  /**
   * Cierre propio de la guía. Quien llega desde Google con un error concreto
   * tiene que ver la conexión entre ese error y la llamada de diagnóstico; un
   * "escríbeme" genérico no se la da.
   */
  ctaTitle?: string
  ctaBody?: string
}

export const guides: GuideEntry[] = [
  {
    slug: 'errores-al-pasar-de-java-8-a-java-17',
    path: '/guias/errores-al-pasar-de-java-8-a-java-17/',
    title: 'Errores al pasar de Java 8 a Java 17, y qué los provoca',
    navLabel: 'Errores de Java 8 a 17',
    eyebrow: 'Guía',
    cardText:
      'Los mensajes de error que aparecen al subir el JDK, con la causa concreta de cada uno y cómo se resuelve.',
    intro:
      'Catálogo de los errores que salen al cambiar de JDK, ordenados por el momento en que aparecen: primero los de compilación, después los de arranque y al final los que solo se ven con carga real.',
    seoTitle: 'Errores al migrar de Java 8 a Java 17 | JavaEvolve',
    seoDescription:
      'Errores habituales al pasar de Java 8 a Java 17: NoClassDefFoundError de JAXB, InaccessibleObjectException, UnsupportedClassVersionError y cómo se resuelve cada uno.',
    published: '2026-09-29',
    updated: '2026-09-29',
    ctaTitle: '¿Os aparecen estos errores al subir de Java 8?',
    ctaBody:
      'Cada uno tiene arreglo, pero el orden importa: algunos esconden a otros. Cuéntame la versión de partida, el servidor y los primeros errores que veis, y en la llamada te digo por dónde empezaría.',
    ...erroresJava8A17,
  },
  {
    slug: 'inventario-de-dependencias-antes-de-migrar',
    path: '/guias/inventario-de-dependencias-antes-de-migrar/',
    title: 'Cómo hacer el inventario de dependencias antes de migrar',
    navLabel: 'Inventario de dependencias',
    eyebrow: 'Guía',
    cardText:
      'Los comandos que responden qué hay instalado, qué está obsoleto y qué va a romperse, y cómo leer su salida.',
    intro:
      'El inventario es lo que convierte una migración de una apuesta en un plan. Estos son los comandos que lo producen y qué mirar en cada salida.',
    seoTitle: 'Inventario de dependencias antes de migrar Java | JavaEvolve',
    seoDescription:
      'Comandos para inventariar un proyecto Java antes de migrar: mvn dependency:tree, versions-maven-plugin y jdeps, y cómo interpretar lo que devuelven.',
    published: '2026-09-29',
    updated: '2026-09-29',
    ctaTitle: '¿Tienes el inventario y no sabes cómo leerlo?',
    ctaBody:
      'La salida de estos comandos dice qué hay; lo difícil es decidir qué bloquea y qué puede esperar. Envíame lo que te ha salido o cuéntame el proyecto, y lo repasamos en la llamada.',
    ...inventarioDependencias,
  },
  {
    slug: 'javax-a-jakarta-con-openrewrite',
    path: '/guias/javax-a-jakarta-con-openrewrite/',
    title: 'De javax a jakarta con OpenRewrite: qué cubre y qué no',
    navLabel: 'javax a jakarta con OpenRewrite',
    eyebrow: 'Guía',
    cardText:
      'Qué resuelve la receta automática del cambio de espacio de nombres, y qué queda siempre a mano.',
    intro:
      'OpenRewrite automatiza el renombrado de paquetes de Jakarta EE. Lo importante no es lo que hace, que es previsible, sino la lista de lo que deja sin tocar.',
    seoTitle: 'Migrar de javax a jakarta con OpenRewrite | JavaEvolve',
    seoDescription:
      'Qué cubre la receta de OpenRewrite para pasar de javax a jakarta, qué queda fuera y cómo se comprueba que la migración está completa.',
    published: '2026-09-29',
    updated: '2026-09-29',
    ctaTitle: '¿La receta ha compilado, pero algo sigue sin funcionar?',
    ctaBody:
      'Lo que OpenRewrite deja sin tocar suele estar en descriptores XML, dependencias de terceros y cadenas con nombres de paquete. Cuéntame qué falla después del renombrado y te digo dónde miraría primero.',
    ...javaxAJakartaOpenrewrite,
  },
]

const index = new Map(guides.map((guide) => [guide.slug, guide]))

export function guideBySlug(slug: string): GuideEntry {
  const guide = index.get(slug)

  if (!guide) {
    throw new Error(`Guía inexistente: ${slug}`)
  }

  return guide
}
