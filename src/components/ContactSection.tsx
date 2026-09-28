import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

/**
 * Formulario de contacto. Envía a POST /api/contact, que reenvía el mensaje
 * por Brevo desde el worker. El contrato con el worker (nombres de campo,
 * honeypot `website` y forma de la respuesta) no debe cambiar.
 *
 * `phone` es opcional y el worker lo añade al cuerpo del correo: si se quita
 * de aquí o se renombra, el teléfono deja de llegar.
 */

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
    errors.subject = 'Indica brevemente el asunto.'
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
        setResult('Mensaje enviado correctamente. Te respondo en breve.')
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

          <h2>Cuéntame qué necesitas construir o modernizar.</h2>

          <p>
            ¿Tienes una aplicación Java que necesita evolucionar, una nueva
            funcionalidad que desarrollar o un proyecto backend que quieres
            poner en marcha?
          </p>

          <p>
            Explícame brevemente el caso y te digo si puedo ayudarte y cómo.
          </p>
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

            <div className="field">
              <label htmlFor="contacto-asunto">
                Asunto <abbr title="obligatorio">*</abbr>
              </label>

              <input
                id="contacto-asunto"
                name="subject"
                type="text"
                required
                aria-invalid={errors.subject ? true : undefined}
                aria-describedby={errors.subject ? 'contacto-asunto-error' : undefined}
              />

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
                placeholder="Versión de Java, framework, qué te está bloqueando..."
                required
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? 'contacto-mensaje-error' : undefined}
              />

              {errors.message && (
                <p className="field-error" id="contacto-mensaje-error">
                  {errors.message}
                </p>
              )}
            </div>
          </fieldset>

          <button className="button primary" type="submit" disabled={sending}>
            {sending ? 'Enviando...' : 'Enviar consulta'}
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
