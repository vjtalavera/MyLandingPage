import type { EntryContent } from '../../contentTypes.ts'

export const inventarioDependencias: EntryContent = {
  faqTitle: 'Preguntas sobre el inventario',

  sections: [
    {
      type: 'prose',
      id: 'para-que-sirve',
      heading: 'Qué responde un inventario y qué no',
      body: [
        'Un inventario responde tres preguntas: qué hay realmente en el classpath, qué de eso ha dejado de mantenerse, y qué va a romperse al cambiar de versión. No responde cuánto va a costar: eso sale después, cuando se cruza con lo que la aplicación necesita hacer.',
        'La diferencia con leer el fichero de construcción es que ahí solo están las dependencias declaradas. Las que causan problemas suelen ser transitivas, es decir, dependencias de dependencias que nadie eligió y que aparecen en el classpath sin figurar en ninguna parte del proyecto.',
        'Todo lo que sigue son comandos que se ejecutan sobre el proyecto tal y como está, sin modificar nada.',
      ],
    },

    {
      type: 'steps',
      id: 'los-comandos',
      heading: 'Los comandos y qué mirar en cada salida',
      items: [
        {
          title: 'El árbol completo de dependencias',
          body: [
            { code: 'mvn dependency:tree' },
            ' imprime el árbol resuelto, que es lo que de verdad acaba en el classpath. Interesa buscar la misma dependencia apareciendo dos veces con versiones distintas: eso es el origen de la mayoría de los NoSuchMethodError. Añadiendo ',
            { code: '-Dverbose' },
            ' se ven también las que fueron descartadas y por qué.',
          ],
        },
        {
          title: 'Quién trae una dependencia concreta',
          body: [
            'Cuando ya se sabe qué librería molesta, ',
            { code: 'mvn dependency:tree -Dincludes=grupo:artefacto' },
            ' recorta el árbol a las ramas que llevan hasta ella. Es la forma rápida de saber a quién hay que excluir o actualizar.',
          ],
        },
        {
          title: 'Qué versiones hay disponibles',
          body: [
            { code: 'mvn versions:display-dependency-updates' },
            ' lista, para cada dependencia, la versión actual y la última publicada. Lo importante no es el número, sino la fecha: una librería cuya última versión es de hace cinco años es una decisión pendiente, no una dependencia.',
          ],
        },
        {
          title: 'Qué plugins se han quedado atrás',
          body: [
            { code: 'mvn versions:display-plugin-updates' },
            ' hace lo mismo con los plugins de construcción. Suelen ser lo último que alguien actualiza y lo primero que falla al cambiar de JDK, porque muchos dependen de detalles internos del compilador.',
          ],
        },
        {
          title: 'Qué código usa APIs internas del JDK',
          body: [
            { code: 'jdeps --jdk-internals --multi-release 17 target/la-aplicacion.jar' },
            ' analiza el bytecode y señala qué clases dependen de APIs internas. Es el comando que anticipa los InaccessibleObjectException antes de que aparezcan, y funciona igual sobre las dependencias que sobre el código propio.',
          ],
        },
        {
          title: 'Qué hay declarado y no se usa',
          body: [
            { code: 'mvn dependency:analyze' },
            ' distingue entre dependencias declaradas sin usar y usadas sin declarar. Las segundas son las peligrosas: funcionan por casualidad, porque otra dependencia las arrastra, y desaparecen el día que esa otra cambia de versión.',
          ],
        },
      ],
    },

    {
      type: 'table',
      id: 'que-significa-cada-hallazgo',
      heading: 'Qué significa cada hallazgo',
      intro:
        'La salida de los comandos anteriores se traduce en decisiones. Esta es la correspondencia.',
      caption: 'Hallazgo del inventario, riesgo asociado y decisión que implica',
      columns: ['Lo que aparece', 'Qué significa', 'Qué se decide'],
      rows: [
        {
          header: 'La misma librería en dos versiones',
          cells: [
            'El classpath resuelve una de las dos de forma impredecible',
            'Fijar la versión en la gestión de dependencias del proyecto',
          ],
        },
        {
          header: 'Última publicación hace años',
          cells: [
            'No habrá versión compatible con el JDK de destino',
            'Sustituir, o aislar su uso tras una interfaz propia',
          ],
        },
        {
          header: 'Uso de APIs internas del JDK',
          cells: [
            'Fallará en ejecución a partir de Java 16',
            'Actualizar la librería, y solo si no hay otra, abrir el módulo',
          ],
        },
        {
          header: 'Dependencia usada sin declarar',
          cells: [
            'Funciona por arrastre y desaparecerá sin aviso',
            'Declararla de forma explícita antes de tocar nada más',
          ],
        },
        {
          header: 'Plugin de construcción desactualizado',
          cells: [
            'El build fallará antes que la aplicación',
            'Actualizarlo primero, separado del resto del trabajo',
          ],
        },
      ],
      note: [
        'Con esta tabla rellenada ya se puede ordenar el trabajo por riesgo, que es lo que convierte el inventario en el plan por fases del ',
        {
          to: '/servicios/modernizacion-java/',
          text: 'servicio de modernización',
        },
        '.',
      ],
    },

    {
      type: 'checklist',
      id: 'lo-que-no-sale-de-los-comandos',
      heading: 'Lo que ningún comando va a decir',
      intro:
        'El inventario automático cubre el classpath. El resto hay que mirarlo a mano, y suele pesar más en el calendario.',
      items: [
        'Qué versión de Java certifica el servidor de aplicaciones que hay en producción.',
        'Qué configuración vive fuera del repositorio y solo existe en el servidor.',
        'Qué sistemas consumen la aplicación y con qué contrato lo hacen.',
        'Qué partes del código no tienen pruebas que comprueben comportamiento.',
        'Qué reglas de negocio no están documentadas en ningún sitio salvo en el propio código.',
      ],
      outro:
        'Un inventario que solo cubre las dependencias da una falsa sensación de control: es la mitad más fácil del problema.',
    },
  ],

  faq: [
    {
      question: '¿Sirve esto igual con Gradle?',
      answer:
        'El planteamiento es idéntico y los comandos cambian: el árbol se obtiene con la tarea de dependencias del propio Gradle, y jdeps funciona igual porque analiza bytecode, no ficheros de construcción.',
    },
    {
      question: '¿Cuánto se tarda en hacer un inventario?',
      answer:
        'Los comandos son minutos. Interpretar la salida y cruzarla con lo que la aplicación necesita es el trabajo real, y depende del tamaño del árbol de dependencias más que del código propio.',
    },
    {
      question: '¿Hace falta el inventario si la migración parece sencilla?',
      answer:
        'Es justo cuando parece sencilla cuando más conviene: una migración que se estima en dos semanas sin mirar el árbol de dependencias es una estimación sin base. El inventario cuesta poco y es lo que evita la sorpresa a mitad.',
    },
    {
      question: '¿Se puede hacer sin acceso al código?',
      answer:
        'Parcialmente. Con el artefacto empaquetado se puede analizar el bytecode y ver las APIs internas, pero no se obtiene el árbol de dependencias resuelto ni se puede distinguir lo declarado de lo arrastrado.',
    },
  ],
}
