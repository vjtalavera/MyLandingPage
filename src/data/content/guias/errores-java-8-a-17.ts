import type { EntryContent } from '../../contentTypes.ts'

export const erroresJava8A17: EntryContent = {
  faqTitle: 'Preguntas sobre estos errores',

  sections: [
    {
      type: 'prose',
      id: 'en-que-orden-aparecen',
      heading: 'En qué orden aparecen',
      body: [
        'Los errores de un cambio de JDK no llegan todos a la vez, y saber en qué fase aparece cada uno ahorra tiempo de diagnóstico.',
        [
          'Primero salen los de compilación, que son los baratos: el compilador señala la línea y la causa. Después los de arranque, que aparecen cuando el contexto se levanta y ya cuestan más porque la traza apunta al síntoma y no al origen. Y al final los que solo se manifiestan bajo carga o con datos reales, que son los caros. Compilar con el JDK nuevo manteniendo el entorno de ejecución antiguo, como se explica en ',
          {
            to: '/retos/actualizacion-java/',
            text: 'la actualización de versiones de Java',
          },
          ', sirve precisamente para separar los dos primeros grupos.',
        ],
      ],
    },

    {
      type: 'errors',
      id: 'errores-de-compilacion',
      heading: 'Errores de compilación',
      intro:
        'Aparecen en cuanto se cambia el compilador. Son los más fáciles de localizar porque el mensaje señala el fichero y la línea.',
      items: [
        {
          signature: 'package javax.xml.bind does not exist',
          cause:
            'JAXB salió del JDK en Java 11. Las clases ya no están en el classpath de compilación salvo que alguna dependencia las arrastre.',
          fix: [
            'Declarar ',
            { code: 'jakarta.xml.bind-api' },
            ' junto con una implementación. Si el proyecto aún no puede cambiar el espacio de nombres, existen las versiones 2.3.x que mantienen ',
            { code: 'javax.xml.bind' },
            ' como dependencia externa.',
          ],
        },
        {
          signature: 'package javax.annotation does not exist',
          cause: [
            'Las anotaciones comunes, entre ellas ',
            { code: '@PostConstruct' },
            ' y ',
            { code: '@PreDestroy' },
            ', salieron del JDK con el mismo movimiento.',
          ],
          fix: [
            'Añadir ',
            { code: 'jakarta.annotation-api' },
            ' como dependencia explícita. Es de las que más se olvidan porque solo afecta a unas pocas clases del proyecto.',
          ],
        },
        {
          signature: 'error: source option 8 is no longer supported',
          cause:
            'Los JDK recientes han retirado el soporte para compilar hacia versiones muy antiguas.',
          fix: [
            'Subir el destino y, de paso, cambiar ',
            { code: 'maven.compiler.source' },
            ' y ',
            { code: 'maven.compiler.target' },
            ' por ',
            { code: 'maven.compiler.release' },
            ', que además comprueba que las APIs utilizadas existan en la versión de destino.',
          ],
        },
        {
          signature: 'cannot find symbol: class Unsafe',
          cause: [
            { code: 'sun.misc.Unsafe' },
            ' y el resto de clases internas del JDK dejaron de ser accesibles desde código externo.',
          ],
          fix: 'Rara vez está en el código propio: casi siempre viene de una librería antigua de serialización, de caché o de instrumentación. Lo que se actualiza es la librería, no el código.',
        },
      ],
    },

    {
      type: 'errors',
      id: 'errores-de-arranque',
      heading: 'Errores al arrancar la aplicación',
      intro:
        'El proyecto compila y falla al levantar el contexto. Aquí la traza suele apuntar al síntoma, no a la causa.',
      items: [
        {
          signature: 'NoClassDefFoundError: javax/xml/bind/JAXBContext',
          cause:
            'La API está en el classpath de compilación, arrastrada por alguna dependencia, pero no hay implementación en ejecución.',
          fix: 'Declarar la implementación además de la API. Es el caso que mejor ilustra por qué compilar no demuestra nada sobre la ejecución.',
        },
        {
          signature: 'InaccessibleObjectException: module java.base does not opens java.lang',
          cause: [
            'Una librería llama a ',
            { code: 'setAccessible()' },
            ' sobre clases del JDK. Hasta Java 15 era un aviso; desde Java 16 la encapsulación es estricta y es un error.',
          ],
          fix: [
            'Actualizar la librería a una versión que no lo necesite. Abrir el módulo con ',
            { code: '--add-opens java.base/java.lang=ALL-UNNAMED' },
            ' funciona como medida temporal, pero deja el arranque dependiendo de una bandera que se pierde en el siguiente cambio de despliegue.',
          ],
        },
        {
          signature: 'UnsupportedClassVersionError: class file version 61.0',
          cause:
            'Un artefacto compilado con Java 17 se está ejecutando sobre un JRE anterior. Suele indicar que el entorno de construcción y el de producción no van sincronizados.',
          fix: [
            'Comparar la versión del compilador con la del entorno de ejecución. La correspondencia es directa: 52 es Java 8, 55 es Java 11, 61 es Java 17 y 65 es Java 21. Fijar ',
            { code: 'maven.compiler.release' },
            ' evita generar bytecode más moderno que el destino real.',
          ],
        },
        {
          signature: 'NoSuchMethodError en una clase que no se ha tocado',
          cause:
            'Hay dos versiones de la misma dependencia en el classpath. Al subir de JDK cambian las versiones de medio árbol y una transitiva gana donde antes perdía.',
          fix: [
            'Mirar el árbol real con ',
            { code: 'mvn dependency:tree' },
            ' y fijar la versión en la gestión de dependencias del proyecto. El procedimiento completo está en ',
            {
              to: '/guias/inventario-de-dependencias-antes-de-migrar/',
              text: 'la guía del inventario de dependencias',
            },
            '.',
          ],
        },
        {
          signature: 'ClassNotFoundException: javax.servlet.http.HttpServlet',
          cause:
            'El contenedor ya solo expone el espacio de nombres jakarta y el artefacto sigue pidiendo el antiguo.',
          fix: [
            'No es un problema del JDK sino del servidor: es el cambio de Jakarta EE, que se explica en ',
            {
              to: '/retos/migracion-java-ee-jakarta-ee/',
              text: 'la migración de Java EE a Jakarta EE',
            },
            '.',
          ],
        },
      ],
    },

    {
      type: 'errors',
      id: 'errores-que-tardan-en-aparecer',
      heading: 'Los que no se ven hasta que hay carga o datos reales',
      intro:
        'Estos son los que hacen que una migración parezca terminada cuando no lo está.',
      items: [
        {
          signature: 'Cambios de orden en colecciones y en resultados',
          cause:
            'Varias implementaciones internas cambiaron entre versiones. El código que dependía sin saberlo de un orden concreto empieza a comportarse distinto.',
          fix: 'Ordenar de forma explícita donde el orden importe. Si una prueba falla de forma intermitente tras la migración, este suele ser el motivo.',
        },
        {
          signature: 'Diferencias de formato en fechas y números',
          cause:
            'El proveedor de datos regionales por defecto cambió a partir de Java 9, y algunos formatos y separadores no coinciden con los de Java 8.',
          fix: [
            'Fijar el formato de forma explícita donde el texto se envíe a otro sistema o se guarde. Arrancar con ',
            { code: '-Djava.locale.providers=COMPAT' },
            ' devuelve el comportamiento anterior, pero es una medida de transición, no una solución.',
          ],
        },
        {
          signature: 'Consumo de memoria o latencia distintos sin cambios de código',
          cause:
            'El recolector de basura por defecto y su configuración cambiaron entre versiones, y las banderas antiguas pueden ignorarse en silencio.',
          fix: 'Revisar las opciones de arranque una por una y comprobar cuáles siguen reconocidas. Medir antes y después con carga comparable, no en un entorno de pruebas vacío.',
        },
      ],
    },

    {
      type: 'checklist',
      id: 'como-abordarlos',
      heading: 'Cómo abordarlos sin acumular riesgo',
      items: [
        'Compilar con el JDK nuevo antes de cambiar el entorno de ejecución, para separar los dos tipos de fallo.',
        'Resolver primero las dependencias que bloquean al resto, y solo después el resto.',
        'Una tanda de actualizaciones por commit, con las pruebas pasando en cada punto.',
        'Anotar cada bandera de arranque que se añada, y por qué, para poder retirarla después.',
        'Comparar el comportamiento antes y después en los flujos críticos, no solo que arranque.',
      ],
      outro: [
        'Si la aplicación no tiene pruebas suficientes para hacer esa comparación, construirlas es la primera fase y no un extra: es lo que se explica en ',
        {
          to: '/retos/migracion-java-legacy/',
          text: 'qué implica modernizar una aplicación legacy',
        },
        '.',
      ],
    },
  ],

  faq: [
    {
      question: '¿Conviene pasar por Java 11 o ir directo a 17?',
      answer:
        'El trabajo duro es salir de Java 8, así que parar en 11 rara vez ahorra esfuerzo. Lo que decide es el servidor de aplicaciones: si solo certifica hasta Java 11, el destino es Java 11 aunque el código aguantara más.',
    },
    {
      question: '¿Por qué compila y luego falla al arrancar?',
      answer:
        'Porque la compilación solo comprueba que las clases existan en el classpath de compilación. Varias APIs que salieron del JDK siguen presentes ahí, arrastradas por alguna dependencia, y no están en ejecución.',
    },
    {
      question: '¿Es seguro usar --add-opens para salir del paso?',
      answer:
        'Funciona, y a veces es la única opción a corto plazo. El problema es que el arranque queda atado a una bandera que nadie recuerda meses después, y que la librería que la necesita sigue sin actualizarse. Conviene anotarla como deuda con fecha de revisión.',
    },
    {
      question: '¿Cuántos de estos errores salen en un proyecto típico?',
      answer:
        'Depende por completo del árbol de dependencias, no del tamaño del código propio. Un proyecto pequeño con librerías sin mantenimiento da más trabajo que uno grande con dependencias actualizadas.',
    },
  ],
}
