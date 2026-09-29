import GuiaPage from './GuiaPage'
import { guideBySlug } from '../../data/guides'

export default function InventarioDependencias() {
  return <GuiaPage guide={guideBySlug('inventario-de-dependencias-antes-de-migrar')} />
}
