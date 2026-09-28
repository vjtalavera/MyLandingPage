import RetoPage from './RetoPage'
import { bySlug } from '../../data/catalog'

export default function JavaLegacy() {
  return <RetoPage entry={bySlug('migracion-java-legacy')} />
}
