import { Link } from 'react-router-dom'

export default function Cookies() {
    return (
        <>
            <section className="legal-page">
                <div className="container legal-content">
                    <p className="eyebrow is-lead">Cookies</p>

                    <h1>Política de Cookies</h1>

                    <h2>1. ¿Qué son las cookies?</h2>

                    <p>
                        Las cookies son pequeños archivos que pueden almacenarse en el
                        dispositivo de la persona usuaria cuando visita un sitio web.
                    </p>

                    <h2>2. Cookies utilizadas por JavaEvolve</h2>

                    <p>
                        JavaEvolve está diseñado para funcionar sin utilizar cookies
                        publicitarias ni cookies de seguimiento de terceros.
                    </p>

                    <p>
                        Si en el futuro se incorporan herramientas de analítica,
                        publicidad, medición o servicios de terceros que utilicen
                        cookies, esta política será actualizada y se incorporarán,
                        cuando corresponda, los mecanismos necesarios para gestionar
                        el consentimiento.
                    </p>

                    <h2>3. Cookies técnicas</h2>

                    <p>
                        Pueden utilizarse mecanismos técnicos necesarios para permitir
                        el funcionamiento y la seguridad del sitio web.
                    </p>

                    <h2>4. Gestión de cookies</h2>

                    <p>
                        La persona usuaria puede configurar las opciones de privacidad
                        de su navegador para bloquear o eliminar cookies.
                    </p>

                    <div className="legal-navigation">
                        <Link to="/aviso-legal/">Aviso Legal</Link>
                        <Link to="/privacidad/">Política de Privacidad</Link>
                    </div>
                </div>
            </section>
        </>
    )
}