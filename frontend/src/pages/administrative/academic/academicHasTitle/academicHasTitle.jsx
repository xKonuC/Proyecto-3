import React from "react";
import AcademicHasTitleCRUD from "../../../../components/crud/handleTitle/academicHasTitle/academicHasTitleCRUD";
import AcademicHasTitleNavbar from "../../../../components/crud/handleTitle/academicHasTitle/navbar/academicHasTitleNavbar";

export const AcademicHasTitle = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/academicHasTitle',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/academicHasTitle/title',
    ];

    return (
        <>
            <AcademicHasTitleNavbar />
            <AcademicHasTitleCRUD name={'Titulación'} urls={urls} title={`Bienvenido a Gestión de Títulos`} subtitle={'Sistema Administrativo'} />
        </>
        )
}
