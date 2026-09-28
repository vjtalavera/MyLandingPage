import RetoPage from './RetoPage'

export default function MigracionJavaEeJakarta() {
  return (
    <RetoPage
      eyebrow="MIGRACIÓN JAVA EE"
      title="Migración de Java EE a Jakarta EE"
      intro="Evolución de aplicaciones Java EE hacia Jakarta EE, abordando compatibilidad, dependencias y cambios necesarios para mantener la aplicación preparada para nuevas versiones del ecosistema."
      problemTitle="Una migración empresarial requiere algo más que cambiar paquetes"
      problemText="Las aplicaciones Java EE existentes pueden acumular dependencias, APIs antiguas, servidores de aplicaciones y componentes que condicionan su evolución. Analizar estos elementos antes de migrar permite identificar impactos técnicos y definir una estrategia adecuada para cada aplicación."
      areas={[
        'Análisis de aplicaciones Java EE existentes',
        'Identificación de APIs y dependencias afectadas',
        'Migración de javax.* a jakarta.*',
        'Compatibilidad con versiones modernas del servidor',
        'Revisión de configuraciones y librerías',
        'Adaptación de componentes empresariales',
        'Validación de integraciones existentes',
      ]}
      technologies={[
        'Java EE',
        'Jakarta EE',
        'JPA',
        'JAX-RS',
        'JAX-WS',
        'Hibernate',
        'WildFly',
        'JBoss',
        'Maven',
      ]}
      seoTitle="Migración Java EE a Jakarta EE | JavaEvolve"
      seoDescription="Migración de aplicaciones Java EE a Jakarta EE, análisis de dependencias, compatibilidad, servidores y evolución de aplicaciones empresariales."
      canonical="https://javaevolve.com/retos/migracion-java-ee-jakarta-ee/"
    />
  )
}