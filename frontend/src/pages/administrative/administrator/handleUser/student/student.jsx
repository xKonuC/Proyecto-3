import React from "react";
import StudentCRUD from "../../../../../components/crud/handleUser/student/studentCRUD";
import StudentNavbar from "../../../../../components/crud/handleUser/student/navbar/studentNavbar";

export const Student = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/roleAssignment/user/',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/roleAssignment/userHasRole/student',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/roleAssignment/importUsers/',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/roleAssignment/userHasPermission/',
        '/Administrative/Administrator/Document/',
        '/Administrative/Administrator/StudentHasTitle/'
    ];


    return (
        <>
            <StudentNavbar urls={urls} />
            <StudentCRUD name={'Estudiante'} urls={urls} title={`Bienvenido a Gestión de Estudiantes`} subtitle={'Sistema Administrativo'} />
        </>
    )
}
