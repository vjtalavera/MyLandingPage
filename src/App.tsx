import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

function App() {
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState('')

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
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setResult('Mensaje enviado correctamente.')
        form.reset()
      } else {
        setResult(data.error || 'No se ha podido enviar el mensaje.')
      }
    } catch {
      setResult('No se ha podido conectar con el servidor.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="site">
      <header className="header">
        <div className="container header-inner">
          <a className="logo" href="#">
            Java<span>Evolve</span>
          </a>

          <nav>
            <a href="#servicios">Servicios</a>
            <a href="#tecnologias">Tecnologías</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">JAVA · BACKEND · MODERNIZACIÓN</p>

              <h1>
                Soluciones Java para
                <span> sistemas que necesitan evolucionar.</span>
              </h1>

              <p className="hero-text">
                Desarrollo backend, Spring Boot, modernización de aplicaciones
                legacy y nuevas funcionalidades para sistemas empresariales.
              </p>

              <a className="button primary" href="#contacto">
                Hablemos de tu proyecto
              </a>
            </div>

            <div className="code-card">
              <div className="code-header">
                <span />
                <span />
                <span />
              </div>

              <pre>{`@Service
public class EvolutionService {

    public System evolve(System legacy) {
        return modernize(legacy);
    }
}`}</pre>
            </div>
          </div>
        </section>

        <section id="servicios" className="section">
          <div className="container">
            <p className="eyebrow">SERVICIOS</p>
            <h2>Desarrollo y evolución de aplicaciones Java</h2>

            <div className="cards">
              <article className="card">
                <h3>Java & Spring Boot</h3>
                <p>
                  Desarrollo de aplicaciones backend, APIs REST y servicios
                  empresariales con Java y Spring Boot.
                </p>
              </article>

              <article className="card">
                <h3>Modernización Legacy</h3>
                <p>
                  Evolución progresiva de aplicaciones Java antiguas,
                  reduciendo deuda técnica y facilitando su mantenimiento.
                </p>
              </article>

              <article className="card">
                <h3>Refactorización</h3>
                <p>
                  Mejora de código existente aplicando principios de Clean
                  Code, SOLID, diseño y buenas prácticas.
                </p>
              </article>

              <article className="card">
                <h3>Nuevas funcionalidades</h3>
                <p>
                  Análisis y desarrollo de nuevas capacidades integradas en
                  aplicaciones empresariales existentes.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="tecnologias" className="section technologies">
          <div className="container">
            <p className="eyebrow">TECNOLOGÍAS</p>
            <h2>Stack orientado a backend empresarial</h2>

            <div className="tech-list">
              <span>Java</span>
              <span>Spring Boot</span>
              <span>Spring Framework</span>
              <span>REST APIs</span>
              <span>J2EE / Jakarta EE</span>
              <span>Hibernate</span>
              <span>SQL</span>
              <span>Git</span>
              <span>Microservices</span>
            </div>
          </div>
        </section>

        <section id="contacto" className="section contact">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">CONTACTO</p>

              <h2>Cuéntame qué necesitas construir o modernizar.</h2>

              <p>
                Explícame brevemente tu proyecto, aplicación actual o
                necesidad técnica y te responderé.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Nombre
                <input name="name" type="text" required />
              </label>

              <label>
                Email
                <input name="email" type="email" required />
              </label>

              <label>
                Asunto
                <input name="subject" type="text" required />
              </label>

              <label>
                Mensaje
                <textarea name="message" rows={6} required />
              </label>

              <button className="button primary" type="submit" disabled={sending}>
                {sending ? 'Enviando...' : 'Enviar mensaje'}
              </button>

              {result && <p className="form-result">{result}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <strong>JavaEvolve</strong>
          <span>Java · Backend · Modernización</span>
        </div>
      </footer>
    </div>
  )
}

export default App