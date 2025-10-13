import React from "react";
import AcademicCRUD from "../../../../../components/crud/handleUser/academic/academicCRUD";
import AcademicNavbar from "../../../../../components/crud/handleUser/academic/navbar/academicNavbar";

export const Academic = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/roleAssignment/user/',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/roleAssignment/userHasRole/academic',
        '/Administrative/Administrator/AcademicHasTItle/'
    ];


    return (
        <>
            <AcademicNavbar urls={urls} />
            <AcademicCRUD name={'Académico'} urls={urls} title={`Bienvenido a Gestión de Académicos`} subtitle={'Sistema Administrativo'} />
        </>
    )
}
