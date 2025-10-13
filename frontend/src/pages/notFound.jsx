import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const goBack = () => {
        // Navegar hacia atrás en la historia
        navigate(-1);
    };

    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <div className="flex justify-center items-center">
                <div className="bg-orange-main mt-9 px-2 text-white font-semibold text-sm rounded rotate-12 absolute">
                    Page Not Found
                </div>
                <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
            </div>
            <p className="text-2xl text-center text-white font-semibold md:text-3xl">¡Ups! Parece que esta página no existe.</p>
            <button className="mt-5 relative inline-block text-sm font-medium text-orange-main group active:text-orange-500 focus:outline-none focus:ring" onClick={goBack}>
                <span
                    className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-orange-main group-hover:translate-y-0 group-hover:translate-x-0"
                ></span>
                <span className="relative block px-8 py-2 font-bold text-lg bg-[#1A2238] border border-current">
                    Volver
                </span>
            </button>
        </main>
    );
};

export default NotFound;
