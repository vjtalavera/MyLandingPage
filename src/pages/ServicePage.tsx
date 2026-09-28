import { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface ServicePageProps {
  eyebrow: string
  title: string
  intro: string
  problemTitle: string
  problemText: string
  services: string[]
  technologies: string[]
  ctaText: string
  seoTitle: string
  seoDescription: string
  canonical: string
}

function ServicePage({
  eyebrow,
  title,
  intro,
  problemTitle,
  problemText,
  services,
  technologies,
  ctaText,
  seoTitle,
  seoDescription,
  canonical,
}: ServicePageProps) {
  useEffect(() => {
    document.title = seoTitle

    const description = document.querySelector(
      'meta[name="description"]',
    )

    if (description) {
      description.setAttribute('content', seoDescription)
    }

    let canonicalElement = document.querySelector(
      'link[rel="canonical"]',
    )

    if (!canonicalElement) {
      canonicalElement = document.createElement('link')
      canonicalElement.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalElement)
    }

    canonicalElement.setAttribute('href', canonical)

    const structuredData = {
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
    }

    let script = document.getElementById(
      'service-structured-data',
    )

    if (!script) {
      script = document.createElement('script')
      script.id = 'service-structured-data'
      script.setAttribute('type', 'application/ld+json')
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify(structuredData)

    return () => {
      script?.remove()
    }
  }, [seoTitle, seoDescription, canonical, title])

  return (
    <main>
      <section className="service-hero">
        <div className="container">
          <p className="eyebrow">{eyebrow}</p>

          <h1>{title}</h1>

          <p className="service-intro">{intro}</p>

          <Link className="button primary" to="/#contacto">
            {ctaText}
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container service-content">
          <div>
            <p className="eyebrow">EL RETO</p>

            <h2>{problemTitle}</h2>

            <p>{problemText}</p>
          </div>

          <div className="service-list">
            {services.map((service) => (
              <div key={service}>{service}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section service-technologies">
        <div className="container">
          <p className="eyebrow">TECNOLOGÍAS</p>

          <h2>Tecnologías relacionadas</h2>

          <div className="tech-list">
            {technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="service-cta section">
        <div className="container">
          <p className="eyebrow">JAVAEVOLVE</p>

          <h2>¿Quieres analizar tu caso?</h2>

          <p>
            Cada aplicación tiene un contexto diferente. Explícame brevemente
            qué necesitas y podemos valorar el siguiente paso.
          </p>

          <Link className="button primary" to="/#contacto">
            Contactar
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ServicePage