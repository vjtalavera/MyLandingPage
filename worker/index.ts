interface Env {
  BREVO_API_KEY: string;
  BREVO_SENDER_EMAIL: string;
  CONTACT_TO_EMAIL: string;
}

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const body = (await request.json()) as ContactRequest;

        // Protección anti-spam: honeypot
        if (body.website) {
          return new Response(
            JSON.stringify({
              ok: false,
              error: "Solicitud no válida",
            }),
            {
              status: 400,
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        }

        // Validación básica
        if (
          !body.name?.trim() ||
          !body.email?.trim() ||
          !body.subject?.trim() ||
          !body.message?.trim()
        ) {
          return new Response(
            JSON.stringify({
              ok: false,
              error: "Todos los campos son obligatorios",
            }),
            {
              status: 400,
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        }

        const brevoResponse = await fetch(
          "https://api.brevo.com/v3/smtp/email",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "api-key": env.BREVO_API_KEY,
              "content-type": "application/json",
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
                email: body.email,
                name: body.name,
              },
              subject: `[Web] ${body.subject}`,
              textContent: `
Nombre: ${body.name}
Email: ${body.email}

Mensaje:
${body.message}
              `.trim(),
            }),
          },
        );

        if (!brevoResponse.ok) {
          const errorText = await brevoResponse.text();

          console.error("Brevo error:", errorText);

          return new Response(
            JSON.stringify({
              ok: false,
              error: "No se ha podido enviar el mensaje",
            }),
            {
              status: 500,
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        }

        return new Response(
          JSON.stringify({
            ok: true,
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      } catch (error) {
        console.error("Contact error:", error);

        return new Response(
          JSON.stringify({
            ok: false,
            error: "Solicitud no válida",
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }
    }

    return new Response("Not Found", {
      status: 404,
    });
  },
};
