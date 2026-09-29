import type { EntryContent } from '../contentTypes.ts'

export const migracionSpringBoot: EntryContent = {
  faqTitle: 'Dudas frecuentes sobre la migración a Spring Boot',

  sections: [
    {
      type: 'prose',
      id: 'dos-migraciones-distintas',
      heading: 'Dos migraciones que se confunden y no son la misma',
      intro:
        'Conviene separarlas desde el principio, porque tienen riesgos y calendarios muy diferentes.',
      body: [
        'Una es llevar una aplicación Java EE o Spring clásico hacia Spring Boot. Ahí el trabajo es de arquitectura: cambia cómo arranca la aplicación, cómo se configura y cómo se empaqueta. El código de negocio se toca poco.',
        [
          'La otra es subir de Spring Boot 2 a Spring Boot 3. Ahí el trabajo es de compatibilidad: Spring Boot 3 exige Java 17 como mínimo y arrastra el ',
          {
            to: '/retos/migracion-java-ee-jakarta-ee/',
            text: 'cambio de javax a jakarta',
          },
          ' en toda la aplicación. Se parece mucho más a una migración de Jakarta EE que a un cambio de framework.',
        ],
        'La confusión sale cara cuando se planifican como si fueran una sola. Lo habitual es que una organización necesite las dos, pero en orden: primero llegar a Spring Boot 2 con la versión de Java adecuada, y después dar el salto a 3.',
      ],
    },

    {
      type: 'table',
      id: 'que-exige-cada-version',
      heading: 'Qué exige cada versión de Spring Boot',
      intro:
        'Esta tabla decide el orden del trabajo: la versión de Java es un requisito previo, no una consecuencia.',
      caption: 'Requisitos de cada generación de Spring Boot',
      columns: ['Spring Boot', 'Spring Framework', 'Java mínimo', 'Espacio de nombres'],
      rows: [
        { header: 'Spring Boot 2.5 y 2.6', cells: ['5.3', 'Java 8', 'javax'] },
        { header: 'Spring Boot 2.7', cells: ['5.3', 'Java 8', 'javax'] },
        { header: 'Spring Boot 3.0 a 3.2', cells: ['6.0 y 6.1', 'Java 17', 'jakarta'] },
        { header: 'Spring Boot 3.3 y posteriores', cells: ['6.1 y posteriores', 'Java 17', 'jakarta'] },
      ],
      note: 'Spring Boot 2.7 es la última puerta antes del salto: es el punto desde el que conviene migrar a 3, porque es donde las rutas de actualización están mejor documentadas y donde aparecen los avisos de lo que va a romperse.',
    },

    {
      type: 'checklist',
      id: 'que-cambia-al-pasar-a-boot-3',
      heading: 'Lo que cambia al pasar de Spring Boot 2 a 3',
      intro:
        'Más allá del renombrado de paquetes, hay cambios que no dan error de compilación y fallan en ejecución.',
      items: [
        'Propiedades de configuración renombradas: muchas claves de spring cambiaron y las antiguas dejan de leerse sin avisar.',
        'Spring Security reescribió su configuración: la clase base que se extendía dejó de existir y la configuración pasa a declararse como beans.',
        'Hibernate 6 sustituye a Hibernate 5, con su propio motor de consultas y su propia estrategia de nombres para tablas y columnas.',
        'El soporte de trazas y métricas cambia de modelo, y la configuración anterior deja de aplicarse.',
        'Las dependencias de terceros necesitan versión compatible con jakarta, no solo con Spring 6.',
      ],
      outro:
        'El más silencioso es el de la estrategia de nombres de Hibernate: si el esquema de base de datos no coincide con lo que genera la versión nueva, la aplicación arranca y falla al consultar.',
    },

    {
      type: 'errors',
      id: 'errores-al-arrancar',
      heading: 'Errores habituales tras la actualización',
      items: [
        {
          signature: 'ClassNotFoundException: javax.servlet.Filter',
          cause:
            'Queda una dependencia en la variante javax dentro de un proyecto que ya corre sobre Spring 6.',
          fix: [
            'Buscar la transitiva culpable con ',
            { code: 'mvn dependency:tree' },
            ' y sustituirla por su versión jakarta o excluirla si ya no hace falta.',
          ],
        },
        {
          signature: 'Cannot resolve configuration property spring.redis.host',
          cause:
            'Una propiedad renombrada en Spring Boot 3. La antigua no da error: simplemente deja de aplicarse, y la aplicación arranca con el valor por defecto.',
          fix: 'Pasar por el analizador de propiedades antes de migrar y revisar el fichero de configuración entero, no solo lo que falle al arrancar.',
        },
        {
          signature: 'Table not found tras migrar a Hibernate 6',
          cause:
            'Hibernate 6 cambió cómo deriva los nombres de tablas y columnas a partir de los nombres de las entidades.',
          fix: [
            'Fijar de forma explícita la estrategia de nombres, o declarar el nombre real con ',
            { code: '@Table' },
            ' y ',
            { code: '@Column' },
            ' en las entidades afectadas. Es preferible lo segundo: deja de depender de una convención.',
          ],
        },
        {
          signature: 'No qualifying bean of type WebSecurityConfigurerAdapter',
          cause:
            'La clase desapareció en Spring Security 6 y la configuración pasa a declararse mediante beans.',
          fix: 'Reescribir la configuración de seguridad como cadena de filtros declarada por beans. Conviene hacerlo antes del salto, estando todavía en Spring Boot 2.7, donde ya está soportado.',
        },
      ],
    },

    {
      type: 'steps',
      id: 'orden-recomendado',
      heading: 'El orden que evita tener que volver atrás',
      items: [
        {
          title: 'Llegar a Spring Boot 2.7',
          body: 'Dentro de la misma generación, sin cambiar de espacio de nombres ni de versión de Java. Es un paso barato que deja la aplicación en el mejor sitio posible para saltar.',
        },
        {
          title: 'Adelantar lo que ya es compatible',
          body: 'La configuración de Spring Security por beans y la sustitución de APIs marcadas como obsoletas se pueden hacer todavía en la versión 2.7. Cuanto menos quede para el salto, más fácil es aislar la causa cuando algo falle.',
        },
        {
          title: 'Subir a Java 17',
          body: 'Es requisito de Spring Boot 3, así que se resuelve antes y por separado. Mezclar el cambio de JDK con el de framework hace imposible saber cuál de los dos provocó cada fallo.',
        },
        {
          title: 'Dar el salto a Spring Boot 3',
          body: 'Renombrado de paquetes, actualización de dependencias y revisión de propiedades, en un bloque acotado y con las pruebas verdes al terminar.',
        },
        {
          title: 'Revisar persistencia contra el SQL generado',
          body: 'Comparar las consultas que produce Hibernate 6 con las de la versión anterior sobre los flujos críticos. Que compile y arranque no demuestra que consulte lo mismo.',
        },
      ],
    },

    {
      type: 'prose',
      id: 'convivencia-en-lugar-de-reescritura',
      heading: 'Cuando lo razonable es convivir en vez de migrar',
      body: [
        'No toda aplicación necesita moverse entera. En muchos casos lo sensato es levantar los servicios nuevos en Spring Boot y dejar que convivan con la aplicación existente, decidiendo después qué se mueve y en qué orden.',
        [
          'Eso exige que las fronteras estén claras: quién consume qué, con qué contrato y qué pasa si una de las dos partes cambia. Es el mismo trabajo de límites que hay detrás de un ',
          { to: '/servicios/apis-rest/', text: 'diseño de APIs REST mantenible' },
          ', y sin él la convivencia se convierte en dos sistemas acoplados por la base de datos.',
        ],
        [
          'La ventaja es que cada servicio nuevo entrega valor desde el primer día y la migración deja de ser un proyecto con fecha única. La alternativa, reescribir de golpe, es la opción más cara y la de mayor riesgo, y solo compensa cuando el sistema actual ya no se puede sostener. Cuando ese es el caso, el punto de partida es el ',
          {
            to: '/retos/migracion-java-legacy/',
            text: 'análisis previo de la aplicación legacy',
          },
          '.',
        ],
      ],
    },
  ],

  faq: [
    {
      question: '¿Se puede migrar a Spring Boot 3 sin subir a Java 17?',
      answer:
        'No. Java 17 es el mínimo obligatorio de Spring Boot 3, no una recomendación. Por eso la subida de versión de Java se aborda antes y como trabajo independiente.',
    },
    {
      question: '¿Hay que migrar toda la aplicación de golpe?',
      answer:
        'El artefacto sí, porque el espacio de nombres es uno u otro. La aplicación entendida como sistema no: es frecuente levantar servicios nuevos en Spring Boot y dejar que convivan con lo anterior mientras se decide qué se mueve.',
    },
    {
      question: '¿Cuánto trabajo es pasar de Spring Boot 2 a 3?',
      answer:
        'El renombrado es cuestión de horas con las herramientas adecuadas. Lo que consume el tiempo son las dependencias sin versión compatible, las propiedades renombradas que fallan en silencio y la revisión de Hibernate 6. El inventario previo es el que da la cifra.',
    },
    {
      question: '¿Hace falta ir a microservicios al migrar?',
      answer:
        'No. Un monolito modular, bien probado y desplegable es una arquitectura legítima, y para muchas aplicaciones empresariales es la correcta. Trocear un sistema que nadie entiende del todo suele multiplicar el problema en lugar de resolverlo.',
    },
    {
      question: '¿Qué pasa con las aplicaciones en Spring clásico, sin Boot?',
      answer:
        'El camino habitual es reconstruir el arranque y la configuración sobre Spring Boot manteniendo el código de negocio, que suele necesitar pocos cambios. Lo que más trabajo da es la configuración XML heredada y las integraciones que dependían del servidor de aplicaciones.',
    },
    {
      question: '¿Se puede hacer sin parar las entregas?',
      answer:
        'Sí, si cada fase se despliega. Llegar a la versión 2.7, adelantar lo compatible y subir Java son pasos que llegan a producción por separado. El salto final queda así acotado a un cambio pequeño y reversible.',
    },
  ],
}
