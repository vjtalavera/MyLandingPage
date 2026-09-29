import type { EntryContent } from '../contentTypes.ts'

export const modernizacionJava: EntryContent = {
  faqTitle: 'Dudas frecuentes sobre el servicio de modernización',

  sections: [
    {
      type: 'prose',
      id: 'como-funciona-el-servicio',
      heading: 'Cómo funciona el servicio, paso a paso',
      intro:
        'La modernización no empieza tocando código: empieza sabiendo qué hay. Y eso es un trabajo con alcance y precio cerrados.',
      body: [
        'La primera fase es siempre un análisis acotado. Inventario de dependencias, incompatibilidades detectadas, riesgos ordenados por impacto y un plan por fases con el esfuerzo estimado de cada una. Es un encargo independiente: el documento es vuestro aunque después no sigamos trabajando juntos, y sirve igual si decidís ejecutarlo con vuestro propio equipo.',
        'A partir de ahí se ejecuta por incrementos que llegan a producción. Cada fase deja la aplicación funcionando y con sus pruebas, sin ramas de migración abiertas durante meses. El objetivo no es terminar antes: es que en cualquier momento se pueda parar sin dejar el sistema a medias.',
        'La última fase es el traspaso. Documentación de qué se ha cambiado y por qué, decisiones registradas y una sesión con vuestro equipo. El servicio está bien hecho cuando podéis seguir sin mí.',
      ],
    },

    {
      type: 'table',
      id: 'que-incluye-cada-fase',
      heading: 'Qué se entrega en cada fase',
      intro:
        'Sirve para saber qué esperar y en qué momento, y para poder cortar al final de cualquiera de ellas.',
      caption: 'Fases del servicio, entregable y decisión que permite tomar',
      columns: ['Fase', 'Entregable', 'Qué permite decidir'],
      rows: [
        {
          header: 'Llamada de diagnóstico',
          cells: [
            'Respuesta a si puedo ayudaros y cómo',
            'Si tiene sentido seguir adelante, sin coste',
          ],
        },
        {
          header: 'Análisis técnico',
          cells: [
            'Inventario, matriz de riesgos y plan por fases con esfuerzo estimado',
            'Qué se hace, en qué orden y con qué presupuesto',
          ],
        },
        {
          header: 'Red de pruebas',
          cells: [
            'Pruebas que fijan el comportamiento actual de los flujos críticos',
            'Si se puede empezar a cambiar código con seguridad',
          ],
        },
        {
          header: 'Ejecución por incrementos',
          cells: [
            'Fases desplegadas, cada una con sus pruebas',
            'Si se continúa, se pausa o se corta, al final de cada fase',
          ],
        },
        {
          header: 'Traspaso',
          cells: [
            'Documentación, decisiones registradas y sesión con el equipo',
            'Cómo seguís vosotros a partir de ahí',
          ],
        },
      ],
    },

    {
      type: 'checklist',
      id: 'casos-que-encajan',
      heading: 'Los casos en los que este servicio encaja',
      items: [
        'Una aplicación en Java 8 que bloquea la actualización de librerías que necesitáis.',
        'Un sistema que funciona pero que nadie se atreve a desplegar fuera de una ventana pactada.',
        'Una migración de espacio de nombres pendiente, de javax a jakarta, con dependencias dudosas.',
        'Un proveedor original que ya no está y una documentación que es el propio código.',
        'Un salto de Hibernate o de Spring que se intentó, se complicó y se dejó a medias.',
        'Una necesidad de funcionalidad nueva sobre una base que no admite cambios con seguridad.',
      ],
      outro: [
        'Si lo que buscáis es entender el problema antes de contratar nada, las páginas de retos explican qué implica cada uno: ',
        {
          to: '/retos/migracion-java-legacy/',
          text: 'qué supone modernizar una aplicación legacy',
        },
        ' y ',
        {
          to: '/retos/actualizacion-java/',
          text: 'qué arrastra subir la versión de Java',
        },
        '.',
      ],
    },

    {
      type: 'prose',
      id: 'que-no-hago',
      heading: 'Lo que este servicio no es',
      body: [
        'No es una reescritura por defecto. Rehacer un sistema que hoy funciona es la opción más cara y la de mayor riesgo. A veces es la correcta, y entonces lo diré con los motivos delante, pero nunca es el punto de partida.',
        'No es una migración a ciegas. Si no hay pruebas suficientes para demostrar que el comportamiento se mantiene, construirlas es la primera fase y no un extra opcional. Migrar sin esa red es cambiar código y confiar en que nadie se dé cuenta.',
        'No es una estimación dada en la primera llamada. Un número dicho antes de mirar el código y las dependencias no es una estimación: es una cifra que nos va a incomodar a los dos dentro de tres meses.',
        'Y no es administración de sistemas. Si vuestro proyecto lo necesita, os lo digo en la primera llamada en lugar de aceptarlo y aprender sobre la marcha.',
      ],
    },

    {
      type: 'prose',
      id: 'como-se-estima',
      heading: 'Cómo se estima sin inventar una cifra',
      body: [
        'Una estimación dada antes de mirar el código no es una estimación: es un número que va a incomodar a las dos partes dentro de tres meses. Por eso el análisis existe como trabajo separado y con precio cerrado, en lugar de regalarse dentro de una propuesta comercial.',
        'Lo que se estima después no es el proyecto entero, sino cada fase por separado. Una fase es una unidad que se despliega y deja la aplicación funcionando, así que su esfuerzo se acota con mucha más precisión que el de un objetivo lejano. Y si la tercera fase resulta más cara de lo previsto, eso se sabe cuando las dos primeras ya están entregadas.',
        'Lo que más desvía las estimaciones en este tipo de trabajo no es la complejidad del código propio, sino las dependencias de terceros sin versión compatible y la cantidad de pruebas que hay que construir antes de poder tocar nada. Las dos cosas son medibles, y las dos salen del inventario inicial.',
      ],
    },

    {
      type: 'checklist',
      id: 'que-hace-falta-por-vuestra-parte',
      heading: 'Qué hace falta por vuestra parte',
      intro:
        'Poco, pero concreto. Sin esto el análisis se convierte en suposiciones bien redactadas.',
      items: [
        'Acceso de lectura al código y al historial del repositorio.',
        'Una persona del equipo con la que resolver dudas de contexto, aunque sea media hora a la semana.',
        'Saber qué flujos son críticos para el negocio, que no siempre son los que más código tienen.',
        'Acceso a la configuración de los entornos, o al menos a su descripción.',
        'Los incidentes de los últimos meses, si existen: dicen más del estado real que cualquier documento.',
      ],
    },
  ],

  faq: [
    {
      question: '¿Puedo contratar solo el análisis?',
      answer:
        'Sí, y es lo habitual. Es un trabajo con alcance y precio cerrados, y su resultado es un documento que podéis ejecutar con vuestro equipo, con otro proveedor o conmigo. No lleva compromiso de continuidad.',
    },
    {
      question: '¿Trabajáis sobre nuestro repositorio o sobre una copia?',
      answer:
        'Como prefiráis. Lo habitual es trabajar contra el repositorio con las mismas reglas que el resto del equipo, para que cada fase pase por vuestra revisión y llegue a producción por el camino de siempre.',
    },
    {
      question: '¿Qué pasa si a mitad del proyecto cambian las prioridades?',
      answer:
        'Que se para al final de la fase en curso, con el sistema desplegado y funcionando. Esa es la razón de trabajar por incrementos que llegan a producción: en ningún momento hay una migración a medias que haya que terminar por obligación.',
    },
    {
      question: '¿Cuánto dura una modernización completa?',
      answer:
        'Depende del inventario. Lo que marca el ritmo no suele ser el código propio, sino las dependencias de terceros sin versión compatible y la cantidad de pruebas que haya que construir antes de poder tocar nada.',
    },
    {
      question: '¿Hace falta parar el desarrollo de funcionalidades nuevas?',
      answer:
        'No. El trabajo se organiza para que convivan: cada fase se integra con lo que el equipo esté haciendo en paralelo. Una rama de modernización abierta durante meses acaba siendo imposible de fusionar, y ese es justamente el escenario que se evita.',
    },
    {
      question: '¿Y si al final la conclusión es que no hay que modernizar?',
      answer:
        'También es un resultado válido del análisis, y se dice. Hay sistemas que funcionan, no bloquean nada y cuyo coste de cambio no compensa. Saberlo con datos es más útil que arrancar un proyecto por inercia.',
    },
  ],
}
