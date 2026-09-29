import type { EntryContent } from '../../contentTypes.ts'

export const javaxAJakartaOpenrewrite: EntryContent = {
  faqTitle: 'Preguntas sobre la migración automática',

  sections: [
    {
      type: 'prose',
      id: 'por-que-no-basta-buscar-y-reemplazar',
      heading: 'Por qué no vale un buscar y reemplazar',
      intro:
        'Es lo primero que se intenta, y es lo que provoca los fallos más difíciles de localizar después.',
      body: [
        [
          'No todos los paquetes que empiezan por ',
          { code: 'javax' },
          ' pertenecen a Jakarta EE. ',
          { code: 'javax.sql' },
          ', ',
          { code: 'javax.naming' },
          ', ',
          { code: 'javax.crypto' },
          ' y ',
          { code: 'javax.net' },
          ' siguen en el JDK y no cambian de nombre. Un reemplazo global los rompe y el error aparece lejos del sitio donde se hizo el cambio.',
        ],
        'Además el renombrado no ocurre solo en las importaciones: aparece en cadenas de texto de configuración, en descriptores XML, en nombres de propiedades y en ficheros de servicios. Un reemplazo sobre todo el proyecto toca cosas que no debía y deja sin tocar cosas que sí.',
        'Las herramientas específicas acotan el cambio a los paquetes que de verdad cambiaron de dueño, y ese es todo su valor: no es que sean más rápidas, es que saben dónde parar.',
      ],
    },

    {
      type: 'steps',
      id: 'como-se-ejecuta',
      heading: 'Cómo se ejecuta la receta',
      items: [
        {
          title: 'Partir de un árbol limpio',
          body: 'La receta reescribe ficheros en sitio. Se ejecuta sobre un repositorio sin cambios pendientes, de forma que todo lo que aparezca después sea obra suya y se pueda revisar de un vistazo.',
        },
        {
          title: 'Ejecutar primero en modo de solo lectura',
          body: [
            'El objetivo ',
            { code: 'rewrite:dryRun' },
            ' genera un parche con lo que haría, sin modificar nada. Es la forma de ver el alcance real antes de aceptarlo, y sirve para estimar.',
          ],
        },
        {
          title: 'Aplicar la receta de migración',
          body: [
            { code: 'rewrite:run' },
            ' con la receta de migración a Jakarta EE aplica el renombrado sobre el código, y también sobre los ficheros de propiedades y los descriptores que reconoce.',
          ],
        },
        {
          title: 'Revisar el cambio como se revisa cualquier otro',
          body: 'El resultado es un diff, no una caja negra. Conviene leerlo: es donde se detectan los ficheros que la receta ha tocado de más y los que no ha sabido interpretar.',
        },
        {
          title: 'Compilar y ejecutar las pruebas',
          body: 'Que la receta termine sin errores no significa que el proyecto compile. Las dependencias de terceros siguen siendo responsabilidad de quien migra, y ahí es donde aparece el trabajo real.',
        },
      ],
    },

    {
      type: 'table',
      id: 'que-cubre-y-que-no',
      heading: 'Qué cubre la receta y qué queda a mano',
      intro:
        'Esta es la parte útil de la guía: saber de antemano qué va a seguir roto cuando la herramienta termine.',
      caption: 'Alcance de la migración automática por tipo de fichero',
      columns: ['Qué', 'Lo cubre', 'Qué queda pendiente'],
      rows: [
        {
          header: 'Importaciones del código propio',
          cells: ['Sí', 'Nada, es el caso para el que está hecha'],
        },
        {
          header: 'Versiones de las dependencias',
          cells: [
            'En parte',
            'Las librerías sin variante jakarta hay que sustituirlas a mano',
          ],
        },
        {
          header: 'Descriptores XML',
          cells: [
            'En parte',
            'Conviene comprobar versión y espacio de nombres uno por uno',
          ],
        },
        {
          header: 'Cadenas de texto en configuración',
          cells: [
            'Solo las que reconoce',
            'Nombres de clase construidos por concatenación o leídos de un fichero',
          ],
        },
        {
          header: 'Clases cargadas por reflexión',
          cells: ['No', 'Hay que localizarlas y cambiarlas a mano'],
        },
        {
          header: 'Artefactos de terceros ya compilados',
          cells: [
            'No',
            'O se actualizan, o se transforma el artefacto, o se aíslan tras una interfaz propia',
          ],
        },
      ],
      note: [
        'La última fila es la que decide el calendario de la migración, y es lo que se mide en ',
        {
          to: '/guias/inventario-de-dependencias-antes-de-migrar/',
          text: 'el inventario de dependencias',
        },
        ' antes de empezar.',
      ],
    },

    {
      type: 'checklist',
      id: 'como-se-comprueba',
      heading: 'Cómo se comprueba que está completa',
      intro:
        'Que compile no basta: los casos que quedan fuera del alcance de la receta compilan igual y fallan en ejecución.',
      items: [
        'Buscar en todo el proyecto referencias a los paquetes que sí cambiaron, incluidas las que estén dentro de cadenas de texto.',
        'Revisar los descriptores XML uno a uno: versión y espacio de nombres tienen que cambiar juntos.',
        'Comprobar que no conviven en el classpath la variante antigua y la nueva de una misma librería.',
        'Arrancar la aplicación completa, no solo ejecutar las pruebas unitarias.',
        'Ejercitar los flujos que cargan clases por nombre, que es donde la receta no llega.',
      ],
      outro: [
        'El contexto completo de este cambio, con las versiones de Jakarta EE y qué servidor soporta cada una, está en ',
        {
          to: '/retos/migracion-java-ee-jakarta-ee/',
          text: 'la página sobre la migración a Jakarta EE',
        },
        '.',
      ],
    },
  ],

  faq: [
    {
      question: '¿La receta puede dejar el proyecto sin compilar?',
      answer:
        'Sí, y es lo esperable si hay dependencias sin variante jakarta. La receta cambia el código propio; las librerías de terceros siguen pidiendo el espacio de nombres antiguo hasta que se actualizan.',
    },
    {
      question: '¿Se puede aplicar módulo a módulo?',
      answer:
        'Se puede ejecutar por módulos, pero el artefacto que se despliega tiene que quedar entero en un mismo espacio de nombres. No existe un estado intermedio que funcione en el contenedor.',
    },
    {
      question: '¿Y si una librería crítica no tiene versión jakarta?',
      answer:
        'Hay tres salidas: sustituirla, transformar el artefacto compilado con una herramienta de conversión, o aislar su uso tras una interfaz propia y posponer la decisión. Cuál conviene depende de cuánto código dependa de ella.',
    },
    {
      question: '¿Sirve esto también para el salto de Spring Boot 2 a 3?',
      answer:
        'El renombrado es el mismo y la receta ayuda igual, pero el salto de Spring Boot arrastra además propiedades renombradas y cambios en la configuración de seguridad que no son parte de Jakarta EE.',
    },
  ],
}
