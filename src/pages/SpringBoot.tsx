import ServicePage from './ServicePage'
import { bySlug } from '../data/catalog'

export default function SpringBoot() {
  return <ServicePage entry={bySlug('spring-boot')} />
}
