import React from "react";
import DocumentCRUD from "../../../../../../components/crud/document/documentCRUD";
import DocumentNavbar from "../../../../../../components/crud/document/navbar/documentNavbar";

export const Document = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/document/',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/document/documents',
    ];


    return (
        <>
            <DocumentNavbar />
            <DocumentCRUD name={'Documento'} urls={urls} title={`Bienvenido a Gestión de Documentos de Estudiante`} subtitle={'Sistema Administrativo'} />
        </>
    )
}
