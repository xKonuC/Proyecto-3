import React from "react";
import AcademicInfoCRUD from "../../../../../components/crud/handleAcademicRecord/academicInfo/academicInfoCRUD";

export const AcademicInfo = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/handleAcademicRecord/academicInfo',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/academicHasTitle',
    ];

    return (
        <>
            <AcademicInfoCRUD name={'Ficha'} urls={urls} title={`Bienvenido a Gestión de Ficha Académica`} subtitle={'Sistema Administrativo'} />
        </>
        )
}
