import type { EntryContent } from '../contentTypes.ts'
import { OFFER } from '../offer.ts'

export const desarrolloJava: EntryContent = {
  faqTitle: 'Dudas frecuentes sobre el desarrollo backend',

  sections: [
    {
      type: 'prose',
      id: 'desarrollar-sobre-lo-que-ya-existe',
      heading: 'Desarrollar dentro de las restricciones que ya hay',
      intro:
        'En una aplicación empresarial rara vez se elige el punto de partida. Se elige qué hacer con él.',
      body: [
        'Un desarrollo sobre un sistema en producción viene con condiciones puestas: una versión de Java concreta, un servidor de aplicaciones que no se puede mover todavía, dependencias que nadie quiere tocar y una cobertura de pruebas que es la que es. Ignorar esas condiciones y construir como si el proyecto fuera nuevo produce código que funciona en local y no se puede desplegar.',
        'Trabajar dentro de ellas no significa perpetuarlas. Significa que cada funcionalidad nueva se construye de forma que no añada más deuda, y que las mejoras estructurales se hacen donde hay trabajo de todas formas, no en una tarea aparte que siempre se pospone.',
        [
          'En la práctica eso es lo que hace que una aplicación mejore sin proyectos de modernización: las zonas que se tocan van quedando mejor que como estaban. Cuando el deterioro es demasiado grande para arreglarlo por el camino, entonces sí hace falta un ',
          {
            to: '/servicios/modernizacion-java/',
            text: 'trabajo de modernización con alcance propio',
          },
          '.',
        ],
      ],
    },

    {
      type: 'checklist',
      id: 'tipos-de-encargo',
      heading: 'Los encargos que suelen llegar',
      items: [
        'Una funcionalidad nueva sobre una aplicación que lleva años en producción.',
        'Una integración con otro sistema, interno o de un tercero, que hay que construir y mantener.',
        'Un módulo concreto que se ha vuelto imposible de cambiar y hay que reconstruir por dentro.',
        'Un problema de rendimiento que apareció cuando los datos crecieron.',
        'Refuerzo temporal de un equipo que tiene el trabajo identificado pero no las manos.',
        'Una segunda opinión técnica sobre una decisión de arquitectura antes de tomarla.',
      ],
      outro:
        'Lo que tienen en común es que hay un sistema existente de por medio. Un desarrollo desde cero, sin restricciones, casi nunca es el caso real.',
    },

    {
      type: 'steps',
      id: 'como-se-trabaja',
      heading: 'Cómo se trabaja en la práctica',
      items: [
        {
          title: 'Entender antes de proponer',
          body: `Versión de Java, framework, servidor, cómo se construye, cómo se despliega y qué duele hoy. Una llamada de ${OFFER.duration} ahorra semanas de suposiciones, y a veces lo que sale es que no hace falta lo que se venía a pedir.`,
        },
        {
          title: 'Acotar el primer entregable',
          body: 'Algo pequeño, completo y desplegable. Sirve para validar el encaje técnico y la forma de trabajar antes de comprometer nada grande.',
        },
        {
          title: 'Entregar por incrementos que llegan a producción',
          body: 'Cada entrega pasa por vuestra revisión y sale por el camino de siempre. Sin ramas largas: lo que no se despliega, no se sabe si funciona.',
        },
        {
          title: 'Dejar pruebas con cada cambio',
          body: 'No como fase final, sino en el mismo commit. En una aplicación sin cobertura, cada funcionalidad nueva es la oportunidad de cubrir el flujo al que pertenece.',
        },
        {
          title: 'Documentar las decisiones, no el código',
          body: 'Lo que hace falta dentro de un año no es un comentario que repita la línea siguiente, sino saber por qué se descartó la alternativa obvia.',
        },
      ],
    },

    {
      type: 'table',
      id: 'donde-suelen-estar-los-problemas',
      heading: 'Dónde suelen estar los problemas en un backend Java',
      intro:
        'Cuatro capas, cada una con sus síntomas propios. Es útil saber cuál es la que está fallando antes de empezar a cambiar cosas.',
      caption: 'Capas de un backend Java y qué suele fallar en cada una',
      columns: ['Capa', 'Síntoma habitual', 'Qué se revisa'],
      rows: [
        {
          header: 'Plataforma',
          cells: [
            'No se puede subir una librería',
            'Versión de Java, servidor de aplicaciones y árbol de dependencias',
          ],
        },
        {
          header: 'Persistencia',
          cells: [
            'La aplicación se degrada según crecen los datos',
            'SQL generado, consultas N+1 y límites de las transacciones',
          ],
        },
        {
          header: 'Integración',
          cells: [
            'Un cambio en un sistema vecino rompe el nuestro',
            'Contratos explícitos, tolerancia a fallos y reintentos',
          ],
        },
        {
          header: 'Entrega',
          cells: [
            'Desplegar exige ventana y plan de vuelta atrás',
            'Cobertura de pruebas, pasos manuales y configuración fuera del repositorio',
          ],
        },
      ],
    },

    {
      type: 'errors',
      id: 'problemas-de-persistencia',
      heading: 'Los problemas de persistencia que más se repiten',
      intro:
        'Aparecen cuando los datos crecen, no cuando se escribe el código, y por eso pasan las pruebas y fallan en producción.',
      items: [
        {
          signature: 'LazyInitializationException: could not initialize proxy',
          cause:
            'Se accede a una relación perezosa fuera de la transacción que cargó la entidad. Suele salir al serializar la respuesta, con la sesión ya cerrada.',
          fix: 'No alargar la transacción hasta la capa de presentación, sino cargar de forma explícita lo que hace falta, o trabajar con una proyección que solo traiga los campos necesarios.',
        },
        {
          signature: 'Una pantalla que lanza 400 consultas para pintar 40 filas',
          cause:
            'Consultas N+1: por cada elemento de una lista se lanza una consulta adicional para resolver una relación.',
          fix: [
            'Traer la relación en la misma consulta cuando de verdad se usa, y activar la traza de SQL en desarrollo. Un ',
            { code: 'JOIN FETCH' },
            ' puntual resuelve la mayoría de los casos sin tocar el mapeo.',
          ],
        },
        {
          signature: 'OutOfMemoryError al ejecutar un proceso por lotes',
          cause:
            'El proceso carga la tabla entera en memoria porque la consulta no pagina y el contexto de persistencia no se vacía nunca.',
          fix: 'Procesar por bloques y limpiar el contexto en cada uno. Un proceso que funciona con mil registros y revienta con un millón no es un problema de memoria disponible.',
        },
        {
          signature: 'Bloqueos que solo aparecen con carga real',
          cause:
            'Dos flujos actualizan las mismas filas en orden distinto, o una transacción sigue abierta mientras espera a un sistema externo.',
          fix: 'Sacar las llamadas externas fuera de la transacción y unificar el orden de actualización. Reproducirlo exige concurrencia: con un solo usuario no aparece nunca.',
        },
      ],
    },
  ],

  faq: [
    {
      question: '¿Trabajáis con aplicaciones antiguas o solo con proyectos nuevos?',
      answer:
        'Sobre todo con aplicaciones que ya están en producción. Un desarrollo sin restricciones previas es la excepción: lo normal es que haya un sistema, un historial y unas condiciones que respetar.',
    },
    {
      question: '¿Podéis trabajar dentro de nuestro equipo y con nuestro repositorio?',
      answer:
        'Sí, y es lo habitual. Mismas reglas de revisión y mismo camino a producción que el resto del equipo. Un trabajo que llega en un paquete cerrado al final es imposible de revisar de verdad.',
    },
    {
      question: '¿Qué pasa si la aplicación no tiene pruebas?',
      answer:
        'Se construyen sobre el flujo en el que se vaya a trabajar, como parte del encargo y no como extra. Cambiar código sin una red que demuestre que el comportamiento se mantiene es adivinar.',
    },
    {
      question: '¿Hace falta actualizar la versión de Java para poder desarrollar?',
      answer:
        'No siempre. Se puede desarrollar sobre la versión actual, y de hecho suele ser lo sensato al principio. Si la versión antigua es lo que bloquea el trabajo, se dice y se aborda como un trabajo aparte con su propio alcance.',
    },
    {
      question: '¿Hacéis también administración de sistemas o infraestructura?',
      answer:
        'No. El alcance llega hasta que la aplicación se construye, se prueba y se empaqueta de forma reproducible. Si vuestro proyecto necesita más que eso, os lo digo en la primera llamada.',
    },
  ],
}
