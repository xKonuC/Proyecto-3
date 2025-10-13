import React from "react";
import SemesterCRUD from "../../../../components/crud/semester/semesterCRUD";
import SemesterNavbar from "../../../../components/crud/semester/navbar/semesterNavbar";

export const Semester = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/semester',
    ];

    return (
        <>
            <SemesterNavbar />
            <SemesterCRUD name={'Semestre'} urls={urls} title={`Bienvenido a Gestión de Semestres`} subtitle={'Sistema Administrativo'} />
        </>)
}
