import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'
import ContentSections from '../../components/ContentSections'
import Faq from '../../components/Faq'
import PageToc from '../../components/PageToc'
import { retos } from '../../data/catalog'
import { indexContent } from '../../data/content/indices'

export default function RetosIndex() {
  const content = indexContent['/retos/']

  return (
    <>
      <section className="service-hero challenge-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Retos' }]} />

          <div className="hero-split">
            <div>
              <p className="eyebrow">Retos técnicos</p>

              <h1>Los problemas que suelen bloquear un backend Java</h1>

              <p className="index-intro">
                Cuatro situaciones que se repiten en aplicaciones empresariales
                con años encima. Cada una explica qué se analiza antes de tocar
                nada y qué suele salir mal cuando no se hace.
              </p>

              <p className="index-intro">
                Son páginas para entender el problema. Si ya lo tienes claro y
                lo que buscas es quién lo ejecute, están los{' '}
                <Link to="/servicios/">servicios</Link>.
              </p>
            </div>

            {content.sections ? <PageToc blocks={content.sections} /> : null}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Los cuatro retos</h2>

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

            <Link className="button primary" to="/#contacto">
              Cuéntame el problema
            </Link>
          </div>
        </div>
      </section>

      {content.sections ? <ContentSections blocks={content.sections} /> : null}

      {content.faq ? (
        <Faq items={content.faq} id="faq-retos" title={content.faqTitle} />
      ) : null}
    </>
  )
}
