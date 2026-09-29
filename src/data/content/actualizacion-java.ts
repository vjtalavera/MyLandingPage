import type { EntryContent } from '../contentTypes.ts'

export const actualizacionJava: EntryContent = {
  faqTitle: 'Dudas frecuentes al subir de versión de Java',

  sections: [
    {
      type: 'prose',
      id: 'que-cambia-al-salir-de-java-8',
      heading: 'Qué cambia de verdad al salir de Java 8',
      intro:
        'Cambiar el JDK es la parte rápida. Lo que consume el tiempo son las tres cosas que arrastra.',
      body: [
        [
          'La primera es el sistema de módulos, que entró en Java 9. No obliga a modularizar la aplicación, pero sí cierra el acceso por reflexión a las tripas del JDK. A partir de Java 16 esa encapsulación es estricta, y en Java 17 desapareció la opción ',
          { code: '--illegal-access=permit' },
          ' que permitía convivir con el problema. Cualquier librería que manipulara clases internas deja de funcionar: hay que subirla de versión o sustituirla.',
        ],
        [
          'La segunda es la retirada de APIs que antes venían incluidas. JAXB, JAX-WS y compañía salieron del JDK en Java 11. El código compila igual y revienta en ejecución, porque esas clases simplemente ya no están. Son dependencias que pasan a declararse de forma explícita en el ',
          { code: 'pom.xml' },
          '.',
        ],
        'La tercera es el servidor de aplicaciones, que suele ser el que marca el techo real. De poco sirve que el código esté listo para Java 17 si la versión de JBoss EAP que hay en producción solo certifica Java 8. Eso convierte la actualización en dos proyectos, y conviene saberlo antes de comprometer una fecha, no a mitad.',
      ],
    },

    {
      type: 'table',
      id: 'apis-retiradas-del-jdk',
      heading: 'Qué se retiró del JDK y por qué dependencia se sustituye',
      intro:
        'Estas son las ausencias que más aparecen al pasar de Java 8 a una versión con soporte. Todas se resuelven declarando la dependencia a mano.',
      caption: 'APIs eliminadas del JDK, última versión que las incluía y sustituto',
      columns: ['API', 'Paquete', 'Última versión del JDK', 'Sustituto'],
      rows: [
        {
          header: 'JAXB',
          cells: ['javax.xml.bind', 'Java 10', 'jakarta.xml.bind-api y una implementación'],
        },
        {
          header: 'JAX-WS',
          cells: ['javax.xml.ws', 'Java 10', 'jakarta.xml.ws-api y una implementación'],
        },
        {
          header: 'Activation',
          cells: ['javax.activation', 'Java 10', 'jakarta.activation-api'],
        },
        {
          header: 'Common Annotations',
          cells: ['javax.annotation', 'Java 10', 'jakarta.annotation-api'],
        },
        {
          header: 'CORBA',
          cells: ['javax.rmi.CORBA', 'Java 10', 'sin sustituto dentro del JDK'],
        },
        {
          header: 'Nashorn',
          cells: ['jdk.nashorn', 'Java 14', 'motor externo o GraalVM'],
        },
      ],
      note: [
        'Todas salieron con el mismo movimiento: sacar del JDK lo que pertenecía a Java EE. Es el mismo cambio de fondo que la ',
        {
          to: '/retos/migracion-java-ee-jakarta-ee/',
          text: 'migración de Java EE a Jakarta EE',
        },
        ', y por eso los sustitutos ya llevan el prefijo jakarta.',
      ],
    },

    {
      type: 'errors',
      id: 'errores-del-primer-dia',
      heading: 'Los errores que aparecen el primer día del cambio de JDK',
      intro:
        'Ninguno es un problema del código propio: son síntomas de que algo del entorno se quedó en la versión anterior.',
      items: [
        {
          signature: 'NoClassDefFoundError: javax/xml/bind/JAXBContext',
          cause:
            'JAXB salió del JDK en Java 11. El proyecto compila si alguna dependencia arrastra la API, pero en ejecución no hay implementación que cargar.',
          fix: [
            'Declarar de forma explícita ',
            { code: 'jakarta.xml.bind-api' },
            ' y una implementación, y comprobar que no conviven a la vez la variante javax y la jakarta en el classpath.',
          ],
        },
        {
          signature: 'InaccessibleObjectException: module java.base does not opens java.lang',
          cause: [
            'Una librería llama a ',
            { code: 'setAccessible()' },
            ' sobre clases internas del JDK. Hasta Java 15 eso salía como aviso; desde Java 16 es un error.',
          ],
          fix: [
            'Subir la librería a una versión que no dependa de ello. Abrir el módulo con ',
            { code: '--add-opens' },
            ' funciona, pero es una tirita: deja el arranque atado a una bandera que nadie recuerda seis meses después.',
          ],
        },
        {
          signature: 'UnsupportedClassVersionError: class file version 61.0',
          cause:
            'Un artefacto se compiló con un JDK más moderno que el que lo ejecuta. Aparece casi siempre cuando el entorno de construcción y el de producción no van sincronizados.',
          fix: [
            'Fijar la versión con ',
            { code: 'maven.compiler.release' },
            ' en lugar de source y target, que no comprueban que las APIs utilizadas existan en la versión de destino.',
          ],
        },
        {
          signature: 'NoSuchMethodError en una librería que no se ha tocado',
          cause:
            'Hay dos versiones de la misma dependencia en el classpath. Al subir de JDK cambian las versiones de medio árbol y una transitiva gana donde antes perdía.',
          fix: [
            'Mirar el árbol real con ',
            { code: 'mvn dependency:tree' },
            ' y fijar la versión en la gestión de dependencias del proyecto, no en cada módulo por separado.',
          ],
        },
      ],
    },

    {
      type: 'table',
      id: 'versiones-de-bytecode',
      heading: 'A qué versión de bytecode corresponde cada versión de Java',
      intro:
        'Sirve para leer de un vistazo un UnsupportedClassVersionError y saber qué JDK compiló el artefacto que falla.',
      caption: 'Versión de Java y número de versión del fichero class',
      columns: ['Versión de Java', 'Versión de class', 'Estado'],
      rows: [
        {
          header: 'Java 8',
          cells: ['52.0', 'sin actualizaciones públicas gratuitas'],
        },
        { header: 'Java 11', cells: ['55.0', 'LTS'] },
        { header: 'Java 17', cells: ['61.0', 'LTS'] },
        { header: 'Java 21', cells: ['65.0', 'LTS'] },
      ],
      note: 'Las versiones intermedias suben de una en una: Java 12 es 56.0, Java 13 es 57.0 y así sucesivamente.',
    },

    {
      type: 'steps',
      id: 'en-que-orden-se-hace',
      heading: 'En qué orden se aborda una actualización de versión',
      items: [
        {
          title: 'Fijar el techo antes que el objetivo',
          body: 'La versión de destino no la elige el gusto: la eligen el servidor de aplicaciones y las dependencias que no se pueden sustituir. Se mira eso primero, porque puede convertir el salto a Java 21 en un salto a Java 11.',
        },
        {
          title: 'Construir la red de pruebas',
          body: 'Si no hay pruebas que demuestren que el comportamiento actual se mantiene, se escriben antes de tocar el JDK. Sin esa red no hay forma de distinguir un cambio correcto de uno que rompe algo que nadie estaba mirando.',
        },
        {
          title: 'Compilar con el JDK nuevo, ejecutar con el viejo',
          body: 'Se sube el compilador y se deja el entorno de ejecución donde está. Aísla los problemas de compilación de los de ejecución, que son los caros, y permite avanzar por tandas sin bloquear los despliegues.',
        },
        {
          title: 'Subir las dependencias por tandas',
          body: 'Primero las que bloquean, después el resto. Una tanda por commit, con las pruebas pasando en cada punto. Una actualización masiva en un único commit es imposible de revertir cuando falla en producción.',
        },
        {
          title: 'Cambiar el entorno de ejecución',
          body: 'Ya en la versión nueva se revisan las banderas de arranque, el recolector de basura y el comportamiento en memoria. Es donde aparecen las sorpresas que no se ven en un entorno de pruebas vacío.',
        },
      ],
    },

    {
      type: 'checklist',
      id: 'inventario-previo',
      heading: 'El inventario que se hace antes de tocar nada',
      items: [
        'Versión exacta de Java en construcción y en ejecución, que no siempre coinciden.',
        'Servidor de aplicaciones y versión certificada por el fabricante.',
        'Dependencias directas y transitivas, con la fecha de su última versión publicada.',
        'Uso de APIs retiradas del JDK y de clases internas por reflexión.',
        'Plugins de Maven o Gradle, que suelen ser lo último en actualizarse y lo primero en romperse.',
        'Cobertura real de pruebas sobre los flujos críticos de negocio.',
        'Integraciones que consumen la aplicación, y con qué contrato lo hacen.',
      ],
      outro: [
        'De ahí sale una matriz de riesgos ordenada por impacto y un plan por fases. Es la misma base con la que se aborda una ',
        {
          to: '/servicios/modernizacion-java/',
          text: 'modernización completa de la aplicación',
        },
        ', solo que acotada al cambio de versión.',
      ],
    },
  ],

  faq: [
    {
      question: '¿Se puede pasar de Java 8 a Java 21 directamente?',
      answer:
        'Técnicamente sí, y a veces es lo más eficiente, porque el trabajo duro es salir de Java 8 y no ir de 17 a 21. Lo que decide es el servidor de aplicaciones y las dependencias: si una pieza crítica solo certifica hasta Java 11, el destino es Java 11 aunque el código aguantara más.',
    },
    {
      question: '¿Hay que cambiar de servidor de aplicaciones para subir de versión de Java?',
      answer:
        'Depende de la combinación concreta. Las versiones recientes de WildFly y Tomcat soportan las LTS actuales; las versiones antiguas de JBoss EAP no. Forma parte de la matriz de compatibilidad que sale del análisis inicial, y conviene resolverlo antes de comprometer un calendario.',
    },
    {
      question: '¿Cuánto tarda una actualización de versión de Java?',
      answer:
        'Depende del inventario, y por eso el inventario va primero. Lo que marca el ritmo no son las líneas de código propias, sino cuántas dependencias de terceros hay que sustituir porque ya no publican versiones compatibles. Cualquier cifra dada antes de mirar el árbol de dependencias es un número inventado.',
    },
    {
      question: '¿Por qué compila bien y falla al arrancar?',
      answer:
        'Porque la compilación solo comprueba que las clases existan en el classpath de compilación. Las APIs que salieron del JDK en Java 11 suelen seguir presentes ahí, arrastradas por alguna dependencia, y no estar en ejecución. Compilar con maven.compiler.release en lugar de source y target evita buena parte de estos casos.',
    },
    {
      question: '¿Vale la pena si la aplicación funciona?',
      answer:
        'El argumento no suele ser el rendimiento, sino que Java 8 ya no recibe actualizaciones públicas gratuitas y que las librerías que necesitáis han dejado de publicar versiones compatibles. Llega un punto en que cada dependencia nueva se convierte en una negociación, y ese es el coste real de quedarse.',
    },
    {
      question: '¿Se puede hacer sin parar el desarrollo de nuevas funcionalidades?',
      answer:
        'Sí, si se hace por fases desplegables en lugar de en una rama larga. Compilar con el JDK nuevo manteniendo el entorno de ejecución antiguo permite avanzar sin bloquear las entregas. Una rama de migración abierta durante seis meses acaba siendo imposible de fusionar.',
    },
  ],
}
