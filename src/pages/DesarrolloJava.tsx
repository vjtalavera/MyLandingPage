import ServicePage from './ServicePage'
import { bySlug } from '../data/catalog'

export default function DesarrolloJava() {
  return <ServicePage entry={bySlug('desarrollo-java')} />
}
