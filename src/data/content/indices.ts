import type { EntryContent } from '../contentTypes.ts'

/**
 * Cuerpo largo de las dos páginas índice.
 *
 * No están en el catálogo porque no son entradas: no tienen slug, ni bullets,
 * ni tecnologías, ni enlaces cruzados. Se indexan por ruta.
 *
 * REGLA DE CONTENIDO: estos bloques ENCAMINAN, no responden. `/servicios/`
 * atiende una intención comparativa ("cuál de los cuatro necesito") y
 * `/retos/` una diagnóstica ("tengo este síntoma, qué es"). Cualquier párrafo
 * que explique un tema a fondo pertenece a la página hija, y aquí solo
 * competiría contra ella.
 */
export const indexContent: Record<string, EntryContent> = {
  '/servicios/': {
    faqTitle: 'Preguntas antes de encargar nada',

    sections: [
      {
        type: 'table',
        id: 'que-servicio-encaja',
        heading: 'Qué encaja según el punto de partida',
        intro:
          'La forma más rápida de elegir no es leer los cuatro servicios, sino localizar la situación que se parece a la vuestra.',
        caption: 'Situación de partida, primer paso y servicio que corresponde',
        columns: ['Lo que hay hoy', 'Lo primero que se hace', 'Dónde se explica'],
        rows: [
          {
            header: 'Java 8 sobre un servidor que ya no se actualiza',
            cells: [
              'Inventario de dependencias y matriz de compatibilidad',
              [{ to: '/servicios/modernizacion-java/', text: 'Modernización Java' }],
            ],
          },
          {
            header: 'Una aplicación que funciona pero no admite cambios',
            cells: [
              'Pruebas que fijen el comportamiento actual',
              [{ to: '/servicios/modernizacion-java/', text: 'Modernización Java' }],
            ],
          },
          {
            header: 'Hay que construir funcionalidad nueva sobre lo existente',
            cells: [
              'Entender las restricciones antes de escribir código',
              [{ to: '/servicios/desarrollo-java/', text: 'Desarrollo Java' }],
            ],
          },
          {
            header: 'Servicios nuevos que deben convivir con el sistema actual',
            cells: [
              'Definir las fronteras entre lo nuevo y lo viejo',
              [{ to: '/servicios/spring-boot/', text: 'Spring Boot' }],
            ],
          },
          {
            header: 'Hay que exponer datos a otro sistema o a un tercero',
            cells: [
              'Fijar el contrato antes que la implementación',
              [{ to: '/servicios/apis-rest/', text: 'APIs REST' }],
            ],
          },
        ],
        note: [
          'Si ninguna se parece a vuestro caso, lo razonable es empezar por el ',
          {
            to: '/servicios/modernizacion-java/',
            text: 'análisis con alcance cerrado',
          },
          ': es lo que convierte una situación confusa en un plan con fases.',
        ],
      },

      {
        type: 'steps',
        id: 'del-primer-correo-a-la-entrega',
        heading: 'Del primer correo a la primera entrega',
        intro:
          'El proceso es el mismo sea cual sea el servicio, y está pensado para que se pueda cortar en cualquier punto.',
        items: [
          {
            title: 'Un mensaje con el contexto técnico',
            body: 'Versión de Java, framework, servidor y qué es lo que bloquea hoy. Con eso basta para saber si tiene sentido seguir.',
          },
          {
            title: 'Media hora de llamada',
            body: 'Para entender el sistema y el problema real, que no siempre es el que se viene a contar. Al colgar sabréis si puedo ayudaros, y si la respuesta es no, se dice.',
          },
          {
            title: 'Análisis con alcance y precio cerrados',
            body: 'Un encargo independiente que produce un documento: inventario, riesgos ordenados por impacto y plan por fases con esfuerzo estimado. Es vuestro aunque después no sigamos.',
          },
          {
            title: 'Ejecución por fases que se despliegan',
            body: 'Cada fase deja la aplicación funcionando y con sus pruebas. Se puede parar al final de cualquiera sin dejar nada a medias.',
          },
        ],
      },

      {
        type: 'prose',
        id: 'que-queda-fuera',
        heading: 'Qué queda fuera',
        body: [
          'No hay frontend, ni aplicaciones móviles, ni administración de sistemas. El alcance llega hasta que la aplicación se construye, se prueba y se empaqueta de forma reproducible.',
          'Tampoco entra una reescritura desde cero como propuesta por defecto. Rehacer un sistema que hoy funciona es la opción más cara y la de mayor riesgo; a veces es la correcta, y entonces se dice con los motivos delante.',
          'Decirlo por adelantado ahorra tiempo a las dos partes. Un encargo que no encaja se detecta en la primera llamada, no tres semanas después.',
        ],
      },

      {
        type: 'checklist',
        id: 'que-hace-falta-para-responder',
        heading: 'Qué hace falta saber para dar una respuesta útil',
        intro:
          'Con estos datos se puede responder algo concreto en el primer mensaje. Sin ellos, cualquier respuesta es genérica.',
        items: [
          'Versión de Java en la que corre hoy la aplicación.',
          'Framework y versión: Spring, Spring Boot, Java EE o Jakarta EE.',
          'Servidor de aplicaciones, si lo hay, y su versión.',
          'Sistema de construcción: Maven o Gradle.',
          'Si existen pruebas automáticas y qué parte del sistema cubren.',
          'Quién consume la aplicación: personas, otros sistemas o ambos.',
          'Si los despliegues necesitan una ventana pactada.',
        ],
        outro:
          'Ninguno es imprescindible para escribir: si no se saben, se averiguan en la llamada. Con la mitad de ellos ya se puede dar una respuesta concreta.',
      },
    ],

    faq: [
      {
        question: '¿Cómo se factura el análisis inicial?',
        answer:
          'Como un encargo aparte, con alcance y precio cerrados antes de empezar. No lleva compromiso de continuidad: el documento resultante se puede ejecutar con vuestro equipo, con otro proveedor o conmigo.',
      },
      {
        question: '¿Se trabaja en remoto?',
        answer:
          'Sí, y contra vuestro repositorio, con las mismas reglas de revisión que el resto del equipo. Cada entrega pasa por vuestra aprobación y llega a producción por el camino de siempre.',
      },
      {
        question: '¿Qué pasa si el encargo no encaja?',
        answer:
          'Se dice en la primera llamada. Aceptar un trabajo que queda fuera del alcance y aprenderlo sobre la marcha sale caro para las dos partes.',
      },
      {
        question: '¿Se puede contratar solo una parte?',
        answer:
          'Sí. De hecho es lo habitual: primero el análisis, y después se decide si se ejecuta, quién lo ejecuta y en qué orden. Cada fase posterior es también una unidad independiente.',
      },
    ],
  },

  '/retos/': {
    faqTitle: 'Preguntas que se repiten en los cuatro casos',

    sections: [
      {
        type: 'errors',
        id: 'del-error-al-reto',
        heading: 'Los mensajes que suelen traer a alguien hasta aquí',
        intro:
          'Cada uno es el síntoma visible de un problema de fondo distinto. Aquí está la causa en una línea; el desarrollo, en la página que corresponde.',
        items: [
          {
            signature: 'NoClassDefFoundError: javax/xml/bind/JAXBContext',
            cause:
              'JAXB dejó de venir en el JDK a partir de Java 11 y no hay implementación que cargar en ejecución.',
            fix: [
              'Es un síntoma de un cambio de versión del JDK: ',
              {
                to: '/retos/actualizacion-java/',
                text: 'qué arrastra actualizar la versión de Java',
              },
              '.',
            ],
          },
          {
            signature: 'package javax.persistence does not exist',
            cause:
              'El proyecto ya usa dependencias jakarta pero quedan importaciones sin convertir, o al revés.',
            fix: [
              'Es el cambio de espacio de nombres: ',
              {
                to: '/retos/migracion-java-ee-jakarta-ee/',
                text: 'cómo se migra de Java EE a Jakarta EE',
              },
              '.',
            ],
          },
          {
            signature: 'InaccessibleObjectException: module java.base does not opens java.lang',
            cause:
              'Una librería accede por reflexión a clases internas del JDK, y desde Java 16 eso es un error y no un aviso.',
            fix: [
              'Sale al subir de versión y se resuelve actualizando la librería: ',
              {
                to: '/retos/actualizacion-java/',
                text: 'actualización de versiones de Java',
              },
              '.',
            ],
          },
          {
            signature: 'ClassNotFoundException: javax.servlet.Filter al arrancar Spring',
            cause:
              'La aplicación corre sobre Spring 6, que ya es jakarta, con alguna dependencia todavía en la variante antigua.',
            fix: [
              'Es el salto de Spring Boot 2 a 3: ',
              {
                to: '/retos/migracion-spring-boot/',
                text: 'qué implica la migración hacia Spring Boot',
              },
              '.',
            ],
          },
          {
            signature: 'UnsupportedClassVersionError: class file version 61.0',
            cause:
              'El entorno que ejecuta la aplicación usa un JDK más antiguo que el que la compiló.',
            fix: [
              'Casi siempre indica que el servidor marca el techo real: ',
              {
                to: '/retos/migracion-java-legacy/',
                text: 'qué se analiza antes de modernizar',
              },
              '.',
            ],
          },
        ],
      },

      {
        type: 'table',
        id: 'del-sintoma-al-reto',
        heading: 'Qué hay detrás de lo que se nota desde fuera',
        intro:
          'Los síntomas que llegan a una reunión rara vez se describen en términos técnicos. Esta es la traducción.',
        caption: 'Síntoma percibido, causa habitual y página que lo desarrolla',
        columns: ['Lo que se dice en la reunión', 'Lo que suele ser', 'Dónde se explica'],
        rows: [
          {
            header: 'No podemos actualizar esa librería',
            cells: [
              'La versión de Java se quedó atrás y ya no hay versiones compatibles',
              [{ to: '/retos/actualizacion-java/', text: 'Actualización de versiones Java' }],
            ],
          },
          {
            header: 'El proveedor se fue y nadie toca ese módulo',
            cells: [
              'No hay pruebas ni documentación, así que ningún cambio es verificable',
              [{ to: '/retos/migracion-java-legacy/', text: 'Java Legacy' }],
            ],
          },
          {
            header: 'Cada despliegue ocupa un fin de semana',
            cells: [
              'Problema de arquitectura y de pruebas, no de despliegue',
              [{ to: '/retos/migracion-java-legacy/', text: 'Java Legacy' }],
            ],
          },
          {
            header: 'Queremos microservicios',
            cells: [
              'Casi siempre es necesidad de desplegar por partes, que se resuelve antes',
              [{ to: '/retos/migracion-spring-boot/', text: 'Migración a Spring Boot' }],
            ],
          },
          {
            header: 'Hay que certificar el servidor y ya no da soporte',
            cells: [
              'El salto de espacio de nombres viene incluido en el cambio',
              [{ to: '/retos/migracion-java-ee-jakarta-ee/', text: 'Java EE a Jakarta EE' }],
            ],
          },
        ],
      },

      {
        type: 'steps',
        id: 'en-que-orden-se-abordan',
        heading: 'En qué orden se abordan cuando aparecen los cuatro a la vez',
        intro:
          'Es lo más habitual, y el orden importa: invertirlo obliga a repetir trabajo ya hecho.',
        items: [
          {
            title: 'Primero, las pruebas',
            body: 'Antes de mover una versión hay que poder demostrar que el comportamiento se mantiene. Sin esa red, todo lo que viene después es adivinar.',
          },
          {
            title: 'Después, la versión de Java',
            body: 'Condiciona todo lo demás: el servidor que se puede usar, las versiones de framework disponibles y qué dependencias siguen publicando. Es el techo real del proyecto.',
          },
          {
            title: 'Luego, el espacio de nombres',
            body: 'El paso de javax a jakarta afecta al artefacto entero y no admite estados intermedios, así que conviene hacerlo cuando la versión de Java ya está decidida.',
          },
          {
            title: 'Por último, el framework y la arquitectura',
            body: 'Spring Boot 3 exige las dos cosas anteriores resueltas. Intentarlo antes obliga a deshacer y rehacer la mitad del trabajo.',
          },
        ],
      },

      {
        type: 'prose',
        id: 'cuando-no-es-un-problema-tecnico',
        heading: 'Cuando el problema no es técnico',
        body: [
          'A veces el inventario sale limpio: la versión es reciente, las dependencias están al día y el código es razonable. Y aun así nadie se atreve a desplegar un viernes.',
          'En esos casos lo que falta no es una migración, sino saber qué hace el sistema. Puede ser que no haya nadie que conozca las reglas de negocio, que no exista un responsable funcional a quien preguntar, o que las pruebas ejecuten código sin comprobar comportamiento.',
          'Eso no se arregla subiendo de versión, y conviene detectarlo antes de presupuestar una modernización que no resolvería el problema real.',
        ],
      },
    ],

    faq: [
      {
        question: '¿Por cuál de los cuatro hay que empezar?',
        answer:
          'Por el que bloquee al resto, que casi siempre es la versión de Java. El análisis inicial sirve precisamente para ordenarlos por impacto en lugar de por urgencia percibida.',
      },
      {
        question: '¿Se pueden abordar varios a la vez?',
        answer:
          'Es mejor no hacerlo. Cuando fallan dos cambios simultáneos no hay forma de saber cuál lo provocó, y el tiempo que se ahorra en calendario se pierde depurando.',
      },
      {
        question: '¿Hace falta parar el desarrollo mientras tanto?',
        answer:
          'No, si cada fase se despliega. Una rama de migración abierta durante meses acaba en un conflicto que nadie se atreve a resolver, y ese es el escenario que se evita.',
      },
      {
        question: '¿Y si no se sabe en qué estado está la aplicación?',
        answer:
          'Es el punto de partida más frecuente. La información sale del código, del historial del repositorio y de lo que se observa en producción: que nadie recuerde por qué se tomó una decisión no impide ver qué hace hoy el sistema.',
      },
    ],
  },
}
