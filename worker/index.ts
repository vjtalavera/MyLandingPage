interface Env {
  CONTACT_TO: string;
  TURNSTILE_SECRET_KEY: string;
}

export default {
  async fetch(
    request: Request,
    env: Env
  ): Promise<Response> {

    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", {
          status: 405,
        });
      }

      return handleContact(request, env);
    }

    return new Response(null, {
      status: 404,
    });
  },
};

async function handleContact(
  request: Request,
  env: Env
): Promise<Response> {

  const body = await request.json();

  return Response.json({
    success: true,
    message: "Contacto recibido",
  });
}