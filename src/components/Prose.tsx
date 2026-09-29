import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import type { RichText } from '../data/contentTypes.ts'

/**
 * Renderiza el RichText del catálogo: texto plano, enlaces internos y
 * fragmentos de código.
 *
 * Es el único sitio que traduce el modelo de datos a marcado, para que la
 * copia larga pueda enlazar hacia dentro del sitio sin escribir HTML dentro
 * de los datos.
 */
export function Inline({ value }: { value: RichText }) {
  if (typeof value === 'string') {
    return value
  }

  return (
    <>
      {value.map((segment, position) => {
        // Key por índice a propósito: un mismo fragmento suelto ("y", ", ")
        // se repite dentro de una frase y el texto no sirve de identidad.
        if (typeof segment === 'string') {
          return <Fragment key={position}>{segment}</Fragment>
        }

        if ('code' in segment) {
          return <code key={position}>{segment.code}</code>
        }

        return (
          <Link to={segment.to} key={position}>
            {segment.text}
          </Link>
        )
      })}
    </>
  )
}

/** Lista de párrafos. Key por índice: dos párrafos pueden repetir texto. */
export function Paragraphs({
  value,
  className,
}: {
  value: RichText[]
  className?: string
}) {
  return (
    <>
      {value.map((paragraph, position) => (
        <p className={className} key={position}>
          <Inline value={paragraph} />
        </p>
      ))}
    </>
  )
}
