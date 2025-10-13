import React from "react";
import ProjectCRUD from "../../../../../components/crud/handleAcademicRecord/project/projectCRUD";
import ProjectNavbar from "../../../../../components/crud/handleAcademicRecord/project/navbar/projectNavbar";

export const Project = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/handleAcademicRecord/project',
    ];

    return (
        <>
            <ProjectNavbar />
            <ProjectCRUD name={'Proyecto'} urls={urls} title={`Bienvenido a Gestión de Proyectos`} subtitle={'Sistema Administrativo'} />
        </>
        )
}
