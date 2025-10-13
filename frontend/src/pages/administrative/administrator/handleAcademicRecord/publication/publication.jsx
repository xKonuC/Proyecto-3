import React from "react";
import PublicationCRUD from "../../../../../components/crud/handleAcademicRecord/publication/publicationCRUD";
import PublicationNavbar from "../../../../../components/crud/handleAcademicRecord/publication/navbar/publicationNavbar";

export const Publication = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleAcademicRecord/publication',
    ];

    return (
        <>
            <PublicationNavbar />
            <PublicationCRUD name={'Publicación'} urls={urls} title={`Bienvenido a Gestión de Publicaciones`} subtitle={'Sistema Administrativo'} />
        </>
        )
}
