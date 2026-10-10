/**
 * La oferta de primer paso, en un solo sitio.
 *
 * Son compromisos reales con quien escribe (confirmados por el titular el
 * 2026-10-07): la llamada es gratuita, dura 30 minutos y la respuesta llega en
 * menos de 48 horas. Si alguno cambia, se cambia aquí y se propaga al hero, al
 * bloque del diagnóstico, al formulario y al cierre de servicios, retos y
 * guías.
 */
const duration = '30 minutos'
const responseTime = 'menos de 48 horas'

export const OFFER = {
  /** Rótulo de los botones que llevan al formulario y del envío. */
  cta: 'Pedir diagnóstico gratuito',
  /** Rótulo corto, para el CTA de la cabecera en escritorio. */
  ctaShort: 'Diagnóstico gratuito',
  /**
   * Rótulo de la cabecera en móvil. Es el texto visible Y el nombre accesible
   * (WCAG 2.5.3): por eso empieza igual que `ctaShort`, no es otra frase.
   */
  ctaMobile: 'Diagnóstico',
  duration,
  responseTime,
  /** Línea de apoyo bajo los botones de cierre. */
  note: `Llamada de ${duration}, sin coste. Respondo en ${responseTime}.`,
} as const
