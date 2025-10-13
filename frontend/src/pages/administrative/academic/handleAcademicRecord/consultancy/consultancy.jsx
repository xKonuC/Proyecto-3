import React from "react";
import ConsultancyCRUD from "../../../../../components/crud/handleAcademicRecord/consultancy/consultancyCRUD";
import ConsultancyNavbar from "../../../../../components/crud/handleAcademicRecord/consultancy/navbar/consultancyNavbar";

export const Consultancy = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/handleAcademicRecord/consultancy',
    ];

    return (
        <>
            <ConsultancyNavbar />
            <ConsultancyCRUD name={'Consultoría'} urls={urls} title={`Bienvenido a Gestión de Consultorías y Asistencias Técnicas`} subtitle={'Sistema Administrativo'} />
        </>
        )
}
