import { FaUser, FaBook, FaCalendarAlt, FaListAlt, FaUserTie } from 'react-icons/fa';
import SectionsAdministrative from "../../../components/sections/home/sectionsAdministrative";


export const Home = () => {

    const sectionsData = [
        {
            title: 'Gestión General de Usuarios',
            description: 'Administra a los distintos usuarios, académicos y estudiantes del programa de manera eficiente y sencilla. Realiza acciones como crear, actualizar, eliminar o exportar información o gestionar roles, documentación y contraseñas.',
            link: '/Administrative/Administrator/HandleUser',
            icon: <FaUser size={30} />,
        },
        {
            title: 'Gestión General de Títulos',
            description: 'Administra los títulos y universidades que aparecerán en el sistema. Realiza acciones como crear, actualizar o eliminar información de universidades y sus títulos pertenecientes.',
            link: '/Administrative/Administrator/HandleTitle',
            icon: <FaBook size={30} />,
        },
        {
            title: 'Gestión de Semestres',
            description: 'Administra los semestres que aparecerán en el sistema. Realiza acciones como crear, actualizar o eliminar información de los semestres.',
            link: '/Administrative/Administrator/Semester',
            icon: <FaCalendarAlt size={30} />,
        },
        {
            title: 'Gestión General de Rúbricas',
            description: 'Administra las plantillas, secciones y preguntas de las rúbricas de evaluación del programa. Realiza acciones como crear, actualizar o eliminar rúbricas para las distintas evaluaciones llevadas a cabo en el programa.',
            link: '/Administrative/Administrator/HandleRubric',
            icon: <FaListAlt size={30} />,
        },
        {
            title: 'Anteproyectos y Tesis',
            description: 'Asigna académicos evaluadores o directores de tesis para las distintas evaluaciones de los estudiantes dentro del programa. Además podrás realizar un seguimiento de las evaluacionas y asignar un estado o nota final a éstas.',
            link: '/Administrative/Administrator/HandleSpecialization',
            icon: <FaUserTie size={30} />,
        },
    ];

    return (
        <SectionsAdministrative
            title={'Panel de Administración del Administrador'}
            sections={sectionsData}
        />
    )
}
