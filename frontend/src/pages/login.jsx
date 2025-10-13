import React, { Suspense, lazy } from "react";
import '../style/login.css';

// Componentes personalizados
import LoginLoader from '../components/loader/loginLoader';
import logo from '../img/logo-uta2.png'

// Lazy-loaded LoginContainer
const HandleLogin = lazy(() => import('../components/crud/handleAuth/handleLogin'));

export const Login = () => {
    return (
        <>
            <Suspense fallback={<LoginLoader />}>
                <div className="flex items-center justify-center h-screen min-w-screen py-8 bg-gradient-to-b from-orange-main to-orange-thirty">
                    <div className="bg-white flex items-center justify-center py-10 sm:py-0 w-11/12 sm:w-9/12 h-full login-container shadow-md">
                        <div className="w-10/12 sm:w-7/12 flex flex-col items-start sm:items-center justify-center bg-white login-container">
                            <div className="w-full sm:w-8/12 space-y-4 sm:space-y-6">
                                <div className="text-center space-y-3">
                                    <p className="font-bold text-4xl sm:text-5xl text-gray-900">
                                        Inicio de Sesión
                                    </p>
                                    <p className="font-light text-sm sm:text-base text-gray-500">
                                        Bienvenido, inicia sesión para acceder a todas las herramientas.
                                    </p>
                                </div>
                                <HandleLogin />
                            </div>
                        </div>
                        <section className="w-5/12 h-full toggle-container hidden md:flex flex-col justify-center items-center text-center text-white bg-gray-900 p-14 space-y-8">
                            <img
                                className="mx-auto"
                                loading='lazy'
                                src={logo}
                                alt="Logo Uta"
                            />
                            <div className="flex flex-col items-center space-y-4">
                                <h1 className="text-2xl font-bold">Programa de Magister en Educación</h1>
                            </div>
                        </section>

                    </div>
                </div>
            </Suspense >
        </>
    );
};
