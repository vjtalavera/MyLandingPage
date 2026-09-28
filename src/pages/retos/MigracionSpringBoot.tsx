import RetoPage from './RetoPage'
import { bySlug } from '../../data/catalog'

export default function MigracionSpringBoot() {
  return <RetoPage entry={bySlug('migracion-spring-boot')} />
}
