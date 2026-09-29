/**
 * Preguntas frecuentes de la home.
 *
 * Aquí solo están las transversales: las de cada página de servicio o de reto
 * viven en su fichero de `src/data/content/`, porque son propias de ese tema.
 *
 * Solo respuestas técnicas, comprobables. Las preguntas de negocio
 * (facturación, confidencialidad, disponibilidad) están más abajo sin activar:
 * afirman cosas sobre cómo trabajas y solo tú puedes confirmarlas.
 */

import type { QuestionAndAnswer } from './contentTypes.ts'

export const HOME_FAQ: QuestionAndAnswer[] = [
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
