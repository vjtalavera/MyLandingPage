import { Inline, Paragraphs } from './Prose.tsx'
import type { ContentBlock } from '../data/contentTypes.ts'

/**
 * Cuerpo largo de una página de servicio o de reto.
 *
 * El `id` va en la <section> y no en el <h2> para que, al saltar desde el
 * índice, el encabezado no quede pegado al borde superior.
 */
export default function ContentSections({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, position) => (
        <section
          className={
            position % 2 === 1
              ? 'section content-section content-section--alt'
              : 'section content-section'
          }
          id={block.id}
          key={block.id}
        >
          <div className="container">
            <h2>{block.heading}</h2>

            {block.intro ? (
              <p className="content-intro">
                <Inline value={block.intro} />
              </p>
            ) : null}

            <BlockBody block={block} />
          </div>
        </section>
      ))}
    </>
  )
}

/** Un `switch` exhaustivo: añadir un tipo de bloque obliga a cubrirlo aquí. */
function BlockBody({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'prose':
      return <Paragraphs value={block.body} className="content-paragraph" />

    case 'table':
      return (
        <>
          {/* El `aria-label` es obligatorio: sin él, el `tabIndex` deja un
              punto de tabulación sin nombre para quien navega con teclado. */}
          <div
            className="table-scroll"
            role="region"
            aria-label={block.caption}
            tabIndex={0}
          >
            <table className="content-table">
              <caption>{block.caption}</caption>

              <thead>
                <tr>
                  {block.columns.map((column) => (
                    <th scope="col" key={column}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.header}>
                    <th scope="row">{row.header}</th>

                    {row.cells.map((cell, position) => (
                      <td key={position}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {block.note ? (
            <p className="content-note">
              <Inline value={block.note} />
            </p>
          ) : null}
        </>
      )

    case 'errors':
      return (
        <div className="error-list">
          {block.items.map((item) => (
            <article className="error-card" key={item.signature}>
              <h3>
                <code>{item.signature}</code>
              </h3>

              <p>
                <b>Causa:</b> <Inline value={item.cause} />
              </p>

              <p>
                <b>Qué se hace:</b> <Inline value={item.fix} />
              </p>
            </article>
          ))}
        </div>
      )

    case 'steps':
      return (
        <ol className="content-steps">
          {block.items.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>

              <p>
                <Inline value={item.body} />
              </p>
            </li>
          ))}
        </ol>
      )

    case 'checklist':
      return (
        <>
          <ul className="service-list">
            {block.items.map((item, position) => (
              <li key={position}>
                <Inline value={item} />
              </li>
            ))}
          </ul>

          {block.outro ? (
            <p className="content-paragraph">
              <Inline value={block.outro} />
            </p>
          ) : null}
        </>
      )
  }
}
