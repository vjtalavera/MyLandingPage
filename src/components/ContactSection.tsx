import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

/**
 * Formulario de contacto. Envía a POST /api/contact, que reenvía el mensaje
 * por Brevo desde el worker. El contrato con el worker (nombres de campo,
 * honeypot `website` y forma de la respuesta) no debe cambiar.
 */
export default function ContactSection() {
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState('')
  const [ok, setOk] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSending(true)
    setResult('')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          website: formData.get('website'),
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setOk(true)
        setResult('Mensaje enviado correctamente.')
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
          <p className="eyebrow">CONTACTO</p>

          <h2>Cuéntame qué necesitas construir o modernizar.</h2>

          <p>
            ¿Tienes una aplicación Java que necesita evolucionar, una nueva
            funcionalidad que desarrollar o un proyecto backend que quieres
            poner en marcha?
          </p>

          <p>
            Explícame brevemente el caso y podremos valorar el siguiente paso.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="honeypot"
            aria-hidden="true"
          />

          <label>
            Nombre
            <input name="name" type="text" autoComplete="name" required />
          </label>

          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>

          <label>
            Asunto
            <input name="subject" type="text" required />
          </label>

          <label>
            Mensaje
            <textarea
              name="message"
              rows={6}
              placeholder="Cuéntame brevemente qué necesitas..."
              required
            />
          </label>

          <button className="button primary" type="submit" disabled={sending}>
            {sending ? 'Enviando...' : 'Enviar consulta'}
          </button>

          {result && (
            <p
              className={ok ? 'form-result is-ok' : 'form-result is-error'}
              role="status"
              aria-live="polite"
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
