import { useEffect } from 'react'
import { Link } from 'react-router-dom'

type RetoPageProps = {
  eyebrow: string
  title: string
  intro: string
  problemTitle: string
  problemText: string
  areas: string[]
  technologies: string[]
  seoTitle: string
  seoDescription: string
  canonical: string
  relatedService?: {
    label: string
    url: string
  }
}

export default function RetoPage({
  eyebrow,
  title,
  intro,
  problemTitle,
  problemText,
  areas,
  technologies,
  seoTitle,
  seoDescription,
  canonical,
  relatedService,
}: RetoPageProps) {
  useEffect(() => {
    document.title = seoTitle

    let description = document.querySelector(
      'meta[name="description"]',
    ) as HTMLMetaElement | null

    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.appendChild(description)
    }

    description.content = seoDescription

    let canonicalLink = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null

    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }

    canonicalLink.href = canonical

    let structuredData = document.getElementById('challenge-structured-data')

    if (!structuredData) {
      structuredData = document.createElement('script')
      structuredData.id = 'challenge-structured-data'
      structuredData.setAttribute('type', 'application/ld+json')
      document.head.appendChild(structuredData)
    }

    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: title,
      description: seoDescription,
      provider: {
        '@type': 'ProfessionalService',
        name: 'JavaEvolve',
        url: 'https://javaevolve.com/',
      },
      url: canonical,
      areaServed: 'ES',
    })

    return () => {
      structuredData?.remove()
    }
  }, [canonical, seoDescription, seoTitle, title])

  return (
    <>
      <section className="service-hero challenge-hero">
        <div className="container">
          <p className="eyebrow">{eyebrow}</p>

          <h1>{title}</h1>

          <p className="service-intro">{intro}</p>

          <Link className="btn btn-primary" to="/#contacto">
            Analizar mi caso
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container service-content">
          <div>
            <p className="eyebrow">EL RETO</p>
            <h2>{problemTitle}</h2>
          </div>

          <div>
            <p>{problemText}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">QUÉ PODEMOS ANALIZAR</p>

          <div className="service-list">
            {areas.map((area) => (
              <div key={area}>{area}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section service-technologies">
        <div className="container">
          <p className="eyebrow">TECNOLOGÍAS RELACIONADAS</p>

          <h2>Experiencia sobre el ecosistema Java empresarial</h2>

          <div className="tech-grid">
            {technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>
      </section>

      {relatedService && (
        <section className="section">
          <div className="container">
            <p className="eyebrow">SERVICIO RELACIONADO</p>

            <h2>¿Necesitas abordar este tipo de proyecto?</h2>

            <p className="service-intro">
              Conoce el servicio de JavaEvolve relacionado con este reto técnico.
            </p>

            <Link
              className="btn btn-secondary"
              to={relatedService.url}
            >
              {relatedService.label}
            </Link>
          </div>
        </section>
      )}

      <section className="section service-cta">
        <div className="container">
          <p className="eyebrow">¿TIENES ESTE RETO?</p>

          <h2>Analicemos tu aplicación</h2>

          <p>
            Cuéntame brevemente el estado actual de tu aplicación y qué
            necesitas evolucionar. Podemos valorar el contexto técnico y las
            posibles líneas de actuación.
          </p>

          <Link className="btn btn-primary" to="/#contacto">
            Contactar con JavaEvolve
          </Link>
        </div>
      </section>
    </>
  )
}