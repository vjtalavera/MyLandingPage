import type { EntryContent } from '../contentTypes.ts'

export const migracionJavaEeJakartaEe: EntryContent = {
  faqTitle: 'Dudas frecuentes sobre el cambio a Jakarta EE',

  sections: [
    {
      type: 'prose',
      id: 'por-que-cambio-el-espacio-de-nombres',
      heading: 'Por qué cambió el espacio de nombres y qué implica',
      intro:
        'El cambio de javax a jakarta no fue una mejora técnica: fue una consecuencia legal, y por eso es tan radical.',
      body: [
        [
          'Cuando la gestión de Java EE pasó a la Eclipse Foundation, la marca Java se quedó donde estaba. La primera entrega, Jakarta EE 8, era idéntica a Java EE 8 y mantenía ',
          { code: 'javax.*' },
          '. Jakarta EE 9 hizo el corte: renombró todos los paquetes a ',
          { code: 'jakarta.*' },
          ' sin añadir una sola funcionalidad nueva. Es una versión que existe solo para que el ecosistema pueda cruzar el puente.',
        ],
        'Eso tiene una consecuencia práctica incómoda: no hay compatibilidad hacia atrás y no hay término medio. Una aplicación no puede estar medio migrada, porque el contenedor carga un espacio de nombres o el otro. Las dos variantes de la misma librería en el classpath no se complementan, se estorban.',
        [
          'En el código propio el cambio es mecánico y lo resuelve una herramienta. Lo que marca el calendario son las dependencias de terceros que aún no publican una variante jakarta, y los descriptores XML, que también cambian de espacio de nombres y suelen olvidarse hasta que el despliegue falla. Casi siempre viene acompañado de una ',
          { to: '/retos/actualizacion-java/', text: 'subida de versión de Java' },
          ', porque los servidores que soportan Jakarta EE ya no certifican Java 8.',
        ],
      ],
    },

    {
      type: 'table',
      id: 'versiones-de-jakarta-ee',
      heading: 'Qué versión de Jakarta EE corresponde a cada servidor',
      intro:
        'La versión de destino no se elige por preferencia: la fija el servidor que se pueda desplegar en producción.',
      caption: 'Versiones de Jakarta EE, espacio de nombres y requisitos',
      columns: ['Versión', 'Espacio de nombres', 'Java mínimo', 'Servidores habituales'],
      rows: [
        {
          header: 'Java EE 8 / Jakarta EE 8',
          cells: ['javax', 'Java 8', 'WildFly 18-26, Tomcat 9, Payara 5, JBoss EAP 7.x'],
        },
        {
          header: 'Jakarta EE 9 y 9.1',
          cells: ['jakarta', 'Java 8 (9) y Java 11 (9.1)', 'Tomcat 10.0, WildFly con perfil preview'],
        },
        {
          header: 'Jakarta EE 10',
          cells: ['jakarta', 'Java 11', 'WildFly 27 y posteriores, Tomcat 10.1, Payara 6, JBoss EAP 8'],
        },
        {
          header: 'Jakarta EE 11',
          cells: ['jakarta', 'Java 17', 'Tomcat 11 y versiones recientes de WildFly y Payara'],
        },
      ],
      note: 'Cada fabricante publica su propia matriz de certificación y la revisa en cada versión menor. Esta tabla sirve para acotar el terreno; la decisión final se toma contra la matriz oficial del servidor concreto que esté en producción.',
    },

    {
      type: 'table',
      id: 'descriptores-xml',
      heading: 'Los descriptores XML que también hay que cambiar',
      intro:
        'Es la parte que más se olvida, porque el código compila sin ella y el fallo solo aparece al desplegar.',
      caption: 'Versión y espacio de nombres de cada descriptor antes y después',
      columns: ['Descriptor', 'Java EE 8', 'Jakarta EE 9', 'Jakarta EE 10'],
      rows: [
        { header: 'persistence.xml', cells: ['2.2', '3.0', '3.1'] },
        { header: 'web.xml', cells: ['4.0', '5.0', '6.0'] },
        { header: 'beans.xml', cells: ['2.0', '3.0', '4.0'] },
        { header: 'faces-config.xml', cells: ['2.3', '3.0', '4.0'] },
        { header: 'ejb-jar.xml', cells: ['3.2', '4.0', '4.0'] },
      ],
      note: [
        'Además del número de versión cambia el propio espacio de nombres del XML, que pasa a apuntar a ',
        { code: 'jakarta.ee/xml/ns/jakartaee' },
        '. Un descriptor con la versión nueva y el espacio de nombres viejo falla en el arranque, no en la compilación.',
      ],
    },

    {
      type: 'errors',
      id: 'errores-tipicos-de-la-migracion',
      heading: 'Errores típicos y qué los provoca en realidad',
      items: [
        {
          signature: 'package javax.persistence does not exist',
          cause:
            'El proyecto ya usa una dependencia jakarta, pero quedan importaciones sin convertir. Suele pasar en módulos que la herramienta de migración no recorrió.',
          fix: 'Convertir el módulo entero, no fichero a fichero, y comprobar después que no quede ninguna referencia a javax en las clases de persistencia.',
        },
        {
          signature: 'ClassNotFoundException: javax.servlet.http.HttpServlet',
          cause:
            'El artefacto se despliega en un contenedor que ya solo expone el espacio de nombres jakarta, y el código compilado sigue pidiendo el antiguo.',
          fix: 'Comprobar la versión del servidor antes que el código: Tomcat 9 sirve javax y Tomcat 10 sirve jakarta. No es un error de la aplicación, es un desajuste de destino.',
        },
        {
          signature: 'NoSuchMethodError en una librería tras convertir los paquetes',
          cause:
            'Conviven las dos variantes de la misma dependencia, la javax y la jakarta, y el cargador de clases resuelve hacia la que no toca.',
          fix: [
            'Revisar el árbol con ',
            { code: 'mvn dependency:tree' },
            ' y excluir de forma explícita las transitivas que arrastran la variante antigua. Es el fallo más frecuente y el que más tiempo consume.',
          ],
        },
        {
          signature: 'HV000183: Unable to initialize jakarta.el.ExpressionFactory',
          cause:
            'Hibernate Validator necesita una implementación de Expression Language, y al migrar se queda la versión javax que ya no encaja.',
          fix: [
            'Añadir la implementación ',
            { code: 'jakarta.el' },
            ' correspondiente a la versión de Jakarta EE de destino. Aparece en aplicaciones que validan fuera de un contenedor completo.',
          ],
        },
      ],
    },

    {
      type: 'steps',
      id: 'como-se-aborda',
      heading: 'Cómo se aborda la migración sin bloquear el desarrollo',
      items: [
        {
          title: 'Inventario de dependencias, primero',
          body: 'Para cada dependencia: si existe versión jakarta, cuál es, y si no existe, qué la sustituye. Este documento es el que decide si la migración dura semanas o meses, y es lo primero que se entrega.',
        },
        {
          title: 'Elegir el servidor de destino',
          body: 'Condiciona la versión de Jakarta EE y la de Java. Si el servidor de producción no se puede mover todavía, el destino se ajusta a lo que ese servidor certifique, no al revés.',
        },
        {
          title: 'Automatizar la conversión de código',
          body: 'Eclipse Transformer y las recetas de OpenRewrite hacen el renombrado de forma acotada, solo sobre los paquetes que pertenecen a Jakarta EE. Un buscar y reemplazar sobre todo el proyecto acaba tocando cadenas de texto y nombres propios que no debía.',
        },
        {
          title: 'Convertir los descriptores a mano',
          body: 'Son pocos ficheros y las herramientas no siempre los cubren del todo. Versión y espacio de nombres a la vez, en el mismo commit que el código del módulo al que pertenecen.',
        },
        {
          title: 'Desplegar por fases, con pruebas en cada una',
          body: 'Cada fase deja la aplicación funcionando y desplegada. Mantener una rama de migración abierta durante meses acaba en un conflicto que nadie se atreve a resolver.',
        },
      ],
    },
  ],

  faq: [
    {
      question: '¿Se puede migrar a Jakarta EE sin parar el desarrollo?',
      answer:
        'Normalmente sí. El cambio de javax a jakarta es mecánico en el código propio; lo que marca el ritmo son las dependencias de terceros que todavía no han publicado una versión compatible. Ese inventario es lo primero que se hace, porque es lo que decide si la migración dura semanas o meses.',
    },
    {
      question: '¿Se puede migrar solo una parte de la aplicación?',
      answer:
        'No dentro del mismo despliegue. El contenedor expone un espacio de nombres o el otro, así que el artefacto se convierte entero. Lo que sí se puede es trocear la aplicación en varios desplegables y migrarlos por separado, si la arquitectura lo permite.',
    },
    {
      question: '¿Basta con buscar y reemplazar javax por jakarta?',
      answer:
        'No, y hacerlo suele romper cosas. Hay paquetes javax que no pertenecen a Jakarta EE y siguen en el JDK, como javax.sql o javax.naming. Las herramientas específicas acotan el renombrado a lo que de verdad cambió de dueño.',
    },
    {
      question: '¿Qué pasa con Hibernate al pasar a jakarta.persistence?',
      answer:
        'Hibernate 6 es el que trae el cambio de espacio de nombres, y además reescribió el motor de consultas: HQL que antes funcionaba puede comportarse de otra manera. Se aborda comparando el SQL generado antes y después sobre las consultas críticas, no confiando en que compile.',
    },
    {
      question: '¿Hay que ir a la última versión de Jakarta EE?',
      answer:
        'No necesariamente. Lo razonable suele ser ir a la versión más alta que certifique el servidor que podéis desplegar hoy. Saltar a la última y descubrir después que el servidor no la soporta obliga a dos migraciones en lugar de una.',
    },
    {
      question: '¿Y si una dependencia crítica no tiene versión jakarta?',
      answer:
        'Hay tres salidas: sustituirla, transformar el artefacto con Eclipse Transformer, o aislar su uso tras una interfaz propia y posponer la decisión. La elección depende de cuánto código dependa de ella, y es una de las cosas que el inventario deja cerradas antes de empezar.',
    },
  ],
}
