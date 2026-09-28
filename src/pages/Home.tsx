import { Link } from 'react-router-dom'
import ContactSection from '../components/ContactSection'
import Faq from '../components/Faq'
import { retos, services } from '../data/catalog'

export default function Home() {
  return (
    <>
      <section id="inicio" className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow">Java · Backend · Modernización</p>

            <h1>
              Desarrollo Java y Backend para
              <span> aplicaciones empresariales</span>
            </h1>

            <p className="hero-text">
              Desarrollo con Java y Spring Boot, APIs REST y modernización de
              aplicaciones Java que ya están en producción y no pueden pararse.
            </p>

            <div className="hero-actions">
              <Link className="button primary" to="/#contacto">
                Cuéntame tu proyecto
              </Link>

              <Link className="text-link" to="/servicios/">
                Ver servicios →
              </Link>
            </div>
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

            <pre aria-hidden="true">
              <code>
                <span className="code-del">
                  {'- import javax.persistence.Entity;'}
                </span>
                {'\n'}
                <span className="code-del">
                  {'- import javax.persistence.Id;'}
                </span>
                {'\n'}
                <span className="code-add">
                  {'+ import jakarta.persistence.Entity;'}
                </span>
                {'\n'}
                <span className="code-add">
                  {'+ import jakarta.persistence.Id;'}
                </span>
                {'\n\n'}
                {'  // pom.xml\n'}
                <span className="code-del">
                  {'-   <maven.compiler.source>1.8</...>'}
                </span>
                {'\n'}
                <span className="code-add">
                  {'+   <maven.compiler.release>21</...>'}
                </span>
                {'\n\n'}
                {'  // hibernate-core 5.6 → 6.4\n'}
                {'  // 34 dependencias por revisar'}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section id="senales" className="problem section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Evolución de software</p>

            <h2>¿Tu aplicación Java necesita evolucionar?</h2>

            <p>
              No todos los sistemas empresariales necesitan empezar desde cero.
              A veces necesitan una nueva funcionalidad, una modernización
              progresiva o una estrategia para reducir su deuda técnica.
            </p>
          </div>

          <div className="cards three">
            <article className="card">
              <div className="card-number">01</div>
              <h3>El proveedor original ya no está</h3>
              <p>
                Nadie del equipo que la construyó sigue en la empresa y la
                documentación es el propio código. Cada cambio da respeto
                porque no se sabe qué más toca.
              </p>
            </article>

            <article className="card">
              <div className="card-number">02</div>
              <h3>La versión de Java bloquea lo demás</h3>
              <p>
                Seguís en Java 8 y las librerías que necesitáis ya no publican
                versiones compatibles. Cada dependencia nueva se convierte en
                una negociación.
              </p>
            </article>

            <article className="card">
              <div className="card-number">03</div>
              <h3>Cada despliegue es un evento</h3>
              <p>
                Sale en fin de semana, con plan de vuelta atrás y media
                plantilla pendiente. Eso no es un problema de despliegue: es de
                arquitectura y de pruebas.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="servicios" className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Servicios</p>
            <h2>Desarrollo y evolución de aplicaciones Java</h2>
          </div>

          <div className="cards four">
            {services.map((entry, position) => (
              <article
                className={`card service-card${entry.featured ? ' featured' : ''}`}
                key={entry.slug}
              >
                <span className="service-tag">
                  {String(position + 1).padStart(2, '0')}
                </span>

                <h3>{entry.navLabel}</h3>

                <p>{entry.cardText}</p>

                <Link to={entry.path}>Ver servicio →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="retos" className="legacy-section section">
        <div className="container">
          <div className="legacy-grid">
            <div>
              <p className="eyebrow">Modernización</p>

              <h2>Modernizar una aplicación Java que no puede pararse</h2>

              <p>
                Las aplicaciones empresariales no siempre pueden sustituirse
                desde cero. La evolución progresiva permite analizar el sistema
                existente, identificar riesgos y definir una estrategia
                adaptada al proyecto.
              </p>

              <div className="legacy-actions">
                <Link className="button primary" to="/#contacto">
                  Analizar mi caso
                </Link>

                <Link className="text-link" to="/servicios/modernizacion-java/">
                  Ver el servicio de modernización →
                </Link>
              </div>
            </div>

            <ol className="topics">
              <li>
                <b>01</b>
                <div>
                  <h3>Inventario</h3>
                  <p>
                    Versiones, dependencias, servidor de aplicaciones y puntos
                    de integración. Sin esto, cualquier estimación es una
                    apuesta.
                  </p>
                </div>
              </li>

              <li>
                <b>02</b>
                <div>
                  <h3>Matriz de impacto</h3>
                  <p>
                    Qué se rompe al subir de versión, qué es sustituible y qué
                    hay que reescribir, ordenado por riesgo.
                  </p>
                </div>
              </li>

              <li>
                <b>03</b>
                <div>
                  <h3>Plan por fases desplegables</h3>
                  <p>
                    Cada fase deja la aplicación funcionando y en producción.
                    Sin ramas de migración abiertas durante seis meses.
                  </p>
                </div>
              </li>

              <li>
                <b>04</b>
                <div>
                  <h3>Verificación</h3>
                  <p>
                    Antes de tocar nada, pruebas que demuestren que el
                    comportamiento actual se mantiene.
                  </p>
                </div>
              </li>
            </ol>
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

          <div className="challenge-cta">
            <p>¿Tu caso se parece a alguno de estos?</p>

            <Link className="button secondary" to="/#contacto">
              Cuéntame el problema
            </Link>
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

          <div className="tech-blocks">
            <article className="tech-block">
              <span className="card-number">01</span>

              <h3>La plataforma: Java, Java EE y Jakarta EE</h3>

              <p>
                El salto de Java 8 a 17 o 21 rara vez se queda en cambiar el
                JDK: el sistema de módulos, la retirada de APIs que antes
                venían incluidas y el fin de soporte del servidor arrastran a
                las dependencias. En Jakarta EE 9 el cambio de{' '}
                <code>javax.*</code> a <code>jakarta.*</code> afecta a todas las
                librerías, no solo al código propio.
              </p>

              <ul className="tech-list">
                <li>Java 8 / 11 / 17 / 21</li>
                <li>Java EE</li>
                <li>Jakarta EE</li>
                <li>Maven</li>
                <li>JDK / JVM</li>
              </ul>

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
              <span className="card-number">02</span>

              <h3>Spring y Spring Boot</h3>

              <p>
                La mayoría de aplicaciones no necesitan una migración completa
                de golpe: los servicios nuevos se levantan en Spring Boot y
                conviven con lo anterior mientras se decide qué se mueve y en
                qué orden. El salto de Spring Boot 2 a 3 arrastra el mismo
                cambio de espacio de nombres y exige una versión de Java con
                soporte.
              </p>

              <ul className="tech-list">
                <li>Spring Framework</li>
                <li>Spring Boot 2 / 3</li>
                <li>Spring MVC</li>
                <li>Spring Data</li>
                <li>Spring Security</li>
              </ul>

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
              <span className="card-number">03</span>

              <h3>Persistencia: JPA e Hibernate</h3>

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

              <ul className="tech-list">
                <li>JPA</li>
                <li>Hibernate 5 / 6</li>
                <li>Spring Data JPA</li>
                <li>HQL / JPQL</li>
                <li>SQL</li>
              </ul>

              <p className="tech-links">
                <Link to="/servicios/modernizacion-java/">
                  Modernización de aplicaciones Java
                </Link>
              </p>
            </article>

            <article className="tech-block">
              <span className="card-number">04</span>

              <h3>Servidores, integración y APIs</h3>

              <p>
                El servidor de aplicaciones condiciona hasta dónde se puede
                subir de versión, y las integraciones existentes marcan qué se
                puede cambiar sin avisar a nadie. Antes de mover una pieza hay
                que saber quién la está consumiendo y con qué contrato.
              </p>

              <ul className="tech-list">
                <li>JBoss / WildFly</li>
                <li>Tomcat</li>
                <li>REST</li>
                <li>JAX-RS</li>
                <li>JSON</li>
              </ul>

              <p className="tech-links">
                <Link to="/servicios/apis-rest/">Desarrollo de APIs REST</Link>

                <Link to="/servicios/desarrollo-java/">Desarrollo Java</Link>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="proceso" className="about section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Cómo trabajo</p>

            <h2>Entender el sistema, acotar el riesgo y entregar por fases</h2>

            <p>
              El objetivo es sencillo: entender el sistema, identificar el
              problema y construir una solución mantenible. Sin sorpresas a
              mitad de camino.
            </p>
          </div>

          <div className="about-grid">
            <ol className="process">
              <li>
                <span className="card-number">01</span>
                <h3>Llamada de diagnóstico</h3>
                <p>
                  Media hora para entender qué hay: versión de Java, framework,
                  servidor, cómo se construye y se despliega, y qué es lo que
                  duele hoy. Al colgar sabrás si puedo ayudarte, y si la
                  respuesta es no, te lo diré.
                </p>
              </li>

              <li>
                <span className="card-number">02</span>
                <h3>Análisis técnico con alcance cerrado</h3>
                <p>
                  Inventario de dependencias, incompatibilidades detectadas,
                  riesgos ordenados por impacto y un plan por fases con el
                  esfuerzo estimado de cada una. Es un trabajo acotado y el
                  documento es tuyo aunque después no sigamos juntos.
                </p>
              </li>

              <li>
                <span className="card-number">03</span>
                <h3>Ejecución por fases que se despliegan</h3>
                <p>
                  Incrementos que llegan a producción. Cada fase deja la
                  aplicación funcionando y con sus pruebas, sin ramas de
                  migración que luego nadie se atreve a fusionar.
                </p>
              </li>

              <li>
                <span className="card-number">04</span>
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

      <Faq />

      <ContactSection />
    </>
  )
}
