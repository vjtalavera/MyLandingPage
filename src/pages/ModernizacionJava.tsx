import ServicePage from './ServicePage'

function ModernizacionJava() {
  return (
    <ServicePage
      eyebrow="MODERNIZACIÓN JAVA"
      title="Modernización de aplicaciones Java Legacy"
      intro="Evolución progresiva de aplicaciones Java existentes para reducir deuda técnica y facilitar su mantenimiento y evolución."
      problemTitle="Modernizar sin empezar necesariamente desde cero"
      problemText="Las aplicaciones empresariales pueden acumular años de evolución tecnológica. La modernización permite analizar el sistema existente y definir una estrategia progresiva adaptada a sus necesidades."
      services={[
        'Análisis de aplicaciones Java Legacy',
        'Migración Java EE → Jakarta EE',
        'Actualización de versiones Java',
        'Modernización de aplicaciones JBoss / WildFly',
        'Migración hacia Spring Boot',
        'Refactorización de código',
        'Reducción de deuda técnica',
        'Evolución de arquitecturas monolíticas',
      ]}
      technologies={[
        'Java',
        'Java EE',
        'Jakarta EE',
        'Spring Boot',
        'JBoss',
        'WildFly',
        'Hibernate',
        'REST',
      ]}
      ctaText="Analizar mi caso"
      seoTitle="Modernización Java Legacy | JavaEvolve"
      seoDescription="Modernización de aplicaciones Java Legacy, migración Java EE a Jakarta EE, actualización de versiones y evolución hacia Spring Boot."
      canonical="https://javaevolve.com/servicios/modernizacion-java/"
    />
  )
}

export default ModernizacionJava