import React from "react";
import PatentCRUD from "../../../../../components/crud/handleAcademicRecord/patent/patentCRUD";
import PatentNavbar from "../../../../../components/crud/handleAcademicRecord/patent/navbar/patentNavbar";

export const Patent = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleAcademicRecord/patent',
    ];

    return (
        <>
            <PatentNavbar />
            <PatentCRUD name={'Patente'} urls={urls} title={`Bienvenido a Gestión de Patentes`} subtitle={'Sistema Administrativo'} />
        </>
        )
}
