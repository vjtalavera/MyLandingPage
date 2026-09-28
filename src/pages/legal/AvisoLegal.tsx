import { Link } from 'react-router-dom'
import { legalData } from './LegalData'

export default function AvisoLegal() {
    return (
        <>
            <section className="legal-page">
                <div className="container legal-content">
                    <p className="eyebrow">INFORMACIÓN LEGAL</p>

                    <h1>Aviso Legal</h1>

                    <h2>1. Titular del sitio web</h2>

                    <p>
                        El presente sitio web, accesible desde{' '}
                        <strong>{legalData.website}</strong>, es titularidad de{' '}
                        <strong>{legalData.titular}</strong>.
                    </p>

                    <p>
                        Correo electrónico:{' '}
                        <a href={`mailto:${legalData.email}`}>
                            {legalData.email}
                        </a>
                    </p>

                    <h2>2. Actividad</h2>

                    <p>
                        JavaEvolve es una marca utilizada para la prestación de
                        servicios profesionales relacionados con el desarrollo de
                        software, desarrollo backend Java, Spring Boot, APIs,
                        mantenimiento y modernización de aplicaciones.
                    </p>

                    <h2>3. Condiciones de uso</h2>

                    <p>
                        El acceso y uso de este sitio web implica la aceptación de
                        las presentes condiciones. La persona usuaria se compromete
                        a utilizar el sitio de forma lícita y conforme a la normativa
                        aplicable.
                    </p>

                    <h2>4. Propiedad intelectual</h2>

                    <p>
                        Los contenidos, diseño, estructura y elementos propios de este
                        sitio web están protegidos por la normativa aplicable en materia
                        de propiedad intelectual e industrial.
                    </p>

                    <h2>5. Contacto</h2>

                    <p>
                        Para cualquier cuestión relacionada con el sitio web puede
                        utilizarse el correo{' '}
                        <a href={`mailto:${legalData.email}`}>
                            {legalData.email}
                        </a>.
                    </p>

                    <div className="legal-navigation">
                        <Link to="/privacidad/">Política de Privacidad</Link>
                        <Link to="/cookies/">Política de Cookies</Link>
                    </div>
                </div>
            </section>
        </>
    )
}