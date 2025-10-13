import { FaChalkboardTeacher, FaUser, FaUserGraduate } from "react-icons/fa";
import SectionsAdministrative from "../../../../components/sections/home/sectionsAdministrative";

export const HandleUser = () => {

    const sectionsData = [
        {
            title: 'Gestión de Usuarios',
            description: ' En esta sección, tendrá la capacidad de crear, actualizar y eliminar información de los usuarios del sistema. Además, podrá exportar la información, modificar roles y cambiar las contraseñas de los usuarios si es necesario.',
            link: '/Administrative/Administrator/Users',
            icon: <FaUser size={30} />,
        },
        {
            title: 'Gestión de Académicos',
            description: ' En esta sección, tendrá la capacidad de crear, actualizar y eliminar información de los académicos del programa. Además, podrá exportar la información o gestionar sus títulos y fichas académicas.',
            link: '/Administrative/Administrator/Academic',
            icon: <FaChalkboardTeacher size={34} />,
        },
        {
            title: 'Gestión de Estudiantes',
            description: ' En esta sección, tendrá la capacidad de crear, actualizar y eliminar información de los estudiantes del programa. Además, podrá exportar la información o gestionar sus títulos y documentos.',
            link: '/Administrative/Administrator/Student',
            icon: <FaUserGraduate size={30} />,
        },
    ];

    return (
        <SectionsAdministrative
            title={'Panel de Administración de Usuarios'}
            sections={sectionsData}
        />
    )
}
