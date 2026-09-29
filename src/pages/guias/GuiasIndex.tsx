import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'
import { guides } from '../../data/guides'

export default function GuiasIndex() {
  return (
    <>
      <section className="service-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Guías' }]} />

          <p className="eyebrow">Guías técnicas</p>

          <h1>Procedimientos concretos para migrar sin sorpresas</h1>

          <p className="index-intro">
            Comandos, errores literales y checklists. Están escritas para
            resolver un problema concreto, no para convencer de nada.
          </p>

          <p className="index-intro">
            Si lo que buscas es entender el problema de fondo en lugar del
            síntoma, están los <Link to="/retos/">retos técnicos</Link>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Las guías publicadas</h2>

          <div className="challenge-grid">
            {guides.map((guide) => (
              <Link className="challenge-card" to={guide.path} key={guide.slug}>
                <span>{guide.eyebrow}</span>

                <h3>{guide.navLabel}</h3>

                <p>{guide.cardText}</p>

                <strong>Ver guía →</strong>
              </Link>
            ))}
          </div>

          <div className="challenge-cta">
            <p>¿Tu caso no encaja con ninguna?</p>

            <Link className="button primary" to="/#contacto">
              Cuéntame el problema
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
