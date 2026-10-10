import { Link } from 'react-router-dom'
import ContactSection from '../components/ContactSection'
import Faq from '../components/Faq'
import { retos, services } from '../data/catalog'
import { OFFER } from '../data/offer'

/*
 * Riesgos de ejemplo del bloque del diagnóstico. Son generales del ecosistema,
 * no de un cliente: cada uno sale de una respuesta que ya está publicada en
 * las FAQ (`src/data/faq.ts`). Si cambia una, hay que revisar su par aquí.
 */
const sampleRisks = [
  {
    signature: 'javax.* → jakarta.*',
    effect: 'marca el ritmo',
    body: 'Mecánico en el código propio. Lo que decide si son semanas o meses son las librerías de terceros sin versión compatible.',
  },
  {
    signature: 'Hibernate 5 → 6',
    effect: 'cambia resultados',
    body: 'El motor de HQL se reescribió: una consulta que compila puede devolver otra cosa. Se compara el SQL generado antes y después.',
  },
  {
    signature: 'JBoss EAP antiguo',
    effect: 'fija el techo',
    body: 'Las versiones antiguas no soportan las LTS actuales de Java. El servidor decide hasta dónde se puede subir y en qué orden.',
  },
  {
    signature: 'Pocas pruebas',
    effect: 'va primero',
    body: 'Sin una red que demuestre que el comportamiento se mantiene, construirla es la primera fase, no un extra.',
  },
]

export default function Home() {
  return (
    <>
      <section id="inicio" className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            {/*
              El eyebrow nombra las tres consultas que traen visitas
              (modernización, Spring Boot, APIs REST) y el H1 promete el
              resultado con la cuarta (Java 8 a 17/21). Los &nbsp; impiden que
              el balanceo parta "17 / o 21".
            */}
            <p className="eyebrow is-lead">
              Modernización Java · Spring Boot · APIs REST
            </p>

            <h1>
              Moderniza tu aplicación de Java&nbsp;8 a 17&nbsp;o&nbsp;21,
              <span> sin parar producción</span>
            </h1>

            <p className="hero-text">
              Para empresas con un backend en Java 8, <code>javax</code> o
              Spring antiguo que no puede dejar de dar servicio. Lo llevo a
              Jakarta EE y Spring Boot 3 por fases que llegan a producción, y
              también desarrollo servicios y APIs REST nuevos en Java.
            </p>

            {/*
              Un único siguiente paso. El enlace secundario no saca de la
              página: baja a lo que incluye la oferta, que es la duda que
              frena el clic en el botón de al lado.
            */}
            <div className="hero-actions">
              <Link className="button primary" to="/#contacto">
                {OFFER.cta}
              </Link>

              <Link className="text-link" to="/#diagnostico">
                Qué incluye el diagnóstico ↓
              </Link>
            </div>

            <p className="hero-note">{OFFER.note}</p>

            {/*
              Señales de confianza. Las tres son verificables contra el resto
              de la página (el alcance del análisis y las fases desplegables
              salen de #diagnostico y #proceso), que es justo lo que las separa
              de un "500 clientes satisfechos".
            */}
            <ul className="hero-proof">
              <li>
                <strong>Java 8 → 17 / 21</strong>
                <span>Jakarta EE y Spring Boot 3 incluidos</span>
              </li>

              <li>
                <strong>El análisis es tuyo</strong>
                <span>Te lo quedas aunque después no sigamos</span>
              </li>

              <li>
                <strong>Cada fase se despliega</strong>
                <span>Sin ramas de migración abiertas meses</span>
              </li>
            </ul>
          </div>

          <div
            className="code-card"
            role="img"
            aria-label="Fragmento de una migración: se sustituye la importación de javax.persistence por jakarta.persistence y se sube el compilador de Maven de Java 8 a Java 21."
          >
            <div className="code-header" aria-hidden="true">
              <span />
              <span />
              <span />
              <em>OrderRepository.java</em>
            </div>

            {/*
              Una línea = un elemento, para poder escalonar el revelado del
              diff. Los saltos de línea ya no se escriben: los da el
              `display: block` de .code-line.

              OJO: los retardos del revelado se asignan en App.css por
              :nth-child sobre las líneas 1-4, 7 y 8, que son las del diff. Si
              se añaden o quitan líneas aquí, hay que revisar esas reglas.
            */}
            <pre aria-hidden="true">
              <code>
                <span className="code-line code-del">
                  - import javax.persistence.Entity;
                </span>
                <span className="code-line code-del">
                  - import javax.persistence.Id;
                </span>
                <span className="code-line code-add">
                  + import jakarta.persistence.Entity;
                </span>
                <span className="code-line code-add">
                  + import jakarta.persistence.Id;
                </span>
                <span className="code-line">{' '}</span>
                <span className="code-line is-comment">{'  // pom.xml'}</span>
                <span className="code-line code-del">
                  {'-   <maven.compiler.source>1.8</...>'}
                </span>
                <span className="code-line code-add">
                  {'+   <maven.compiler.release>21</...>'}
                </span>
                <span className="code-line">{' '}</span>
                <span className="code-line is-comment">
                  {'  // hibernate-core 5.6 → 6.4'}
                </span>
                <span className="code-line is-comment">
                  {'  // 34 dependencias por revisar'}
                </span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/*
        Qué se lleva quien pide el diagnóstico. Va justo después del hero
        porque es la pregunta que frena el clic: antes estaba repartida entre
        el hero, el primer paso de #proceso y el contacto.

        Todo lo que afirma sale de compromisos ya publicados: OFFER, el
        primer paso del proceso y los tres pasos de "Qué pasa después".
      */}
      <section id="diagnostico" className="section diagnosis">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">El primer paso</p>

            <h2>Qué incluye el diagnóstico gratuito</h2>

            <p>
              Una llamada de {OFFER.duration} para entender tu sistema antes de
              hablar de plazos o de precio. Sin compromiso: si no puedo
              ayudarte, te lo digo.
            </p>
          </div>

          <div className="diagnosis-grid">
            <div className="diagnosis-sheet">
              <p className="diagnosis-sheet-head" aria-hidden="true">
                <span>diagnóstico</span>
                <span>{OFFER.duration} · sin coste</span>
              </p>

              <dl>
                <div>
                  <dt>Antes</dt>
                  <dd>
                    Te respondo en {OFFER.responseTime} con preguntas concretas
                    o una propuesta de hora.
                  </dd>
                </div>

                <div>
                  <dt>En la llamada</dt>
                  <dd>
                    Versión de Java, framework, servidor de aplicaciones, cómo
                    se construye y se despliega, y qué es lo que duele hoy.
                  </dd>
                </div>

                <div>
                  <dt>Al colgar</dt>
                  <dd>
                    Sabes si se puede hacer, por dónde empezaría y qué riesgos
                    veo.
                  </dd>
                </div>

                <div>
                  <dt>Si seguimos</dt>
                  <dd>
                    Una propuesta de análisis con alcance y precio cerrados. El
                    documento es tuyo aunque después no sigamos.
                  </dd>
                </div>

                <div>
                  <dt>Qué necesito</dt>
                  <dd>
                    Que me cuentes el stack y qué te está bloqueando, con tus
                    palabras.
                  </dd>
                </div>
              </dl>

              <div className="diagnosis-sheet-action">
                <Link className="button primary" to="/#contacto">
                  {OFFER.cta}
                </Link>
              </div>
            </div>

            <div className="diagnosis-risks">
              <h3>Riesgos que conviene ver antes de estimar</h3>

              <ul>
                {sampleRisks.map((risk) => (
                  <li key={risk.signature}>
                    <p className="risk-head">
                      <code>{risk.signature}</code>
                      <span>{risk.effect}</span>
                    </p>

                    <p>{risk.body}</p>
                  </li>
                ))}
              </ul>

              <p className="diagnosis-risks-note">
                Ejemplos generales del ecosistema Java, no de un cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="senales" className="section signals">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Cuándo tiene sentido llamarme</p>

            <h2>¿Tu aplicación Java necesita evolucionar?</h2>
          </div>

          {/* Lista y no tarjetas: son síntomas que se reconocen de un
              vistazo, y en móvil ocupan la mitad. */}
          <ul className="signal-list">
            <li>
              <strong>El proveedor original ya no está.</strong> La
              documentación es el propio código y cada cambio da respeto
              porque no se sabe qué más toca.
            </li>

            <li>
              <strong>La versión de Java bloquea lo demás.</strong> Las
              librerías que necesitáis ya no publican versiones para Java 8.
            </li>

            <li>
              <strong>Cada despliegue es un evento.</strong> Fin de semana, plan
              de vuelta atrás y media plantilla pendiente: es un problema de
              arquitectura y de pruebas.
            </li>

            <li>
              <strong>Hace falta algo nuevo que conviva con lo que hay.</strong>{' '}
              Un servicio en Spring Boot o una API REST que no obligue a
              migrar todo de golpe.
            </li>
          </ul>
        </div>
      </section>

      <section id="proceso" className="about section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Cómo trabajo</p>

            <h2>Entender el sistema, acotar el riesgo y entregar por fases</h2>
          </div>

          <div className="about-grid">
            <ol className="process">
              <li>
                <h3>Llamada de diagnóstico, sin coste</h3>
                <p>
                  {OFFER.duration} para entender qué hay y decirte si puedo
                  ayudarte. Si la respuesta es no, te lo diré.
                </p>
              </li>

              <li>
                <h3>Análisis técnico con alcance cerrado</h3>
                <p>
                  Inventario de dependencias, incompatibilidades detectadas,
                  riesgos ordenados por impacto y un plan por fases con el
                  esfuerzo estimado de cada una. Es un trabajo acotado y el
                  documento es tuyo aunque después no sigamos juntos.
                </p>
              </li>

              <li>
                <h3>Ejecución por fases que se despliegan</h3>
                <p>
                  Incrementos que llegan a producción. Cada fase deja la
                  aplicación funcionando y con sus pruebas, sin ramas de
                  migración que luego nadie se atreve a fusionar.
                </p>
              </li>

              <li>
                <h3>Traspaso al equipo</h3>
                <p>
                  Documentación de qué se ha cambiado y por qué, decisiones
                  registradas y una sesión con tu equipo. El objetivo es que
                  podáis seguir sin mí.
                </p>
              </li>
            </ol>

            <div>
              <h3>Qué no hago</h3>

              <ul className="no-list">
                <li>
                  <strong>No propongo reescribir desde cero por defecto.</strong>{' '}
                  Rehacer un sistema que hoy funciona es la opción más cara y la
                  de mayor riesgo. A veces es la correcta, y entonces lo diré con
                  los motivos delante, pero no es el punto de partida.
                </li>

                <li>
                  <strong>No migro a ciegas.</strong> Si no hay pruebas
                  suficientes para demostrar que el comportamiento se mantiene,
                  construirlas es la primera fase, no un extra opcional.
                </li>

                <li>
                  <strong>No pongo fecha antes del análisis.</strong> Una
                  estimación dada en la primera llamada no es una estimación: es
                  una cifra que nos va a incomodar a los dos dentro de tres
                  meses.
                </li>

                <li>
                  <strong>No hago administración de sistemas.</strong>{' '}
                  Si tu proyecto lo necesita, te lo digo en la primera llamada.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="retos" className="legacy-section section">
        <div className="container">
          {/* Las cuatro fases que había aquí repetían #proceso, que ahora
              va justo encima: el bloque se queda con lo suyo, los retos. */}
          <div className="legacy-grid">
            <div>
              <p className="eyebrow is-lead">Modernización</p>

              <h2>Modernizar una aplicación Java que no puede pararse</h2>
            </div>

            <div>
              <p>
                Las aplicaciones empresariales no siempre pueden sustituirse
                desde cero. Estos son los cuatro caminos de modernización más
                habituales, cada uno con lo que implica y por dónde se empieza.
              </p>

              <div className="legacy-actions">
                {/* Deliberadamente NO es `primary`: el azul sólido queda
                    reservado al hero, al diagnóstico, al header y al envío
                    del formulario. */}
                <Link className="button on-dark" to="/#contacto">
                  {OFFER.cta}
                </Link>

                <Link className="text-link" to="/servicios/modernizacion-java/">
                  Ver el servicio de modernización →
                </Link>
              </div>
            </div>
          </div>

          <div className="challenge-grid">
            {retos.map((entry) => (
              <Link className="challenge-card" to={entry.path} key={entry.slug}>
                <span>{entry.eyebrow}</span>

                <h3>{entry.navLabel}</h3>

                <p>{entry.cardText}</p>

                <strong>Ver reto →</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="section section--sunken">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Servicios</p>

            <h2>Consultoría, desarrollo y migraciones Java</h2>

            <p>
              Cuatro formas de trabajar sobre un backend Java: construir lo que
              falta, modernizar lo que bloquea, o las dos cosas por fases.
            </p>
          </div>

          <div className="cards four">
            {services.map((entry) => (
              <article className="card service-card" key={entry.slug}>
                <h3>{entry.navLabel}</h3>

                <p>{entry.cardText}</p>

                <Link to={entry.path}>Ver servicio →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tecnologias" className="section technologies">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Tecnologías</p>

            <h2>Stack de backend empresarial Java</h2>

            <p>
              No es una lista de logos: son las cuatro capas donde suelen
              aparecer los problemas cuando hay que evolucionar una aplicación
              Java con años encima.
            </p>
          </div>

          {/* En móvil cada bloque se queda en chips y enlaces: la prosa se
              oculta por CSS (sigue en el HTML, así que no hay diferencia
              entre servidor y cliente) y la página pierde varias pantallas. */}
          <div className="tech-blocks">
            <article className="tech-block">
              <h3>La plataforma: Java, Java EE y Jakarta EE</h3>

              {/* Las chips van antes que la prosa en los cuatro bloques: quien
                  escanea busca si su stack aparece, y solo lee el párrafo si
                  lo encuentra. El texto sigue íntegro, debajo. */}
              <ul className="tech-list">
                <li>Java 8 / 11 / 17 / 21</li>
                <li>Java EE</li>
                <li>Jakarta EE</li>
                <li>Maven</li>
                <li>JDK / JVM</li>
              </ul>

              <p>
                El salto de Java 8 a 17 o 21 rara vez se queda en cambiar el
                JDK: el sistema de módulos, la retirada de APIs que antes
                venían incluidas y el fin de soporte del servidor arrastran a
                las dependencias. En Jakarta EE 9 el cambio de{' '}
                <code>javax.*</code> a <code>jakarta.*</code> afecta a todas las
                librerías, no solo al código propio.
              </p>

              <p className="tech-links">
                <Link to="/retos/actualizacion-java/">
                  Actualizar la versión de Java
                </Link>

                <Link to="/retos/migracion-java-ee-jakarta-ee/">
                  Migrar de Java EE a Jakarta EE
                </Link>
              </p>
            </article>

            <article className="tech-block">
              <h3>Spring y Spring Boot</h3>

              <ul className="tech-list">
                <li>Spring Framework</li>
                <li>Spring Boot 2 / 3</li>
                <li>Spring MVC</li>
                <li>Spring Data</li>
                <li>Spring Security</li>
              </ul>

              <p>
                La mayoría de aplicaciones no necesitan una migración completa
                de golpe: los servicios nuevos se levantan en Spring Boot y
                conviven con lo anterior mientras se decide qué se mueve y en
                qué orden. El salto de Spring Boot 2 a 3 arrastra el mismo
                cambio de espacio de nombres y exige una versión de Java con
                soporte.
              </p>

              <p className="tech-links">
                <Link to="/servicios/spring-boot/">
                  Desarrollo con Spring Boot
                </Link>

                <Link to="/retos/migracion-spring-boot/">
                  Migración hacia Spring Boot
                </Link>
              </p>
            </article>

            <article className="tech-block">
              <h3>Persistencia: JPA e Hibernate</h3>

              <ul className="tech-list">
                <li>JPA</li>
                <li>Hibernate 5 / 6</li>
                <li>Spring Data JPA</li>
                <li>HQL / JPQL</li>
                <li>SQL</li>
              </ul>

              <p>
                Es donde más suele doler una modernización. Mapeos que arrastran
                decisiones de hace diez años, consultas N+1 que no se notaron
                hasta que la tabla creció, <code>LazyInitializationException</code>{' '}
                en los bordes de la transacción, y el salto de Hibernate 5 a 6
                con el cambio a <code>jakarta.persistence</code> y la reescritura
                del motor de HQL.
              </p>

              <p>
                El trabajo consiste en revisar el modelo, aislar las consultas
                problemáticas y hacer el cambio comparando el SQL generado antes
                y después.
              </p>

              <p className="tech-links">
                <Link to="/servicios/modernizacion-java/">
                  Modernización de aplicaciones Java
                </Link>
              </p>
            </article>

            <article className="tech-block">
              <h3>Servidores, integración y APIs</h3>

              <ul className="tech-list">
                <li>JBoss / WildFly</li>
                <li>Tomcat</li>
                <li>REST</li>
                <li>JAX-RS</li>
                <li>JSON</li>
              </ul>

              <p>
                El servidor de aplicaciones condiciona hasta dónde se puede
                subir de versión, y las integraciones existentes marcan qué se
                puede cambiar sin avisar a nadie. Antes de mover una pieza hay
                que saber quién la está consumiendo y con qué contrato.
              </p>

              <p className="tech-links">
                <Link to="/servicios/apis-rest/">Desarrollo de APIs REST</Link>

                <Link to="/servicios/desarrollo-java/">Desarrollo Java</Link>
              </p>
            </article>
          </div>
        </div>
      </section>

      <Faq className="section--sunken" />

      <ContactSection />
    </>
  )
}
