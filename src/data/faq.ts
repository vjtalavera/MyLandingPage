/**
 * Preguntas frecuentes de la home.
 *
 * Aquí solo están las transversales: las de cada página de servicio o de reto
 * viven en su fichero de `src/data/content/`, porque son propias de ese tema.
 *
 * Respuestas técnicas comprobables y solo las de negocio que el sitio ya
 * respalda. Las demás (facturación, confidencialidad, disponibilidad) están
 * más abajo sin activar: afirman cosas sobre cómo trabajas y solo tú puedes
 * confirmarlas.
 */

import type { QuestionAndAnswer } from './contentTypes.ts'
import { OFFER } from './offer.ts'

export const HOME_FAQ: QuestionAndAnswer[] = [
  // Objeciones de negocio que ya están respaldadas en el sitio: la llamada
  // gratuita (OFFER), la propuesta con alcance y precio cerrados y el
  // análisis que se queda el cliente (contacto y #proceso). Van primero
  // porque son las que frenan el primer mensaje.
  {
    question: '¿Cuánto cuesta el diagnóstico?',
    answer: `Nada. Es una llamada de ${OFFER.duration}, sin coste y sin compromiso. Si después tiene sentido seguir, te envío una propuesta de análisis con alcance y precio cerrados antes de empezar, para que decidas con la cifra delante.`,
  },
  {
    question: '¿Y si después del análisis no seguimos?',
    answer:
      'El documento del análisis es tuyo: inventario de dependencias, incompatibilidades, riesgos ordenados por impacto y un plan por fases. Puedes ejecutarlo con tu equipo o con otro proveedor.',
  },
  {
    question: '¿Se puede migrar de Java EE a Jakarta EE sin parar el desarrollo?',
    answer:
      'Normalmente sí. El cambio de javax.* a jakarta.* es mecánico en el código propio; lo que marca el ritmo son las dependencias de terceros que todavía no han publicado una versión compatible. Ese inventario es lo primero que se hace, porque es lo que decide si la migración dura semanas o meses.',
  },
  {
    question: '¿Hay que cambiar de servidor de aplicaciones para subir de versión de Java?',
    answer:
      'Depende de la combinación concreta. Las versiones recientes de WildFly y Tomcat soportan las versiones LTS actuales de Java; las versiones antiguas de JBoss EAP no. Forma parte de la matriz de compatibilidad que sale del análisis inicial, junto con las dependencias y el build.',
  },
  {
    question: '¿Qué pasa con Hibernate al pasar a jakarta.persistence?',
    answer:
      'Hibernate 6 es el que trae el cambio de espacio de nombres, y además reescribió el motor de consultas: HQL que antes funcionaba puede comportarse de otra manera. Se aborda comparando el SQL generado antes y después sobre las consultas críticas, no confiando en que compile.',
  },
  {
    question: '¿Cuánto dura una migración de este tipo?',
    answer:
      'Depende del inventario, y por eso existe el análisis inicial: para responder con datos en vez de con una cifra al aire. Cualquiera que dé un número antes de mirar el código y las dependencias se lo está inventando.',
  },
  {
    question: '¿Hace falta ir a microservicios?',
    answer:
      'No. Un monolito modular, bien probado y desplegable es una arquitectura legítima, y para muchas aplicaciones empresariales es la correcta. Trocear un sistema que nadie entiende del todo suele multiplicar el problema en lugar de resolverlo.',
  },
  {
    question: '¿Por dónde se empieza si la aplicación casi no tiene pruebas?',
    answer:
      'Por construir las que demuestren que el comportamiento actual se mantiene, aunque sean pruebas de caracterización feas sobre los flujos críticos. Sin esa red no hay forma de distinguir un cambio correcto de uno que rompe algo que nadie estaba mirando.',
  },

  // TODO: confirmar antes de publicar. Afirman cómo trabajas y cómo facturas.
  // {
  //   question: '¿Puedes trabajar dentro de nuestro equipo y con nuestro repositorio?',
  //   answer: '...',
  // },
  // {
  //   question: '¿Firmas acuerdo de confidencialidad?',
  //   answer: '...',
  // },
  // {
  //   question: '¿Cómo facturas?',
  //   answer: '...',
  // },
]
