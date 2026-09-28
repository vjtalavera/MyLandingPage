import ServicePage from './ServicePage'
import { bySlug } from '../data/catalog'

export default function ModernizacionJava() {
  return <ServicePage entry={bySlug('modernizacion-java')} />
}
