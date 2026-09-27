import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

function App() {
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<string>('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSending(true)
    setResult('')

    const form = event.currentTarget
    const formData = new FormData(form)

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
      }),
    })

    const data = await response.json()

    if (response.ok && data.success) {
      setResult('Mensaje enviado correctamente.')
      form.reset()
    } else {
      setResult(data.error || 'No se ha podido enviar el mensaje.')
    }

    setSending(false)
  }

  return (
      <main>
        <h1>Mi Landing Page</h1>

        <form onSubmit={handleSubmit}>
          <input
              name="name"
              type="text"
              placeholder="Nombre"
              required
          />

          <input
              name="email"
              type="email"
              placeholder="Email"
              required
          />

          <input
              name="subject"
              type="text"
              placeholder="Asunto"
              required
          />

          <textarea
              name="message"
              placeholder="Mensaje"
              rows={6}
              required
          />

          <button type="submit" disabled={sending}>
            {sending ? 'Enviando...' : 'Enviar mensaje'}
          </button>

          {result && <p>{result}</p>}
        </form>
      </main>
  )
}

export default App