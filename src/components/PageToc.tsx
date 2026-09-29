import type { ContentBlock } from '../data/contentTypes.ts'

/**
 * Índice de la página. Es el único consumidor de los `id` de los bloques, y
 * lo que hace navegable una página de 1.500 palabras en móvil.
 *
 * Con menos de tres secciones estorba más de lo que ayuda, así que no se pinta.
 */
export default function PageToc({ blocks }: { blocks: ContentBlock[] }) {
  if (blocks.length < 3) {
    return null
  }

  return (
    <nav className="page-toc" aria-label="Contenido de la página">
      <ol>
        {blocks.map((block) => (
          <li key={block.id}>
            <a href={`#${block.id}`}>{block.heading}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
