import ServicePage from './ServicePage'

function SpringBoot() {
  return (
    <ServicePage
      eyebrow="SPRING BOOT"
      title="Desarrollo backend con Spring Boot"
      intro="Desarrollo de servicios backend y APIs con Spring Boot y Spring Framework para aplicaciones empresariales."
      problemTitle="Backend preparado para evolucionar"
      problemText="Spring Boot permite construir servicios backend orientados a aplicaciones modernas. El desarrollo debe adaptarse a las necesidades reales del proyecto, su arquitectura y los sistemas con los que necesita integrarse."
      services={[
        'Desarrollo de aplicaciones Spring Boot',
        'APIs REST',
        'Servicios backend',
        'Integración con bases de datos',
        'Evolución de aplicaciones existentes',
        'Refactorización hacia arquitecturas modernas',
      ]}
      technologies={[
        'Java',
        'Spring Boot',
        'Spring Framework',
        'Spring Data',
        'Hibernate',
        'REST',
        'SQL',
        'Git',
      ]}
      ctaText="Consultar proyecto"
      seoTitle="Desarrollo Spring Boot | JavaEvolve"
      seoDescription="Desarrollo backend con Spring Boot y Spring Framework para servicios, APIs REST y aplicaciones empresariales."
      canonical="https://javaevolve.com/servicios/spring-boot/"
    />
  )
}

export default SpringBoot