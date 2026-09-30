import { Link } from 'react-router-dom'
import { legalData } from './LegalData'

export default function Privacidad() {
    return (
        <>
            <section className="legal-page">
                <div className="container legal-content">
                    <p className="eyebrow is-lead">Protección de datos</p>

                    <h1>Política de Privacidad</h1>

                    <h2>1. Responsable del tratamiento</h2>

                    <p>
                        Responsable: <strong>{legalData.titular}</strong>
                    </p>

                    <p>
                        Correo electrónico:{' '}
                        <a href={`mailto:${legalData.privacyEmail}`}>
                            {legalData.privacyEmail}
                        </a>
                    </p>

                    <h2>2. Datos tratados</h2>

                    <p>
                        A través del formulario de contacto pueden tratarse los datos
                        que la persona usuaria facilite voluntariamente, principalmente
                        nombre, dirección de correo electrónico, asunto y contenido
                        del mensaje.
                    </p>

                    <p>
                        El formulario incluye además un campo de teléfono de carácter
                        opcional, que se trata únicamente para responder por esa vía
                        si la persona interesada lo prefiere. Dejarlo en blanco no
                        impide el envío del mensaje.
                    </p>

                    <h2>3. Finalidad</h2>

                    <p>
                        Los datos se utilizan para atender consultas, solicitudes de
                        información y comunicaciones relacionadas con los servicios
                        ofrecidos a través de JavaEvolve.
                    </p>

                    <h2>4. Base jurídica</h2>

                    <p>
                        La base jurídica del tratamiento será la gestión de la
                        solicitud realizada por la persona interesada y, cuando
                        corresponda, la adopción de medidas precontractuales.
                    </p>

                    <h2>5. Destinatarios</h2>

                    <p>
                        Para gestionar las comunicaciones del formulario puede
                        utilizarse un proveedor externo de servicios de correo
                        electrónico transaccional.
                    </p>

                    <p>
                        Actualmente se utiliza Brevo para el envío de los mensajes
                        generados mediante el formulario de contacto.
                    </p>

                    <h2>6. Conservación</h2>

                    <p>
                        Los datos se conservarán durante el tiempo necesario para
                        atender la solicitud y, cuando resulte aplicable, durante los
                        plazos exigidos por las obligaciones legales correspondientes.
                    </p>

                    <h2>7. Derechos</h2>

                    <p>
                        La persona interesada puede solicitar el acceso, rectificación,
                        supresión, limitación u oposición al tratamiento de sus datos,
                        así como ejercer los demás derechos reconocidos por la
                        normativa aplicable.
                    </p>

                    <p>
                        Para ejercer estos derechos puede contactar mediante:{' '}
                        <a href={`mailto:${legalData.privacyEmail}`}>
                            {legalData.privacyEmail}
                        </a>.
                    </p>

                    <h2>8. Autoridad de control</h2>

                    <p>
                        La persona interesada tiene derecho a presentar una reclamación
                        ante la Agencia Española de Protección de Datos cuando considere
                        que el tratamiento de sus datos no se ajusta a la normativa.
                    </p>

                    <div className="legal-navigation">
                        <Link to="/aviso-legal/">Aviso Legal</Link>
                        <Link to="/cookies/">Política de Cookies</Link>
                    </div>
                </div>
            </section>
        </>
    )
}