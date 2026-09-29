import type { EntryContent } from '../contentTypes.ts'

export const springBoot: EntryContent = {
  faqTitle: 'Dudas frecuentes sobre el desarrollo con Spring Boot',

  sections: [
    {
      type: 'prose',
      id: 'como-encaja-spring-boot',
      heading: 'Cómo encaja Spring Boot en una empresa que ya tiene sistemas',
      intro:
        'La mayoría de proyectos no empiezan en blanco: empiezan al lado de algo que ya funciona y no se puede parar.',
      body: [
        'El planteamiento habitual no es migrar la aplicación entera, sino levantar los servicios nuevos en Spring Boot y dejar que convivan con lo anterior. Eso permite entregar valor desde la primera semana sin poner en riesgo lo que ya está en producción, y deja la decisión de qué se mueve para cuando haya datos en lugar de intuiciones.',
        [
          'Lo que hace que esa convivencia funcione no es el framework, son las fronteras: quién llama a quién, con qué contrato y qué pasa si una de las dos partes cambia. Cuando esas fronteras no existen, acaban siendo dos sistemas acoplados por la base de datos, que es lo peor de las dos opciones. Por eso el trabajo de ',
          { to: '/servicios/apis-rest/', text: 'diseño de las APIs' },
          ' va por delante del de infraestructura.',
        ],
        'Spring Boot aporta aquí algo concreto: arranque autónomo, configuración por entorno y un modelo de pruebas que permite levantar el contexto real de la aplicación. Eso último es lo que más cambia el día a día de un equipo, porque convierte las pruebas de integración en algo que se ejecuta en cada cambio y no una vez al mes.',
      ],
    },

    {
      type: 'checklist',
      id: 'que-se-construye',
      heading: 'Qué se construye en un proyecto de este tipo',
      items: [
        'Servicios backend con su propia configuración por entorno, sin valores fijados en el código.',
        'APIs REST con contrato documentado y pruebas que fallan si la respuesta cambia de forma.',
        'Acceso a datos con Spring Data JPA, revisando el SQL que se genera y no solo el código que lo pide.',
        'Seguridad declarada por recurso, no solo a la entrada del servicio.',
        'Pruebas de integración sobre el contexto real de la aplicación y contra base de datos, no contra dobles.',
        'Trazas, métricas y comprobaciones de salud desde el primer despliegue, no cuando aparece la primera incidencia.',
        'Empaquetado y despliegue reproducibles, con los mismos pasos en todos los entornos.',
      ],
      outro:
        'El orden importa: la observabilidad y las pruebas se montan al principio, cuando cuestan poco, no al final, cuando ya hay algo que arreglar y ninguna forma de ver qué pasa.',
    },

    {
      type: 'table',
      id: 'decisiones-iniciales',
      heading: 'Decisiones iniciales que condicionan el resto del proyecto',
      intro:
        'Son baratas al principio y caras después. Conviene tomarlas de forma consciente, no por defecto.',
      caption: 'Decisiones de arranque y criterio para elegir',
      columns: ['Decisión', 'Opciones', 'Criterio'],
      rows: [
        {
          header: 'Estructura del proyecto',
          cells: [
            'Módulo único o varios módulos',
            'Único mientras el equipo sea uno: varios módulos añaden fricción de construcción antes de aportar aislamiento',
          ],
        },
        {
          header: 'Acceso a datos',
          cells: [
            'Spring Data JPA o SQL explícito',
            'JPA para el ciclo de vida de entidades; SQL explícito para informes y consultas complejas, donde el mapeo estorba',
          ],
        },
        {
          header: 'Esquema de base de datos',
          cells: [
            'Generado por Hibernate o versionado con migraciones',
            'Migraciones versionadas siempre que haya producción: generar el esquema al arrancar impide saber en qué estado está cada entorno',
          ],
        },
        {
          header: 'Pruebas de integración',
          cells: [
            'Base de datos en memoria o contenedor con la real',
            'La real: una base de datos en memoria no reproduce el dialecto ni el comportamiento transaccional, y los fallos aparecen en producción',
          ],
        },
        {
          header: 'Configuración',
          cells: [
            'Ficheros por perfil o variables de entorno',
            'Variables de entorno para lo que cambia entre entornos y para todo lo que sea secreto',
          ],
        },
      ],
    },

    {
      type: 'prose',
      id: 'sobre-la-version',
      heading: 'Sobre qué versión de Spring Boot usar',
      body: [
        [
          'Para un desarrollo nuevo, la versión con soporte más reciente. Para un proyecto que ya existe, la decisión depende de la versión de Java: Spring Boot 3 exige Java 17 como mínimo y arrastra el cambio de ',
          { code: 'javax' },
          ' a ',
          { code: 'jakarta' },
          ' en toda la aplicación.',
        ],
        [
          'Eso convierte el salto en un proyecto con entidad propia, no en una actualización de dependencia. Cuando hay una aplicación en Spring Boot 2 que hay que mover, el camino y el orden están explicados en la página sobre la ',
          {
            to: '/retos/migracion-spring-boot/',
            text: 'migración hacia Spring Boot',
          },
          '.',
        ],
      ],
    },

    {
      type: 'errors',
      id: 'tropiezos-habituales',
      heading: 'Tropiezos habituales en proyectos Spring Boot',
      intro:
        'Ninguno es un fallo del framework: son comportamientos que sorprenden si no se conocen de antemano.',
      items: [
        {
          signature: 'Un método transaccional que no abre transacción',
          cause: [
            'La llamada viene de otro método de la misma clase. El proxy que aplica ',
            { code: '@Transactional' },
            ' solo intercepta las llamadas que entran desde fuera del bean.',
          ],
          fix: 'Mover el método a otro componente, para que la llamada atraviese el proxy. Es donde más tiempo se pierde depurando, porque el código parece correcto.',
        },
        {
          signature: 'La suite de pruebas tarda minutos en arrancar',
          cause:
            'Cada clase de prueba levanta un contexto distinto, porque cambian las anotaciones o la configuración y Spring no puede reutilizar el que tenía en memoria.',
          fix: 'Unificar la configuración de las pruebas de integración para que compartan contexto. Reducir el número de contextos distintos suele dividir el tiempo total entre tres o cuatro.',
        },
        {
          signature: 'Una propiedad de configuración que se ignora en silencio',
          cause:
            'La clave está mal escrita o pertenece a un perfil que no está activo. No hay error: se aplica el valor por defecto y el servicio arranca.',
          fix: 'Validar la configuración en el arranque, de forma que un valor obligatorio que falte impida levantar el servicio en lugar de dejarlo en pie con datos incorrectos.',
        },
        {
          signature: 'Se agotan las conexiones del pool bajo carga',
          cause:
            'Hay transacciones abiertas mientras se espera a un sistema externo, o el tamaño del pool se quedó en el valor por defecto sin medir nada.',
          fix: 'Sacar las llamadas externas fuera de la transacción y dimensionar el pool a partir de la concurrencia real. Subir el número sin entender la causa solo retrasa el problema.',
        },
      ],
    },
  ],

  faq: [
    {
      question: '¿Hay que migrar toda la aplicación para empezar a usar Spring Boot?',
      answer:
        'No. Lo habitual es levantar los servicios nuevos en Spring Boot y dejar que convivan con la aplicación existente. La migración del resto, si tiene sentido, se decide después y con datos.',
    },
    {
      question: '¿Hace falta ir a microservicios?',
      answer:
        'No. Un monolito modular, bien probado y desplegable es una arquitectura legítima, y para muchas aplicaciones empresariales es la correcta. Trocear un sistema que nadie entiende del todo suele multiplicar el problema en lugar de resolverlo.',
    },
    {
      question: '¿Qué versión de Java hace falta?',
      answer:
        'Spring Boot 3 requiere Java 17 como mínimo. Si la aplicación está en Java 8 u 11, la subida de versión se aborda antes y como trabajo independiente, para no mezclar dos fuentes de fallos distintas.',
    },
    {
      question: '¿Trabajáis dentro de nuestro equipo o por separado?',
      answer:
        'Lo habitual es trabajar contra vuestro repositorio con las mismas reglas que el resto del equipo, para que cada entrega pase por vuestra revisión y llegue a producción por el camino de siempre.',
    },
    {
      question: '¿Incluye el despliegue y la infraestructura?',
      answer:
        'Incluye el empaquetado y que el despliegue sea reproducible. La administración de sistemas y la infraestructura no: si vuestro proyecto lo necesita, os lo digo en la primera llamada en lugar de aprenderlo sobre la marcha.',
    },
  ],
}
