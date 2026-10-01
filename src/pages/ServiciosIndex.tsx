import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import ContentSections from '../components/ContentSections'
import Faq from '../components/Faq'
import PageToc from '../components/PageToc'
import { services } from '../data/catalog'
import { indexContent } from '../data/content/indices'

export default function ServiciosIndex() {
  const content = indexContent['/servicios/']

  return (
    <>
      <section className="service-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Servicios' }]} />

          <div className="hero-split">
            <div>
              <p className="eyebrow is-lead">Servicios</p>

              <h1>Desarrollo y evolución de aplicaciones Java</h1>

              <p className="index-intro">
                Cuatro formas de trabajar sobre un backend Java: construir lo
                que falta, llevarlo a Spring Boot, exponerlo como API o
                modernizar lo que ya hay sin parar la aplicación.
              </p>

              <p className="index-intro">
                Si no tienes claro cuál encaja con tu caso, el punto de partida
                siempre es el mismo: mirar el código y las dependencias antes
                de proponer nada.
              </p>
            </div>

            {content.sections ? <PageToc blocks={content.sections} /> : null}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Los cuatro servicios</h2>

          <div className="cards four">
            {services.map((entry) => (
              <article className="card service-card" key={entry.slug}>
                <h3>{entry.navLabel}</h3>

                <p>{entry.cardText}</p>

                <Link to={entry.path}>Ver servicio →</Link>
              </article>
            ))}
          </div>

          <div className="challenge-cta">
            <p>¿No sabes por dónde empezar?</p>

            <Link className="button primary" to="/#contacto">
              Cuéntame tu caso
            </Link>
          </div>
        </div>
      </section>

      {content.sections ? <ContentSections blocks={content.sections} /> : null}

      {content.faq ? (
        <Faq items={content.faq} id="faq-servicios" title={content.faqTitle} />
      ) : null}
    </>
  )
}
