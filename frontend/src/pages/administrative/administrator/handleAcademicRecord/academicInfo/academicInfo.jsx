import React from "react";
import AcademicInfoCRUD from "../../../../../components/crud/handleAcademicRecord/academicInfo/academicInfoCRUD";

export const AcademicInfo = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleAcademicRecord/academicInfo',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleTitle/academicHasTitle',
    ];

    return (
        <>
            <AcademicInfoCRUD name={'Ficha'} urls={urls} title={`Bienvenido a Administración de Ficha`} subtitle={'Sistema Administrativo'} />
        </>
        )
}
