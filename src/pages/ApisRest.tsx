import ServicePage from './ServicePage'
import { bySlug } from '../data/catalog'

export default function ApisRest() {
  return <ServicePage entry={bySlug('apis-rest')} />
}
