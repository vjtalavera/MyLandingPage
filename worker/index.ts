interface Env {
  ASSETS: Fetcher
  BREVO_API_KEY: string
  BREVO_SENDER_EMAIL: string
  CONTACT_TO_EMAIL: string
}

interface ContactRequest {
  name: string
  email: string
  subject: string
  message: string
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/contact' && request.method === 'POST') {
      return handleContact(request, env)
    }

    return env.ASSETS.fetch(request)
  },
}

async function handleContact(
  request: Request,
  env: Env,
): Promise<Response> {
  try {
    const body = (await request.json()) as Partial<ContactRequest>

    const name = body.name?.trim()
    const email = body.email?.trim()
    const subject = body.subject?.trim()
    const message = body.message?.trim()

    if (!name || !email || !subject || !message) {
      return json(
        { success: false, error: 'Todos los campos son obligatorios.' },
        400,
      )
    }

    if (!isValidEmail(email)) {
      return json(
        { success: false, error: 'El email no es válido.' },
        400,
      )
    }

    const brevoResponse = await fetch(
      'https://api.brevo.com/v3/smtp/email',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'api-key': env.BREVO_API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: {
            email: env.BREVO_SENDER_EMAIL,
          },
          to: [
            {
              email: env.CONTACT_TO_EMAIL,
            },
          ],
          replyTo: {
            email,
            name,
          },
          subject: `[Web] ${subject}`,
          textContent: [
            `Nombre: ${name}`,
            `Email: ${email}`,
            '',
            message,
          ].join('\n'),
        }),
      },
    )

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text()

      console.error('Brevo error:', errorText)

      return json(
        {
          success: false,
          error: 'No se ha podido enviar el mensaje.',
        },
        502,
      )
    }

    return json({ success: true })
  } catch (error) {
    console.error('Contact error:', error)

    return json(
      {
        success: false,
        error: 'Error interno al procesar el formulario.',
      },
      500,
    )
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}