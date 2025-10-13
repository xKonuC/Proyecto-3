import React from "react";
import StudentCRUD from '../../../../components/crud/handleUser/student/studentCRUD';
import StudentNavbar from '../../../../components/crud/handleUser/student/navbar/studentNavbar';

const StudentsList = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/graduate/students',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/graduate/students',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/graduate/students',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/graduate/students',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/graduate/students',
    ];

    return (
        <>
            <StudentNavbar urls={urls} />
            <StudentCRUD name={'Estudiante'} urls={urls} title={`Lista de Estudiantes de Magíster`} subtitle={'Sistema Administrativo'} />
        </>
    )
}

export default StudentsList;
