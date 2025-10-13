import React from "react";
import { Link } from "react-router-dom";
import '../style/login.css';

// Componentes personalizados
import logo from '../img/CAMPUS-SAUCACHE-UTA-4-1024x683.jpg'

export const Home = () => {
    const handleScroll = (e, id) => {
        e.preventDefault();
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <section className="w-full px-8 text-gray-700 bg-white fixed top-0 left-0 right-0 z-50">
                <div className="container flex flex-col flex-wrap items-center justify-between px-2 py-6 sm:py-2 mx-auto md:flex-row max-w-7xl">
                    <div className="relative flex flex-col md:flex-row">
                        <Link
                            to="https://www.uta.cl/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center mb-2 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
                        >
                            <img
                                width="250"
                                height="80"
                                src="https://uninews.datoslab.cl/static/img/universidades/uta.png"
                                className="attachment-large size-large"
                                alt=""
                                loading="lazy"
                                srcSet="https://uninews.datoslab.cl/static/img/universidades/uta.png"
                                sizes="(max-width: 350px) 100vw, 350px"
                            />
                        </Link>


                        <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
                            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
                                <Link to="/#inicio" onClick={(e) => handleScroll(e, 'inicio')} className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Inicio</Link>
                                <Link
                                    to="/#características"
                                    onClick={(e) => handleScroll(e, 'características')}
                                    className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
                                >Características</Link>
                                <Link to="/#privacidad" onClick={(e) => handleScroll(e, 'privacidad')} className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Privacidad</Link>
                            </nav>
                        </div>
                    </div>

                    <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
                        <Link
                            to="/Login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center w-full px-4 py-2 mb-3 text-lg text-white rounded-md border sm:mb-0 sm:w-auto hover:ring-1 hover:font-semibold border-orange-main bg-orange-main hover:text-orange-main hover:ring-orange-main hover:bg-transparent transition duration-200"
                        >
                            Iniciar Sesión
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </Link>
                    </div>
                </div>
            </section>
            <div id="inicio" className="mt-20">
                <section className="px-2 pt-12 pb-6 bg-white md:px-0">
                    <div className="container items-center max-w-6xl px-6 sm:px-20 mx-auto xl:px-5">
                        <div className="flex flex-wrap items-center sm:-mx-3">
                            <div className="w-full md:w-1/2 md:px-3">
                                <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                                    <h1 className="font-extrabold tracking-tight text-gray-900 text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-5xl">
                                        <span className="block xl:inline">Portal Programa </span>
                                        <span className="block text-orange-second xl:inline">Magister en Educación</span>
                                    </h1>
                                    <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">Bienvenido al Portal del Programa de Magíster en Educación de la Universidad de Tarapacá. Explora, aprende y gestiona tu experiencia educativa con nosotros.</p>
                                    <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                                        <Link
                                            to="/Login"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white rounded-md border sm:mb-0 sm:w-auto hover:ring-1 hover:font-semibold border-orange-main bg-orange-main hover:text-orange-main hover:ring-orange-main hover:bg-transparent transition duration-200"
                                        >
                                            Iniciar Sesión
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                        </Link>
                                        <Link to="/politica"
                                            target="_blank"
                                            rel="noopener noreferrer" className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
                                            Leer Política de Privacidad.
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                                    <img loading='lazy'
                                        src={logo}
                                        alt="Logo Uta" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="características" className="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
                    <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">

                        <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
                            <img src="https://us.123rf.com/450wm/porametza/porametza2307/porametza230700188/214001218-grupo-de-estudiantes-juntos-y-sosteniendo-libros-ilustraci%C3%B3n-vectorial-en-estilo-de-dibujos.jpg?ver=6" className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 " />
                        </div>

                        <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
                            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                                Características del Portal
                            </h2>
                            <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                                Nuestro portal proporciona herramientas esenciales para que los estudiantes gestionen sus actividades académicas de manera eficiente y efectiva.
                            </p>
                            <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-orange-main rounded-full"><span className="text-sm font-bold">✓</span></span> Gestión de Proyectos Académicos
                                </li>
                                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-orange-main rounded-full"><span className="text-sm font-bold">✓</span></span> Selección de Linea de Formación
                                </li>
                                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-orange-main rounded-full"><span className="text-sm font-bold">✓</span></span> Inscripción de Asignaturas Electivas
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="privacidad" className="py-20 bg-gray-50">
                    <div className="container items-center max-w-6xl px-10 mx-auto sm:px-20 md:px-32 lg:px-16">
                        <div className="flex flex-wrap items-center -mx-3">
                            <div className="order-1 w-full px-3 lg:w-1/2 lg:order-0">
                                <div className="w-full lg:max-w-md">
                                    <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl font-heading text-gray-900">Uso de Datos del Usuario</h2>
                                    <p className="mb-4 font-medium text-justify tracking-tight text-gray-400 xl:mb-6">Nuestro portal recopila y utiliza datos personales y académicos para mejorar la experiencia del usuario, facilitar la gestión académica y comunicar información importante. Implementamos medidas de seguridad para proteger la información del usuario.</p>
                                    <ul>
                                        <li className="flex items-center py-2 space-x-4 xl:py-3">
                                            <svg className="w-8 h-8 text-orange-main" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
                                            <span className="font-medium text-gray-500">Experiencia Rápida y Eficiente</span>
                                        </li>
                                        <li className="flex items-center py-2 space-x-4 xl:py-3">
                                            <svg className="w-8 h-8 text-orange-main" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                                            <span className="font-medium text-gray-500">Envío de Información y Notificaciones</span>
                                        </li>
                                        <li className="flex items-center py-2 space-x-4 xl:py-3">
                                            <svg className="w-8 h-8 text-orange-main" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                            <span className="font-medium text-gray-500">100% Protección y Seguridad de la Aplicación</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0"><img className="mx-auto max-w-80 sm:max-w-xs" src="https://www.shareicon.net/data/512x512/2016/09/15/829453_user_512x512.png" alt="feature image" /></div>
                        </div>
                    </div>
                </section>
                <footer className="bg-white">
                    <div className="max-w-screen-xl px-4 py-4 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                        <div className="flex justify-center mt-8 space-x-6">
                            <Link
                                to="https://www.uta.cl/index.php/magister-en-educacion/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Dribbble</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};
