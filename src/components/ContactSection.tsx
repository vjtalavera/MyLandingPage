import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { OFFER } from '../data/offer'

/**
 * Formulario de contacto. Envía a POST /api/contact, que reenvía el mensaje
 * por Brevo desde el worker. El contrato con el worker (nombres de campo,
 * honeypot `website` y forma de la respuesta) no debe cambiar.
 *
 * `phone` es opcional y el worker lo añade al cuerpo del correo: si se quita
 * de aquí o se renombra, el teléfono deja de llegar.
 */

/** Opciones de "Qué necesitas". Son los servicios y retos del catálogo, en
 *  palabras de quien escribe; "Otro" cubre el resto. */
const SUBJECTS = [
  'Migración de Java 8 a Java 17 / 21',
  'Migración de Java EE a Jakarta EE',
  'Migración o actualización de Spring Boot',
  'Desarrollo nuevo en Java o Spring Boot',
  'API REST nueva o evolución de una existente',
  'Otro',
]

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'subject' | 'message', string>>

function validate(data: FormData): Errors {
  const errors: Errors = {}
  const name = String(data.get('name') ?? '').trim()
  const email = String(data.get('email') ?? '').trim()
  const phone = String(data.get('phone') ?? '').trim()
  const subject = String(data.get('subject') ?? '').trim()
  const message = String(data.get('message') ?? '').trim()

  if (name.length < 2) {
    errors.name = 'Escribe tu nombre.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = 'Revisa el email: no parece una dirección válida.'
  }

  if (phone && !/^[+()\d\s.-]{7,20}$/.test(phone)) {
    errors.phone = 'El teléfono solo admite números, espacios y los signos + ( ) - .'
  }

  if (subject.length < 3) {
    errors.subject = 'Elige qué necesitas.'
  }

  if (message.length < 20) {
    errors.message = 'Cuéntame un poco más: al menos 20 caracteres.'
  }

  return errors
}

export default function ContactSection() {
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState('')
  const [ok, setOk] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const resultRef = useRef<HTMLParagraphElement>(null)

  // Al aparecer el resultado se mueve el foco: así lo anuncia el lector de
  // pantalla y queda a la vista sin tener que buscarlo.
  useEffect(() => {
    if (result) {
      resultRef.current?.focus()
    }
  }, [result])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (sending) {
      return
    }

    const form = event.currentTarget

    // El FormData se lee ANTES de deshabilitar el fieldset: los campos
    // deshabilitados no se serializan.
    const formData = new FormData(form)
    const found = validate(formData)

    setErrors(found)

    if (Object.keys(found).length > 0) {
      setOk(false)
      setResult('Revisa los campos marcados.')
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }

    setSending(true)
    setResult('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          website: formData.get('website'),
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setOk(true)
        setResult(
          `Mensaje enviado. Te respondo en ${OFFER.responseTime} a la dirección que has indicado.`,
        )
        form.reset()
      } else {
        setOk(false)
        setResult(data.error || 'No se ha podido enviar el mensaje.')
      }
    } catch {
      setOk(false)
      setResult('No se ha podido conectar con el servidor.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contacto" className="contact section">
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">Contacto</p>

          <h2>Pide tu diagnóstico gratuito</h2>

          <p>
            Cuéntame el caso en unas líneas. La llamada dura {OFFER.duration},
            no tiene coste y no te compromete a nada.
          </p>

          {/*
            Lo que pasa después de enviar. Va aquí y no en el mensaje de
            éxito porque la duda ("¿y luego qué?") la tiene quien aún no ha
            escrito. Los compromisos salen de OFFER, no se escriben a mano.
          */}
          <h3 className="contact-steps-title">Qué pasa después</h3>

          <ol className="contact-steps">
            <li>
              Te respondo en {OFFER.responseTime}, con preguntas concretas o
              una propuesta de hora.
            </li>
            <li>
              Hablamos {OFFER.duration}: versión de Java, framework, servidor y
              qué duele hoy. Si no puedo ayudarte, te lo digo.
            </li>
            <li>
              Si tiene sentido seguir, te envío una propuesta de análisis con
              alcance y precio cerrados. Sin compromiso de continuidad.
            </li>
          </ol>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="honeypot"
            aria-hidden="true"
          />

          <fieldset disabled={sending}>
            <legend className="sr-only">Datos de contacto</legend>

            {/* Nombre y email comparten fila en escritorio: el formulario
                pierde alto sin perder campos. */}
            <div className="field-row">
              <div className="field">
                <label htmlFor="contacto-nombre">
                  Nombre <abbr title="obligatorio">*</abbr>
                </label>

                <input
                  id="contacto-nombre"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? 'contacto-nombre-error' : undefined}
                />

                {errors.name && (
                  <p className="field-error" id="contacto-nombre-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="contacto-email">
                  Email <abbr title="obligatorio">*</abbr>
                </label>

                <input
                  id="contacto-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={
                    errors.email
                      ? 'contacto-email-ayuda contacto-email-error'
                      : 'contacto-email-ayuda'
                  }
                />

                <p className="field-hint" id="contacto-email-ayuda">
                  Te respondo a esta dirección.
                </p>

                {errors.email && (
                  <p className="field-error" id="contacto-email-error">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="field">
              <label htmlFor="contacto-asunto">
                Qué necesitas <abbr title="obligatorio">*</abbr>
              </label>

              {/*
                Sigue siendo el campo `subject` y llega igual al worker, que
                lo pone en el asunto del correo: así el buzón recibe los
                mensajes ya clasificados. La opción vacía NO va `disabled` a
                propósito: con ella deshabilitada, `form.reset()` dejaría
                seleccionada la primera opción real en vez de volver al
                estado inicial.
              */}
              <select
                id="contacto-asunto"
                name="subject"
                required
                defaultValue=""
                aria-invalid={errors.subject ? true : undefined}
                aria-describedby={errors.subject ? 'contacto-asunto-error' : undefined}
              >
                <option value="">Elige una opción</option>
                {SUBJECTS.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>

              {errors.subject && (
                <p className="field-error" id="contacto-asunto-error">
                  {errors.subject}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="contacto-mensaje">
                Mensaje <abbr title="obligatorio">*</abbr>
              </label>

              <textarea
                id="contacto-mensaje"
                name="message"
                rows={6}
                maxLength={4000}
                placeholder="Ej.: Java 8 y Spring 4 sobre JBoss EAP 6, ocho módulos Maven. Queremos llegar a Java 21 sin parar el servicio."
                required
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={
                  errors.message
                    ? 'contacto-mensaje-ayuda contacto-mensaje-error'
                    : 'contacto-mensaje-ayuda'
                }
              />

              <p className="field-hint" id="contacto-mensaje-ayuda">
                Para que la respuesta sea útil: versión de Java y de Spring o
                Java EE, servidor de aplicaciones, cuántos módulos o servicios
                hay y qué te está bloqueando.
              </p>

              {errors.message && (
                <p className="field-error" id="contacto-mensaje-error">
                  {errors.message}
                </p>
              )}
            </div>

            {/* El teléfono, opcional, va al final: quien no quiere darlo no
                tiene que saltárselo a mitad del formulario. */}
            <div className="field">
              <label htmlFor="contacto-telefono">
                Teléfono <span className="field-optional">(opcional)</span>
              </label>

              <input
                id="contacto-telefono"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                maxLength={20}
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={
                  errors.phone
                    ? 'contacto-telefono-ayuda contacto-telefono-error'
                    : 'contacto-telefono-ayuda'
                }
              />

              <p className="field-hint" id="contacto-telefono-ayuda">
                Solo si prefieres que te llame en lugar de escribirte.
              </p>

              {errors.phone && (
                <p className="field-error" id="contacto-telefono-error">
                  {errors.phone}
                </p>
              )}
            </div>
          </fieldset>

          <button className="button primary" type="submit" disabled={sending}>
            {sending ? 'Enviando…' : OFFER.cta}
          </button>

          {result && (
            <p
              ref={resultRef}
              tabIndex={-1}
              className={ok ? 'form-result is-ok' : 'form-result is-error'}
              role={ok ? 'status' : 'alert'}
            >
              {result}
            </p>
          )}

          <p className="form-privacy">
            Al enviar este formulario, la información facilitada será tratada
            para atender tu solicitud. Puedes consultar la{' '}
            <Link to="/privacidad/">Política de Privacidad</Link>.
          </p>
        </form>
      </div>
    </section>
  )
}
