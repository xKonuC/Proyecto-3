import React from 'react';
import { FaUserSecret, FaLock, FaEnvelope, FaFileAlt, FaShieldAlt } from 'react-icons/fa';

const PrivacyPolicy = () => {

    return (
        <section className="bg-gray-900 text-white py-7 min-h-screen">
            <div className="my-10 mx-20 max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div className="mx-auto max-w-5xl text-center mb-6">
                    <h1 className="text-3xl font-bold sm:text-5xl">Política de Privacidad</h1>
                    <p className="mt-4 text-gray-300">
                        Esta política de privacidad esta corresponde al Sistema de Programa de Magíster en Educación.
                    </p>
                </div>

                <h2 className="mt-4 text-2xl font-bold text-white">1. Resposabilidad del tratamiento</h2>
                <p className="mt-1 text-sm text-gray-300">
                    La Institución Responsable del Tratamiento de los datos personales es el Programa de Magíster en Educación de la Universidad de Tarapacá.
                </p>
                <h2 className="mt-4 text-2xl font-bold text-white">2. Datos Personales Recopilados</h2>
                <p className="mt-1 text-sm text-gray-300">
                    Los datos personales recopilados son: Dirección del correo electrónico, nombre, apellidos.
                </p>
                <h2 className="mt-4 text-2xl font-bold text-white">3. Finalidad del Tratamiento de Datos</h2>
                <p className="mt-1 text-sm text-gray-300">
                    Los datos personales se recopilan con la siguiente finalidad:
                    Gestión de Cuentas de Usuario: Creación y administración de cuentas.
                </p>
                <h2 className="mt-4 text-2xl font-bold text-white">4. Consentimiento del Usuario</h2>
                <p className="mt-1 text-sm text-gray-300">
                    El usuario otorga su consentimiento explícito al utilizar el sistema y aceptar esta política de privacidad.
                </p>
                <h2 className="mt-4 text-2xl font-bold text-white">5. Derechos de los Usuarios</h2>
                <p className="mt-1 text-sm text-gray-300">
                    Los usuarios tienen derecho a: Acceso: Solicitar información sobre los datos personales recopilados. Rectificación: Corregir datos inexactos o incompletos.
                </p>
                <h2 className="mt-4 text-2xl font-bold text-white">6. Acceso al Sistema</h2>
                <p className="mt-1 text-sm text-gray-300">
                    Para todo el uso del sistema se debe tener en cuenta que se limitará a los usuarios respecto a la disponibilidad en: postgrado.educ.uta.cl
                </p>
                <h2 className="mt-4 text-2xl font-bold text-white">7. Seguridad y Retención de Datos</h2>
                <p className="mt-1 text-sm text-gray-300">
                    Tomamos medidas para proteger los datos personales. Los datos se conservarán durante el tiempo necesario para cumplir con las finalidades mencionadas.
                </p>
                <h2 className="mt-4 text-2xl font-bold text-white">8. Contacto</h2>
                <p className="mt-1 text-sm text-gray-300">
                    Si tienes preguntas o deseas ejercer tus derechos, contáctanos a través de webmagisteruta@gmail.com
                </p>
            </div>
        </section>
    );
}

export default PrivacyPolicy;
