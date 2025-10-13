import React from "react";
import StudentHasTitleCRUD from "../../../../../../components/crud/handleTitle/studentHasTitle/studentHasTitleCRUD";
import StudentHasTitleNavbar from "../../../../../../components/crud/handleTitle/studentHasTitle/navbar/studentHasTitleNavbar";

export const StudentHasTitle = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleTitle/studentHasTitle',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleTitle/title',
    ];

    return (
        <>
            <StudentHasTitleNavbar />
            <StudentHasTitleCRUD name={'Titulación'} urls={urls} title={`Bienvenido a Gestión de Título del Estudiante`} subtitle={'Sistema Administrativo'} />
        </>    
        )
}
