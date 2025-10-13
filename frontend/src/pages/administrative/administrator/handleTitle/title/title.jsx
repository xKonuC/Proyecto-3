import React from "react";
import TitleCRUD from "../../../../../components/crud/handleTitle/title/titleCRUD";
import TitleNavbar from "../../../../../components/crud/handleTitle/title/navbar/titleNavbar";

export const Title = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleTitle/title/',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleTitle/title/degree',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleTitle/title/university',
    ];


    return (
        <>
            <TitleNavbar />
            <TitleCRUD name={'Titulo'} urls={urls} title={`Gestión de Títulos`} subtitle={'Sistema Administrativo'} />
        </>
    )
}
