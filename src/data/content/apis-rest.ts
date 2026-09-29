import type { EntryContent } from '../contentTypes.ts'

export const apisRest: EntryContent = {
  faqTitle: 'Dudas frecuentes sobre el desarrollo de APIs',

  sections: [
    {
      type: 'prose',
      id: 'lo-dificil-no-es-el-primer-endpoint',
      heading: 'Lo difícil no es el primer endpoint: es el segundo cambio',
      intro:
        'Exponer datos es cuestión de horas. Poder cambiarlos dentro de un año sin romper a quien los consume es lo que cuesta.',
      body: [
        'Una API deja de ser un detalle de implementación en el momento en que alguien la usa. A partir de ahí cada respuesta es un contrato, y los contratos solo se pueden cambiar de dos maneras: avisando o rompiendo. La diferencia entre una API sostenible y una que da miedo tocar se decide en las primeras semanas, no en el rendimiento.',
        [
          'El error más caro es dejar que el modelo de persistencia se filtre hacia fuera. Cuando se serializan directamente las entidades JPA, cualquier cambio en el modelo de datos se convierte en un cambio de contrato, y renombrar una columna pasa a ser una negociación con tres equipos. El trabajo consiste en poner una capa propia de representación en medio, aunque al principio parezca duplicación. Es la misma frontera que hace posible ',
          {
            to: '/retos/migracion-spring-boot/',
            text: 'mover la aplicación a Spring Boot por partes',
          },
          '.',
        ],
        'La segunda decisión que marca el resto es qué se hace cuando algo va mal. Una API que responde 200 con un mensaje de error dentro del cuerpo obliga a cada consumidor a inventarse su propia lógica de detección, y esa lógica siempre acaba siendo distinta en cada cliente.',
      ],
    },

    {
      type: 'table',
      id: 'decisiones-de-diseno',
      heading: 'Las decisiones que conviene tomar antes de escribir código',
      intro:
        'No hay una respuesta correcta universal, pero sí hay una respuesta correcta para cada contexto. Lo que no funciona es decidirlo sobre la marcha en cada endpoint.',
      caption: 'Decisiones de diseño habituales y cuándo encaja cada opción',
      columns: ['Decisión', 'Opciones', 'Cuándo encaja cada una'],
      rows: [
        {
          header: 'Versionado',
          cells: [
            'En la ruta o mediante cabecera',
            'En la ruta cuando hay consumidores externos que necesitan verlo; por cabecera cuando el consumo es interno y controlado',
          ],
        },
        {
          header: 'Paginación',
          cells: [
            'Por desplazamiento o por cursor',
            'Por desplazamiento en catálogos estables; por cursor cuando los datos cambian mientras se recorren',
          ],
        },
        {
          header: 'Errores',
          cells: [
            'Cuerpo propio o formato estándar de detalle de problema',
            'El formato estándar salvo que ya exista un contrato previo que no se pueda cambiar',
          ],
        },
        {
          header: 'Identificadores',
          cells: [
            'Secuencia de base de datos o identificador opaco',
            'Opaco siempre que salga al exterior: una secuencia expone volumen de negocio y facilita enumerar registros',
          ],
        },
        {
          header: 'Operaciones de escritura',
          cells: [
            'Idempotentes o no',
            'Idempotentes siempre que el cliente pueda reintentar, que en la práctica es casi siempre',
          ],
        },
      ],
    },

    {
      type: 'errors',
      id: 'sintomas-de-una-api-fragil',
      heading: 'Síntomas de que una API se va a volver difícil de cambiar',
      intro:
        'Ninguno es un fallo en ejecución. Todos son decisiones que se pagan más adelante.',
      items: [
        {
          signature: 'Renombrar un campo de una entidad rompe a un consumidor',
          cause:
            'El modelo de persistencia se está serializando tal cual. La base de datos y el contrato público son la misma cosa.',
          fix: 'Introducir objetos de representación propios en la frontera. Se puede hacer de forma progresiva, empezando por los recursos que más cambian.',
        },
        {
          signature: 'Cada cliente interpreta los errores de una forma distinta',
          cause:
            'La API responde con códigos de estado inconsistentes, o mete el error dentro de una respuesta correcta.',
          fix: 'Unificar el formato de error y los códigos de estado, y documentarlos. Un error debe poder tratarse sin leer el cuerpo para saber si lo es.',
        },
        {
          signature: 'Un reintento del cliente duplica un pedido',
          cause:
            'La operación de creación no es idempotente y el cliente no tiene forma de saber si la primera llamada llegó.',
          fix: 'Aceptar una clave de idempotencia proporcionada por el cliente y devolver la misma respuesta ante una repetición. Evita la mayoría de incidencias de duplicados.',
        },
        {
          signature: 'Nadie sabe quién consume un endpoint',
          cause:
            'No hay registro de consumidores ni trazas que lo permitan deducir, así que ningún cambio se considera seguro.',
          fix: 'Instrumentar por consumidor antes de tocar nada. Saber quién llama y con qué frecuencia convierte una retirada arriesgada en un plan con fechas.',
        },
      ],
    },

    {
      type: 'checklist',
      id: 'antes-de-exponerla',
      heading: 'Lo que debería estar resuelto antes de exponer una API',
      items: [
        'Contrato documentado y generado desde el código, no escrito aparte.',
        'Formato de error único, con códigos de estado coherentes.',
        'Estrategia de versionado decidida, aunque solo exista la versión uno.',
        'Autenticación y autorización definidas por recurso, no solo a la entrada.',
        'Límites de tamaño y de frecuencia, para que un cliente mal programado no tumbe al resto.',
        'Pruebas de contrato que fallen si la respuesta cambia de forma.',
        'Trazas que permitan saber qué consumidor hizo qué llamada.',
      ],
      outro: [
        'Sobre una aplicación que ya está en producción, esto rara vez se hace de golpe: se introduce recurso a recurso, con el sistema funcionando, dentro del trabajo de ',
        {
          to: '/servicios/modernizacion-java/',
          text: 'modernización de la aplicación',
        },
        '.',
      ],
    },

    {
      type: 'steps',
      id: 'cambiar-un-contrato-vivo',
      heading: 'Cómo se cambia un contrato que ya tiene consumidores',
      intro:
        'El objetivo es que ningún consumidor tenga que coordinarse con vosotros para seguir funcionando.',
      items: [
        {
          title: 'Saber quién consume qué',
          body: 'Instrumentar por consumidor y por recurso antes de plantear ningún cambio. Sin ese dato, retirar un campo es una decisión a ciegas y cualquier fecha es inventada.',
        },
        {
          title: 'Añadir antes de quitar',
          body: 'El campo o el recurso nuevo convive con el antiguo. Añadir no rompe a nadie; quitar sí. Esa asimetría es la que permite avanzar sin reuniones de coordinación.',
        },
        {
          title: 'Marcar lo antiguo como obsoleto donde se vea',
          body: 'En la documentación generada y en las trazas. Un aviso que solo existe en un correo enviado hace ocho meses no lo ha leído nadie.',
        },
        {
          title: 'Esperar a que el uso llegue a cero',
          body: 'Con datos, no con una fecha pactada. Cuando las llamadas al recurso antiguo caen a cero y se mantienen así, la retirada deja de ser una negociación.',
        },
        {
          title: 'Retirar y limpiar',
          body: 'Se elimina el código, no se deja desactivado por si acaso. Un camino muerto que sigue ahí vuelve a estar vivo en cuanto alguien lo encuentra.',
        },
      ],
    },
  ],

  faq: [
    {
      question: '¿Trabajáis sobre una API existente o solo con desarrollos nuevos?',
      answer:
        'Las dos cosas, y lo más habitual es lo primero: evolucionar una API que ya tiene consumidores. Eso exige saber antes quién la usa y con qué contrato, porque el margen de maniobra lo marcan ellos.',
    },
    {
      question: '¿Hace falta rehacer la API para poder cambiarla?',
      answer:
        'Casi nunca. Lo habitual es introducir una capa de representación propia en los recursos que más cambian y dejar el resto como está. Rehacer la API entera obliga a migrar a todos los consumidores a la vez, que es justo lo que se intenta evitar.',
    },
    {
      question: '¿Qué pasa con los consumidores que no se pueden actualizar?',
      answer:
        'Se mantiene la versión antigua mientras haga falta y se instrumenta para saber cuándo deja de usarse. Retirar un endpoint sin datos de uso es una decisión a ciegas; con datos, es una fecha.',
    },
    {
      question: '¿Documentáis la API?',
      answer:
        'Sí, y generada desde el propio código. Una documentación escrita aparte deja de ser cierta en la primera entrega, y una documentación que miente es peor que no tenerla.',
    },
    {
      question: '¿Esto vale para APIs internas entre sistemas?',
      answer:
        'Sí, y muchas veces importa más. Una API interna suele tener más consumidores de los que nadie recuerda, y como no hay contrato formal, cualquier cambio se descubre en producción.',
    },
  ],
}
