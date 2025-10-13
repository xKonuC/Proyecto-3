import React from "react";
import UniversityCRUD from "../../../../../components/crud/handleTitle/university/universityCRUD";
import UniversityNavbar from "../../../../../components/crud/handleTitle/university/navbar/universityNavbar";

export const University = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleTitle/university/',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleTitle/university/degree',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleTitle/university/university',
    ];


    return (
        <>
            <UniversityNavbar />
            <UniversityCRUD name={'Universidad'} urls={urls} title={`Bienvenido a Gestión de Universidades`} subtitle={'Sistema Administrativo'} />
        </>
    )
}
