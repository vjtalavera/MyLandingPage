import ServicePage from './ServicePage'

function ApisRest() {
  return (
    <ServicePage
      eyebrow="APIs REST"
      title="Desarrollo de APIs REST con Java"
      intro="Diseño y desarrollo de APIs REST para integrar aplicaciones, servicios y sistemas empresariales."
      problemTitle="Conectar sistemas de forma mantenible"
      problemText="Las APIs son una pieza fundamental para integrar aplicaciones empresariales. Una API debe responder a las necesidades funcionales del proyecto y facilitar su evolución y mantenimiento."
      services={[
        'Diseño de APIs REST',
        'Desarrollo de endpoints',
        'Integración entre aplicaciones',
        'Evolución de APIs existentes',
        'Servicios backend con Java',
        'Integración con sistemas empresariales',
      ]}
      technologies={[
        'Java',
        'Spring Boot',
        'Spring MVC',
        'REST',
        'JSON',
        'Hibernate',
        'SQL',
      ]}
      ctaText="Hablar sobre una API"
      seoTitle="Desarrollo de APIs REST con Java | JavaEvolve"
      seoDescription="Diseño y desarrollo de APIs REST con Java para integrar aplicaciones, servicios y sistemas empresariales."
      canonical="https://javaevolve.com/servicios/apis-rest/"
    />
  )
}

export default ApisRest