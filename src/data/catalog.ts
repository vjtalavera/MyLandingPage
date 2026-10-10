/**
 * Catálogo de servicios y retos: fuente única de contenido y de rutas.
 *
 * Antes esta información vivía por triplicado (tarjetas de la home, props de
 * cada página y sitemap.xml) y se desincronizaba. Añadir o cambiar una entrada
 * aquí se propaga a la home, a las páginas índice, a los enlaces cruzados, a
 * los metadatos de `src/seo/routeMeta.ts` y al sitemap.
 */

import { contentBySlug } from './content/index.ts'
import { indexContent } from './content/indices.ts'
import { guides } from './guides.ts'
import { internalLinksOf, plainTextOf } from './contentTypes.ts'
import type {
  ContentBlock,
  QuestionAndAnswer,
  RichText,
} from './contentTypes.ts'

export const SITE_URL = 'https://javaevolve.com'

export type EntryKind = 'servicio' | 'reto'

/** Enlace interno con texto ancla propio para ese contexto. */
export interface CrossLink {
  slug: string
  /** Si se omite, se usa el `navLabel` de la entrada destino. */
  anchor?: string
}

export interface CatalogEntry {
  slug: string
  kind: EntryKind
  /** Ruta absoluta, siempre con barra final. */
  path: `/${string}/`
  /** H1 de la página. Único en todo el sitio. */
  title: string
  /** Etiqueta corta para tarjetas, menús y migas de pan. */
  navLabel: string
  eyebrow: string
  /** Texto de la tarjeta en la home y en la página índice. */
  cardText: string
  /** Párrafo bajo el H1. */
  intro: string
  problemTitle: string
  problemBody: RichText[]
  /** Servicios prestados (servicio) o áreas a analizar (reto). */
  bullets: string[]
  technologies: string[]
  seoTitle: string
  seoDescription: string
  related: CrossLink[]

  /*
   * Fechas en formato YYYY-MM-DD. Se mantienen A MANO y a propósito: alimentan
   * el `dateModified` del JSON-LD y el `<lastmod>` del sitemap, y una fecha
   * que cambia sola en cada despliegue es una fecha que los buscadores
   * aprenden a ignorar para el sitemap entero.
   */
  published: string
  updated: string

  /*
   * Cuerpo largo de la página. Vive en `src/data/content/<slug>.ts` y lo
   * fusiona `withContent()`: no se escribe en los literales de aquí.
   */
  sections?: ContentBlock[]
  faq?: QuestionAndAnswer[]

  /*
   * Encabezados de las secciones que pinta la plantilla. Existen para que
   * cuatro páginas no compartan el mismo H2 palabra por palabra; si se
   * omiten, la plantilla usa su texto genérico de siempre.
   */
  bulletsTitle?: string
  technologiesTitle?: string
  relatedTitle?: string
  faqTitle?: string
  ctaTitle?: string
  ctaBody?: string
}

const serviceEntries: CatalogEntry[] = [
  {
    slug: 'desarrollo-java',
    kind: 'servicio',
    path: '/servicios/desarrollo-java/',
    title: 'Desarrollo Java para aplicaciones empresariales',
    navLabel: 'Desarrollo Java',
    eyebrow: 'Desarrollo Java',
    cardText:
      'Desarrollo backend a medida y evolutivos sobre aplicaciones empresariales Java.',
    intro:
      'Desarrollo backend con Java para nuevas funcionalidades, aplicaciones empresariales y evolución de sistemas existentes.',
    problemTitle: 'Desarrollo y evolución de aplicaciones Java',
    problemBody: [
      'Una aplicación empresarial puede necesitar nuevas funcionalidades, integraciones o mejoras sin necesidad de sustituir todo el sistema. El objetivo es construir soluciones mantenibles y adaptadas al contexto existente.',
      'Eso implica trabajar dentro de las restricciones que ya hay: la versión de Java en uso, el servidor de aplicaciones, las dependencias que no se pueden tocar todavía y las pruebas que existen o que hay que construir primero.',
    ],
    bullets: [
      'Desarrollo de funcionalidades backend',
      'Evolución de aplicaciones Java existentes',
      'Mantenimiento y refactorización',
      'Integración con sistemas empresariales',
      'Desarrollo de servicios backend',
      'Análisis de necesidades técnicas',
    ],
    technologies: [
      'Java',
      'Spring',
      'Spring Boot',
      'Java EE',
      'Jakarta EE',
      'Hibernate',
      'REST',
      'SQL',
      'Git',
    ],
    seoTitle: 'Desarrollo Java | JavaEvolve',
    seoDescription:
      'Desarrollo backend Java para aplicaciones empresariales, nuevas funcionalidades, mantenimiento y evolución de sistemas existentes.',
    bulletsTitle: 'Qué tipo de trabajo cubre',
    technologiesTitle: 'Con qué se trabaja en el día a día',
    relatedTitle: 'Si antes de construir hay que desbloquear algo',
    ctaTitle: '¿Qué necesitáis construir?',
    ctaBody: 'Cuéntame qué hay montado y qué falta. Si el encargo no encaja con lo que hago, te lo digo en la primera llamada.',
    published: '2026-09-28',
    updated: '2026-09-29',
    related: [
      {
        slug: 'actualizacion-java',
        anchor: 'Actualizar la versión de Java de una aplicación existente',
      },
      { slug: 'spring-boot' },
      { slug: 'apis-rest' },
    ],
  },
  {
    slug: 'spring-boot',
    kind: 'servicio',
    path: '/servicios/spring-boot/',
    title: 'Desarrollo backend con Spring Boot',
    navLabel: 'Spring Boot',
    eyebrow: 'Spring Boot',
    cardText:
      'Desarrollo de servicios y APIs con Spring Boot, desde cero o sobre lo que ya existe.',
    intro:
      'Desarrollo de servicios backend y APIs con Spring Boot y Spring Framework para aplicaciones empresariales.',
    problemTitle: 'Backend preparado para evolucionar',
    problemBody: [
      'Spring Boot permite construir servicios backend orientados a aplicaciones modernas. El desarrollo debe adaptarse a las necesidades reales del proyecto, su arquitectura y los sistemas con los que necesita integrarse.',
      'No siempre hay que empezar de cero: en muchos casos lo razonable es levantar los servicios nuevos en Spring Boot y dejar que convivan con la aplicación existente mientras se decide qué se migra y en qué orden.',
    ],
    bullets: [
      'Desarrollo de aplicaciones Spring Boot',
      'APIs REST',
      'Servicios backend',
      'Integración con bases de datos',
      'Evolución de aplicaciones existentes',
      'Refactorización hacia arquitecturas modernas',
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'Spring Framework',
      'Spring Data',
      'Hibernate',
      'REST',
      'SQL',
      'Git',
    ],
    seoTitle: 'Desarrollo Spring Boot | JavaEvolve',
    seoDescription:
      'Desarrollo backend con Spring Boot y Spring Framework para servicios, APIs REST y aplicaciones empresariales.',
    bulletsTitle: 'Qué incluye un desarrollo con Spring Boot',
    technologiesTitle: 'El stack habitual de estos proyectos',
    relatedTitle: 'Si lo que hay que mover es lo que ya existe',
    ctaTitle: '¿Servicio nuevo o evolución de lo que hay?',
    ctaBody: 'Dime qué sistemas tiene que tocar y con qué convive. Con eso se puede plantear si conviene convivencia o migración.',
    published: '2026-09-28',
    updated: '2026-09-29',
    related: [
      {
        slug: 'migracion-spring-boot',
        anchor: 'Cómo se migra una aplicación Java hacia Spring Boot',
      },
      { slug: 'apis-rest' },
      { slug: 'desarrollo-java' },
    ],
  },
  {
    slug: 'apis-rest',
    kind: 'servicio',
    path: '/servicios/apis-rest/',
    title: 'Desarrollo de APIs REST con Java',
    navLabel: 'APIs REST',
    eyebrow: 'APIs REST',
    cardText:
      'Diseño y desarrollo de APIs REST para integrar aplicaciones y servicios.',
    intro:
      'Diseño y desarrollo de APIs REST para integrar aplicaciones, servicios y sistemas empresariales.',
    problemTitle: 'Conectar sistemas de forma mantenible',
    problemBody: [
      'Las APIs son una pieza fundamental para integrar aplicaciones empresariales. Una API debe responder a las necesidades funcionales del proyecto y facilitar su evolución y mantenimiento.',
      'La parte difícil no suele ser exponer el primer endpoint, sino poder cambiarlo después sin romper a quien ya lo consume: versionado, contratos explícitos y una capa de persistencia que no se filtre hacia fuera.',
    ],
    bullets: [
      'Diseño de APIs REST',
      'Desarrollo de endpoints',
      'Integración entre aplicaciones',
      'Evolución de APIs existentes',
      'Servicios backend con Java',
      'Integración con sistemas empresariales',
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'Spring MVC',
      'REST',
      'JSON',
      'Hibernate',
      'SQL',
    ],
    seoTitle: 'Desarrollo de APIs REST con Java | JavaEvolve',
    seoDescription:
      'Diseño y desarrollo de APIs REST con Java para integrar aplicaciones, servicios y sistemas empresariales.',
    bulletsTitle: 'Qué cubre el trabajo sobre una API',
    technologiesTitle: 'Tecnologías implicadas en la integración',
    relatedTitle: 'Con qué suele ir acompañado este trabajo',
    ctaTitle: '¿API nueva o una que ya tiene consumidores?',
    ctaBody: 'Cuéntame quién la consume hoy y qué necesitáis cambiar. El margen de maniobra lo marcan los consumidores, así que es lo primero que se mira.',
    published: '2026-09-28',
    updated: '2026-09-29',
    related: [
      { slug: 'migracion-spring-boot' },
      { slug: 'spring-boot' },
      { slug: 'modernizacion-java' },
    ],
  },
  {
    slug: 'modernizacion-java',
    kind: 'servicio',
    path: '/servicios/modernizacion-java/',
    // Deliberadamente distinto del H1 del reto /retos/migracion-java-legacy/:
    // este es el servicio que se contrata, aquel explica el problema.
    title: 'Servicio de modernización de aplicaciones Java',
    navLabel: 'Modernización Java',
    eyebrow: 'Modernización Java',
    cardText:
      'Consultoría de modernización: análisis, migración progresiva y refactorización por fases.',
    intro:
      'Análisis, plan por fases y ejecución de la modernización de una aplicación Java existente, con el sistema en producción durante todo el proceso.',
    problemTitle: 'Modernizar sin empezar necesariamente desde cero',
    problemBody: [
      'Las aplicaciones empresariales pueden acumular años de evolución tecnológica. La modernización permite analizar el sistema existente y definir una estrategia progresiva adaptada a sus necesidades.',
      'El trabajo empieza siempre por un análisis con alcance cerrado: inventario de dependencias, incompatibilidades detectadas y riesgos ordenados por impacto. A partir de ahí, un plan por fases en el que cada fase deja la aplicación funcionando y desplegada.',
    ],
    bullets: [
      'Análisis de aplicaciones Java Legacy',
      'Migración Java EE → Jakarta EE',
      'Actualización de versiones Java',
      'Modernización de aplicaciones JBoss / WildFly',
      'Migración hacia Spring Boot',
      'Refactorización de código',
      'Reducción de deuda técnica',
      'Evolución de arquitecturas monolíticas',
    ],
    technologies: [
      'Java',
      'Java EE',
      'Jakarta EE',
      'Spring Boot',
      'JBoss',
      'WildFly',
      'Hibernate',
      'REST',
    ],
    seoTitle: 'Modernización de aplicaciones Java | JavaEvolve',
    seoDescription:
      'Servicio de modernización progresiva de aplicaciones Java: análisis, plan por fases y ejecución. Java EE a Jakarta EE, subida de versión y migración a Spring Boot.',
    bulletsTitle: 'Qué trabajos cubre el servicio',
    technologiesTitle: 'Tecnologías sobre las que se trabaja',
    relatedTitle: 'Los retos concretos que hay detrás',
    ctaTitle: '¿Empezamos por el análisis?',
    ctaBody: 'El primer paso es una conversación, no un presupuesto. Al colgar sabréis si se puede hacer, por dónde empezaría y qué riesgos veo.',
    published: '2026-09-28',
    updated: '2026-09-29',
    related: [
      {
        slug: 'migracion-java-legacy',
        anchor: 'Qué implica modernizar una aplicación Java legacy',
      },
      { slug: 'migracion-java-ee-jakarta-ee' },
      { slug: 'actualizacion-java' },
      { slug: 'spring-boot' },
    ],
  },
]

const retoEntries: CatalogEntry[] = [
  {
    slug: 'migracion-java-ee-jakarta-ee',
    kind: 'reto',
    path: '/retos/migracion-java-ee-jakarta-ee/',
    title: 'Migración de Java EE a Jakarta EE',
    navLabel: 'Java EE → Jakarta EE',
    eyebrow: 'Migración Java EE',
    cardText:
      'Evolución de aplicaciones Java EE hacia Jakarta EE, analizando compatibilidad, dependencias y servidores.',
    intro:
      'Evolución de aplicaciones Java EE hacia Jakarta EE, abordando compatibilidad, dependencias y cambios necesarios para mantener la aplicación preparada para nuevas versiones del ecosistema.',
    problemTitle: 'Una migración empresarial requiere algo más que cambiar paquetes',
    problemBody: [
      'Las aplicaciones Java EE existentes pueden acumular dependencias, APIs antiguas, servidores de aplicaciones y componentes que condicionan su evolución. Analizar estos elementos antes de migrar permite identificar impactos técnicos y definir una estrategia adecuada para cada aplicación.',
      'El cambio de espacio de nombres de javax.* a jakarta.* es mecánico en el código propio. Lo que marca el ritmo real de la migración son las dependencias de terceros: hasta que todas publican una versión compatible, el plan depende de ellas y no del equipo.',
    ],
    bullets: [
      'Análisis de aplicaciones Java EE existentes',
      'Identificación de APIs y dependencias afectadas',
      'Migración de javax.* a jakarta.*',
      'Compatibilidad con versiones modernas del servidor',
      'Revisión de configuraciones y librerías',
      'Adaptación de componentes empresariales',
      'Validación de integraciones existentes',
    ],
    technologies: [
      'Java EE',
      'Jakarta EE',
      'JPA',
      'JAX-RS',
      'JAX-WS',
      'Hibernate',
      'WildFly',
      'JBoss',
      'Maven',
    ],
    seoTitle: 'Migración Java EE a Jakarta EE | JavaEvolve',
    seoDescription:
      'Migración de aplicaciones Java EE a Jakarta EE, análisis de dependencias, compatibilidad, servidores y evolución de aplicaciones empresariales.',
    bulletsTitle: 'Qué se revisa antes de cambiar el espacio de nombres',
    technologiesTitle: 'El ecosistema afectado por el salto a Jakarta EE',
    relatedTitle: 'Lo que suele venir con esta migración',
    ctaTitle: '¿Tenéis una aplicación Java EE que hay que mover?',
    ctaBody: 'Cuéntame qué servidor usáis y qué dependencias os preocupan. El inventario de compatibilidad es lo primero que se hace, y es lo que dice si esto son semanas o meses.',
    published: '2026-09-28',
    updated: '2026-09-29',
    related: [
      {
        slug: 'modernizacion-java',
        anchor: 'Servicio de modernización de aplicaciones Java',
      },
      { slug: 'actualizacion-java' },
    ],
  },
  {
    slug: 'migracion-java-legacy',
    kind: 'reto',
    path: '/retos/migracion-java-legacy/',
    title: 'Qué implica modernizar una aplicación Java legacy',
    navLabel: 'Java Legacy',
    eyebrow: 'Java Legacy',
    cardText:
      'Qué se analiza antes de modernizar: inventario, deuda técnica, riesgos y por dónde empezar.',
    intro:
      'Qué se mira antes de tocar una aplicación Java con años encima: inventario, incompatibilidades, riesgos y en qué orden conviene abordarlos.',
    problemTitle: 'El código legacy puede convertirse en un freno para evolucionar',
    problemBody: [
      'Aplicaciones Java con años de evolución pueden combinar versiones antiguas, frameworks, servidores, configuraciones y componentes difíciles de mantener. La modernización debe adaptarse al contexto real de la aplicación y puede abordarse de forma progresiva.',
      'La señal de alarma no suele ser la antigüedad del código, sino el miedo a desplegarlo. Cuando cada cambio exige un fin de semana y media plantilla pendiente, el problema ya no es la versión de Java: es que no hay pruebas suficientes para saber qué se rompe.',
    ],
    bullets: [
      'Análisis técnico de aplicaciones Legacy',
      'Identificación de deuda técnica',
      'Actualización progresiva de componentes',
      'Refactorización de código Java',
      'Evolución de arquitecturas existentes',
      'Modernización de aplicaciones JBoss y WildFly',
      'Reducción del riesgo técnico',
      'Preparación para nuevas versiones de Java',
    ],
    technologies: [
      'Java',
      'Java EE',
      'Jakarta EE',
      'Spring',
      'Spring Boot',
      'Hibernate',
      'JBoss',
      'WildFly',
      'Maven',
    ],
    seoTitle: 'Modernizar una aplicación Java legacy: qué implica | JavaEvolve',
    seoDescription:
      'Qué se analiza antes de modernizar una aplicación Java legacy: inventario de dependencias, incompatibilidades, riesgos y por dónde empezar.',
    bulletsTitle: 'Qué se mira para saber por dónde empezar',
    technologiesTitle: 'Dónde suele acumularse la deuda técnica',
    relatedTitle: 'Cómo se pasa del diagnóstico a la ejecución',
    ctaTitle: '¿Tenéis una aplicación que nadie quiere tocar?',
    ctaBody: 'Cuéntame qué hace, cuántos años tiene y qué es lo que más duele hoy. El análisis inicial sirve para responder con datos en vez de con suposiciones.',
    published: '2026-09-28',
    updated: '2026-09-29',
    related: [
      {
        slug: 'modernizacion-java',
        anchor: 'Servicio de modernización de aplicaciones Java',
      },
      { slug: 'actualizacion-java' },
      { slug: 'migracion-spring-boot' },
    ],
  },
  {
    slug: 'migracion-spring-boot',
    kind: 'reto',
    path: '/retos/migracion-spring-boot/',
    title: 'Migración y evolución hacia Spring Boot',
    navLabel: 'Migración a Spring Boot',
    eyebrow: 'Spring Boot',
    cardText:
      'Evolución de aplicaciones Java hacia Spring Boot y arquitecturas backend más actuales.',
    intro:
      'Evolución de aplicaciones Java existentes hacia Spring Boot para facilitar el desarrollo de servicios, APIs y nuevas funcionalidades backend.',
    problemTitle: 'No todas las aplicaciones necesitan una migración completa',
    problemBody: [
      'La evolución hacia Spring Boot puede abordarse de distintas formas dependiendo de la arquitectura existente, las dependencias, el servidor de aplicaciones y las necesidades del proyecto. Antes de decidir una estrategia conviene analizar el punto de partida.',
      'En bastantes casos la opción razonable no es migrar el monolito entero, sino levantar los servicios nuevos en Spring Boot y desplazar funcionalidad poco a poco, manteniendo las dos partes en producción mientras dure la transición.',
    ],
    bullets: [
      'Análisis de aplicaciones Java existentes',
      'Evaluación de viabilidad de la migración',
      'Migración progresiva de funcionalidades',
      'Desarrollo de nuevos servicios con Spring Boot',
      'Evolución de APIs existentes',
      'Refactorización de componentes backend',
      'Integración con bases de datos',
      'Separación progresiva de funcionalidades',
    ],
    technologies: [
      'Java',
      'Spring',
      'Spring Boot',
      'Spring MVC',
      'Spring Data',
      'Hibernate',
      'REST',
      'Maven',
      'Git',
    ],
    seoTitle: 'Migración a Spring Boot | JavaEvolve',
    seoDescription:
      'Migración y evolución de aplicaciones Java hacia Spring Boot, desarrollo backend, APIs REST y modernización progresiva.',
    bulletsTitle: 'Qué se mira antes de mover la aplicación a Spring Boot',
    technologiesTitle: 'Versiones y piezas implicadas en el salto',
    relatedTitle: 'Los dos pasos que acompañan a esta migración',
    ctaTitle: '¿En qué versión de Spring estáis?',
    ctaBody: 'Dime la versión actual, la de Java y qué dependencias no se pueden tocar. Con eso se ve si el camino es un salto directo o dos fases.',
    published: '2026-09-28',
    updated: '2026-09-29',
    related: [
      { slug: 'spring-boot', anchor: 'Servicio de desarrollo con Spring Boot' },
      { slug: 'apis-rest' },
      { slug: 'modernizacion-java' },
    ],
  },
  {
    slug: 'actualizacion-java',
    kind: 'reto',
    path: '/retos/actualizacion-java/',
    title: 'Actualización de versiones Java',
    navLabel: 'Actualización de versiones Java',
    eyebrow: 'Versiones Java',
    cardText:
      'Análisis de compatibilidad y evolución hacia versiones más actuales de Java.',
    intro:
      'Evolución de aplicaciones Java hacia versiones más actuales, analizando compatibilidad, dependencias, frameworks y servidores antes de realizar el cambio.',
    problemTitle: 'Actualizar Java puede afectar a toda la cadena tecnológica',
    problemBody: [
      'El cambio de versión de Java no siempre consiste simplemente en cambiar el JDK. Dependencias, frameworks, APIs, servidores de aplicaciones y configuraciones pueden introducir incompatibilidades que deben identificarse antes de abordar la actualización.',
      'El salto de Java 8 a una versión con soporte arrastra el sistema de módulos, la retirada de APIs que antes venían en el JDK y, con frecuencia, el propio servidor de aplicaciones. Por eso el inventario va primero y la estimación después.',
    ],
    bullets: [
      'Análisis de la versión Java actual',
      'Identificación de incompatibilidades',
      'Revisión de dependencias Maven',
      'Actualización de frameworks',
      'Adaptación de código afectado',
      'Compatibilidad con servidores de aplicaciones',
      'Validación de aplicaciones existentes',
      'Planificación de actualizaciones progresivas',
    ],
    technologies: [
      'Java',
      'JDK',
      'Maven',
      'Spring',
      'Spring Boot',
      'Hibernate',
      'Java EE',
      'Jakarta EE',
      'WildFly',
    ],
    seoTitle: 'Actualización de versiones Java | JavaEvolve',
    seoDescription:
      'Actualización de versiones Java para aplicaciones empresariales, análisis de compatibilidad, dependencias, frameworks y servidores.',
    bulletsTitle: 'Qué entra en el análisis de compatibilidad',
    technologiesTitle: 'Las piezas del stack que condicionan la versión de Java',
    relatedTitle: 'Antes y después de subir la versión',
    ctaTitle: '¿En qué versión de Java está tu aplicación?',
    ctaBody: 'Cuéntame la versión actual, el servidor de aplicaciones y qué os está bloqueando. Con eso se puede decir si el salto es de semanas o de meses.',
    published: '2026-09-28',
    updated: '2026-09-29',
    related: [
      {
        slug: 'modernizacion-java',
        anchor: 'Servicio de modernización de aplicaciones Java',
      },
      { slug: 'migracion-java-ee-jakarta-ee' },
      { slug: 'desarrollo-java' },
    ],
  },
]

/**
 * Engancha a cada entrada su contenido largo. Se hace aquí y no en cada
 * literal para que no se pueda añadir un fichero a `content/` y olvidarse.
 */
function withContent(entry: CatalogEntry): CatalogEntry {
  const extra = contentBySlug[entry.slug]

  return extra ? { ...entry, ...extra } : entry
}

export const services: CatalogEntry[] = serviceEntries.map(withContent)
export const retos: CatalogEntry[] = retoEntries.map(withContent)

export const catalog: CatalogEntry[] = [...services, ...retos]

const index = new Map(catalog.map((entry) => [entry.slug, entry]))

export function bySlug(slug: string): CatalogEntry {
  const entry = index.get(slug)

  if (!entry) {
    throw new Error(`Entrada inexistente en el catálogo: ${slug}`)
  }

  return entry
}

export function canonicalOf(entry: CatalogEntry): string {
  return `${SITE_URL}${entry.path}`
}

/** Resuelve los enlaces cruzados, descartando los que apunten a nada. */
export function relatedOf(
  entry: CatalogEntry,
): { entry: CatalogEntry; anchor: string }[] {
  return entry.related.flatMap((link) => {
    const target = index.get(link.slug)

    return target ? [{ entry: target, anchor: link.anchor ?? target.navLabel }] : []
  })
}

/** Todas las URL públicas del sitio, en el orden en que van al sitemap. */
export const allPaths: string[] = [
  '/',
  '/servicios/',
  ...services.map((entry) => entry.path),
  '/retos/',
  ...retos.map((entry) => entry.path),
  '/guias/',
  ...guides.map((guide) => guide.path),
  '/aviso-legal/',
  '/privacidad/',
  '/cookies/',
]

/** Texto rico de un bloque: para contar palabras y validar sus enlaces. */
function richTextsOf(block: ContentBlock): RichText[] {
  const base: RichText[] = [block.heading, ...(block.intro ? [block.intro] : [])]

  switch (block.type) {
    case 'prose':
      return [...base, ...block.body]

    case 'table':
      return [
        ...base,
        block.caption,
        ...block.columns,
        ...block.rows.flatMap((row) => [row.header, ...row.cells]),
        ...(block.note ? [block.note] : []),
      ]

    case 'errors':
      return [
        ...base,
        ...block.items.flatMap((item) => [item.signature, item.cause, item.fix]),
      ]

    case 'steps':
      return [...base, ...block.items.flatMap((item) => [item.title, item.body])]

    case 'checklist':
      return [...base, ...block.items, ...(block.outro ? [block.outro] : [])]
  }
}

/** Todo el texto propio de una entrada, sin lo que pone la plantilla. */
function richTextOf(entry: CatalogEntry): RichText[] {
  return [
    entry.title,
    entry.intro,
    entry.problemTitle,
    ...entry.problemBody,
    ...entry.bullets,
    ...entry.technologies,
    ...(entry.sections ?? []).flatMap(richTextsOf),
    ...(entry.faq ?? []).flatMap((item) => [item.question, item.answer]),
  ]
}

/** H2 que la plantilla acaba pintando en esa página, en orden de aparición. */
function headingsOf(entry: CatalogEntry): string[] {
  return [
    entry.problemTitle,
    entry.bulletsTitle,
    ...(entry.sections ?? []).map((block) => block.heading),
    entry.technologiesTitle,
    entry.relatedTitle,
    entry.faqTitle,
    entry.ctaTitle,
  ].filter((heading) => heading !== undefined)
}

function duplicatesOf(values: string[]): string[] {
  return [
    ...new Set(
      values
        .map((value) => value.trim().toLowerCase())
        .filter((value, position, all) => all.indexOf(value) !== position),
    ),
  ]
}

/** Por debajo de esto una página no compite por nada. Solo avisa. */
const MIN_WORDS = 1000

/**
 * Invariantes del catálogo. En desarrollo las llama `main.tsx` y solo avisan;
 * el prerender las llama con `strict` y entonces rompen el build.
 *
 * Un H1 repetido en dos URLs hace que compitan entre sí en los buscadores, y
 * ya pasó una vez con "Modernización de aplicaciones Java Legacy". Con la
 * copia larga se añade un riesgo peor: un enlace interno mal escrito dentro
 * de un RichText es un 404 que no ve nadie hasta que lo ve Google.
 *
 * Este módulo también lo importa Node durante el prerender, así que la
 * comprobación no puede depender de `import.meta.env` ni ejecutarse al
 * importar.
 */
export function assertCatalogIntegrity(strict = false): void {
  const problems: string[] = []
  const warnings: string[] = []

  const duplicatedTitles = duplicatesOf([
    ...catalog.map((entry) => entry.title),
    ...guides.map((guide) => guide.title),
  ])

  if (duplicatedTitles.length > 0) {
    problems.push(`H1 duplicados: ${duplicatedTitles.join(', ')}`)
  }

  const duplicatedPaths = catalog
    .map((entry) => entry.path)
    .filter((path, position, all) => all.indexOf(path) !== position)

  if (duplicatedPaths.length > 0) {
    problems.push(`rutas duplicadas: ${duplicatedPaths.join(', ')}`)
  }

  const brokenCrossLinks = catalog.flatMap((entry) =>
    entry.related
      .filter((link) => !index.has(link.slug))
      .map((link) => `${entry.slug} → ${link.slug}`),
  )

  if (brokenCrossLinks.length > 0) {
    problems.push(`enlaces cruzados rotos: ${brokenCrossLinks.join(', ')}`)
  }

  const orphanContent = Object.keys(contentBySlug).filter(
    (slug) => !index.has(slug),
  )

  if (orphanContent.length > 0) {
    problems.push(
      `contenido sin entrada en el catálogo: ${orphanContent.join(', ')}`,
    )
  }

  for (const entry of catalog) {
    const blocks = entry.sections ?? []

    const duplicatedAnchors = blocks
      .map((block) => block.id)
      .filter((id, position, all) => all.indexOf(id) !== position)

    if (duplicatedAnchors.length > 0) {
      problems.push(
        `${entry.slug}: anclas repetidas en la página: ${duplicatedAnchors.join(', ')}`,
      )
    }

    const duplicatedHeadings = duplicatesOf(headingsOf(entry))

    if (duplicatedHeadings.length > 0) {
      problems.push(
        `${entry.slug}: H2 repetidos en la página: ${duplicatedHeadings.join(', ')}`,
      )
    }

    const rich = richTextOf(entry)

    const brokenInternalLinks = [
      ...new Set(
        rich.flatMap(internalLinksOf).filter((to) => !allPaths.includes(to)),
      ),
    ]

    if (brokenInternalLinks.length > 0) {
      problems.push(
        `${entry.slug}: enlaces internos a rutas inexistentes: ${brokenInternalLinks.join(', ')}`,
      )
    }

    const words = rich
      .map(plainTextOf)
      .join(' ')
      .split(/\s+/)
      .filter(Boolean).length

    if (blocks.length > 0 && words < MIN_WORDS) {
      warnings.push(`${entry.slug}: ${words} palabras, por debajo de ${MIN_WORDS}`)
    }
  }

  for (const [path, content] of Object.entries(indexContent)) {
    const blocks = content.sections ?? []

    const duplicatedAnchors = blocks
      .map((block) => block.id)
      .filter((id, position, all) => all.indexOf(id) !== position)

    if (duplicatedAnchors.length > 0) {
      problems.push(
        `${path}: anclas repetidas en la página: ${duplicatedAnchors.join(', ')}`,
      )
    }

    // Las tarjetas de estas páginas pintan el navLabel como encabezado, así
    // que cuentan: un bloque nuevo no puede llamarse igual que un servicio.
    const cardHeadings = (path === '/servicios/' ? services : retos).map(
      (entry) => entry.navLabel,
    )

    const duplicatedHeadings = duplicatesOf([
      ...blocks.map((block) => block.heading),
      ...cardHeadings,
      ...(content.faqTitle ? [content.faqTitle] : []),
    ])

    if (duplicatedHeadings.length > 0) {
      problems.push(
        `${path}: encabezados repetidos: ${duplicatedHeadings.join(', ')}`,
      )
    }

    const rich = [
      ...blocks.flatMap(richTextsOf),
      ...content.faq.flatMap((item) => [item.question, item.answer]),
    ]

    const broken = [
      ...new Set(
        rich.flatMap(internalLinksOf).filter((to) => !allPaths.includes(to)),
      ),
    ]

    if (broken.length > 0) {
      problems.push(
        `${path}: enlaces internos a rutas inexistentes: ${broken.join(', ')}`,
      )
    }
  }

  for (const guide of guides) {
    const duplicatedAnchors = guide.sections
      .map((block) => block.id)
      .filter((id, position, all) => all.indexOf(id) !== position)

    if (duplicatedAnchors.length > 0) {
      problems.push(
        `${guide.slug}: anclas repetidas en la página: ${duplicatedAnchors.join(', ')}`,
      )
    }

    const duplicatedHeadings = duplicatesOf(
      guide.sections.map((block) => block.heading),
    )

    if (duplicatedHeadings.length > 0) {
      problems.push(
        `${guide.slug}: H2 repetidos en la página: ${duplicatedHeadings.join(', ')}`,
      )
    }

    const rich = [
      ...guide.sections.flatMap(richTextsOf),
      ...guide.faq.flatMap((item) => [item.question, item.answer]),
    ]

    const broken = [
      ...new Set(
        rich.flatMap(internalLinksOf).filter((to) => !allPaths.includes(to)),
      ),
    ]

    if (broken.length > 0) {
      problems.push(
        `${guide.slug}: enlaces internos a rutas inexistentes: ${broken.join(', ')}`,
      )
    }
  }

  const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

  for (const entry of catalog) {
    if (!ISO_DATE.test(entry.published) || !ISO_DATE.test(entry.updated)) {
      problems.push(`${entry.slug}: fechas fuera del formato YYYY-MM-DD`)
    } else if (entry.updated < entry.published) {
      problems.push(`${entry.slug}: updated es anterior a published`)
    }
  }

  // Los encabezados de las secciones fijas sí tienen que ser únicos entre
  // páginas; los del CTA no, ahí la repetición es deliberada.
  const repeatedAcrossPages = duplicatesOf(
    catalog.flatMap((entry) =>
      [
        entry.bulletsTitle,
        entry.technologiesTitle,
        entry.relatedTitle,
        entry.faqTitle,
      ].filter((heading) => heading !== undefined),
    ),
  )

  if (repeatedAcrossPages.length > 0) {
    problems.push(
      `H2 de plantilla repetidos entre páginas: ${repeatedAcrossPages.join(', ')}`,
    )
  }

  for (const warning of warnings) {
    console.warn(`[catalog] ${warning}`)
  }

  if (problems.length === 0) {
    return
  }

  const report = problems.map((problem) => `  - ${problem}`).join('\n')

  if (strict) {
    throw new Error(`Catálogo inconsistente:
${report}`)
  }

  console.error(`[catalog] problemas detectados:
${report}`)
}
