import type { EntryContent } from '../contentTypes.ts'

export const migracionJavaLegacy: EntryContent = {
  faqTitle: 'Dudas frecuentes sobre modernizar una aplicación legacy',

  sections: [
    {
      type: 'prose',
      id: 'que-hace-legacy-a-una-aplicacion',
      heading: 'Qué convierte a una aplicación en legacy',
      intro:
        'No es la edad. Hay sistemas de quince años que se tocan sin miedo y aplicaciones de tres que ya nadie quiere abrir.',
      body: [
        'Lo que define a una aplicación legacy es la distancia entre hacer un cambio y saber si ese cambio está bien. Cuando esa distancia es grande, cada modificación se convierte en una apuesta y el equipo empieza a evitar zonas del código. A partir de ahí la degradación es rápida, porque lo que no se toca tampoco se entiende.',
        'Eso tiene consecuencias que se notan fuera del equipo técnico: las estimaciones se inflan por precaución, los despliegues se agrupan en ventanas de fin de semana y las funcionalidades nuevas tardan cada vez más aunque el negocio no haya cambiado.',
        'La buena noticia es que el problema casi nunca está repartido por igual. En la mayoría de sistemas hay un núcleo pequeño que concentra el riesgo, y acotarlo es la diferencia entre una modernización dirigida y una reescritura completa.',
      ],
    },

    {
      type: 'table',
      id: 'sintomas-y-causas',
      heading: 'Del síntoma que se nota a la causa que hay que mirar',
      intro:
        'Los síntomas que llegan a negocio y lo que suele haber detrás en el código.',
      caption: 'Síntomas habituales, causa probable y qué se analiza',
      columns: ['Síntoma', 'Causa habitual', 'Qué se analiza'],
      rows: [
        {
          header: 'Cada despliegue necesita ventana y plan de vuelta atrás',
          cells: [
            'Ausencia de pruebas automáticas y despliegue manual',
            'Cobertura real sobre flujos críticos y pasos del despliegue',
          ],
        },
        {
          header: 'Nadie sabe qué hace un módulo',
          cells: [
            'Rotación de equipo y documentación inexistente',
            'Puntos de entrada, dependencias internas y uso real en producción',
          ],
        },
        {
          header: 'No se puede subir una librería',
          cells: [
            'Versión de Java antigua y dependencias sin mantenimiento',
            'Árbol de dependencias y fecha de última publicación de cada una',
          ],
        },
        {
          header: 'La aplicación va lenta según crecen los datos',
          cells: [
            'Consultas N+1 y mapeos de persistencia heredados',
            'SQL generado en los flujos más usados y modelo de entidades',
          ],
        },
        {
          header: 'Un cambio pequeño rompe algo lejano',
          cells: [
            'Acoplamiento a través de la base de datos o de estado compartido',
            'Fronteras reales entre módulos frente a las declaradas',
          ],
        },
      ],
    },

    {
      type: 'checklist',
      id: 'que-incluye-el-inventario',
      heading: 'Qué recoge el inventario inicial',
      intro:
        'Es un trabajo acotado y su resultado es un documento. Sin esto, cualquier estimación es una apuesta.',
      items: [
        'Versión de Java, framework, servidor de aplicaciones y sistema de construcción.',
        'Dependencias directas y transitivas, con su estado de mantenimiento.',
        'Cobertura de pruebas real, separando las que prueban comportamiento de las que solo ejecutan código.',
        'Puntos de integración: quién consume la aplicación y a quién consume ella.',
        'Zonas de código con más cambios recientes, que son las que de verdad duelen.',
        'Modelo de persistencia y consultas de los flujos más usados.',
        'Pasos manuales del despliegue y configuración que vive fuera del repositorio.',
      ],
      outro: [
        'De ahí sale una matriz de riesgos ordenada por impacto y un plan por fases. Es el punto de partida del ',
        {
          to: '/servicios/modernizacion-java/',
          text: 'servicio de modernización de aplicaciones Java',
        },
        ', y el documento es del cliente aunque después no se siga trabajando juntos.',
      ],
    },

    {
      type: 'steps',
      id: 'por-donde-se-empieza',
      heading: 'Por dónde se empieza cuando casi no hay pruebas',
      items: [
        {
          title: 'Fijar el comportamiento actual',
          body: 'Se escriben pruebas que demuestren qué hace hoy la aplicación, aunque sean feas y de grano grueso sobre los flujos críticos. No prueban que el comportamiento sea correcto: prueban que no cambia. Esa distinción es la que hace que sirvan.',
        },
        {
          title: 'Aislar el núcleo que concentra el riesgo',
          body: 'El historial del repositorio dice qué ficheros se tocan una y otra vez. Ahí está el trabajo que rinde, no en el módulo que lleva cinco años sin cambios y funciona.',
        },
        {
          title: 'Levantar fronteras antes de mover nada',
          body: 'Poner una interfaz propia delante de lo que se va a sustituir permite cambiar la implementación sin tocar a quien la usa. Es lo que convierte una sustitución arriesgada en un cambio reversible.',
        },
        {
          title: 'Sustituir por partes, con la aplicación en producción',
          body: 'Cada pieza nueva convive con la antigua hasta que se demuestra que hace lo mismo. Es más lento sobre el papel y mucho más rápido en la práctica, porque no acumula riesgo.',
        },
        {
          title: 'Retirar el código muerto',
          body: 'Una vez sustituido, se borra. Dejar la implementación antigua por si acaso devuelve la aplicación al punto de partida, con dos caminos y ninguna certeza sobre cuál se usa.',
        },
      ],
    },

    {
      type: 'prose',
      id: 'por-que-no-reescribir',
      heading: 'Por qué reescribir desde cero casi nunca es la respuesta',
      body: [
        'Una reescritura completa parte de una premisa optimista: que se conoce todo lo que hace el sistema actual. En una aplicación legacy esa premisa es falsa por definición, porque si se conociera no sería legacy. Lo que se acaba reescribiendo es lo que alguien recuerda, y las reglas de negocio olvidadas aparecen meses después, en producción.',
        'Además hay un coste que no suele aparecer en la estimación: durante la reescritura hay dos sistemas que mantener. El viejo sigue recibiendo correcciones, y cada una hay que replicarla en el nuevo o aceptar que ya no son equivalentes.',
        [
          'Eso no significa que reescribir sea siempre un error. A veces es la opción correcta, y entonces conviene decirlo con los motivos delante. Pero no es el punto de partida: el punto de partida es entender el sistema, y eso pasa por el inventario y por una ',
          {
            to: '/retos/actualizacion-java/',
            text: 'actualización de la versión de Java',
          },
          ' que suele desbloquear buena parte del resto.',
        ],
      ],
    },
  ],

  faq: [
    {
      question: '¿Por dónde se empieza si la aplicación casi no tiene pruebas?',
      answer:
        'Por construir las que demuestren que el comportamiento actual se mantiene, aunque sean pruebas de caracterización feas sobre los flujos críticos. Sin esa red no hay forma de distinguir un cambio correcto de uno que rompe algo que nadie estaba mirando.',
    },
    {
      question: '¿Se puede modernizar sin parar la aplicación?',
      answer:
        'Es el planteamiento por defecto. Cada fase deja el sistema funcionando y desplegado, y las piezas nuevas conviven con las antiguas hasta que se demuestra que hacen lo mismo. Una modernización que exige parar es una reescritura con otro nombre.',
    },
    {
      question: '¿Cuánto cuesta saber en qué estado está la aplicación?',
      answer:
        'El análisis es un trabajo con alcance cerrado y precio cerrado, independiente de lo que venga después. Su resultado es un documento con el inventario, los riesgos ordenados por impacto y un plan por fases con el esfuerzo estimado de cada una.',
    },
    {
      question: '¿Y si el equipo que la construyó ya no está?',
      answer:
        'Es el caso más habitual y no impide el análisis. La información sale del código, del historial del repositorio y de lo que se observa en producción. Que nadie recuerde por qué se tomó una decisión no impide ver qué hace hoy el sistema.',
    },
    {
      question: '¿Hace falta cambiar de arquitectura?',
      answer:
        'Casi nunca al principio. Lo que suele hacer falta es poder desplegar con confianza, y eso depende de las pruebas y de las fronteras internas, no del estilo arquitectónico. Cambiar de arquitectura sin resolver eso antes traslada el problema en lugar de arreglarlo.',
    },
    {
      question: '¿Cuánto dura una modernización de este tipo?',
      answer:
        'Depende del inventario, y por eso el inventario va primero: para responder con datos en vez de con una cifra al aire. Cualquiera que dé un número antes de mirar el código y las dependencias se lo está inventando.',
    },
  ],
}
