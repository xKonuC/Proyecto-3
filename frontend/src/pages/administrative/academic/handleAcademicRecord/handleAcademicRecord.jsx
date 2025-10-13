import { FaBook, FaChalkboardTeacher, FaLightbulb, FaProjectDiagram, FaFileAlt, FaUserGraduate, FaTasks } from "react-icons/fa";
import SectionsAdministrative from "../../../../components/sections/home/sectionsAdministrative";

export const HandleAcademicRecord = () => {

    const sectionsData = [
        {
            title: 'Gestión de Información Académica',
            description: 'En esta sección, podrás gestionar su información académica, incluyendo sus líneas de investigación, tipo de vínculo, dedicación a institución o jerarquía.',
            link: '/Administrative/Academic/HandleAcademicRecord/AcademicInfo',
            icon: <FaUserGraduate size={30} />,
        },
        {
            title: 'Gestión de Tesis Dirigidas',
            description: 'En esta sección, podrás gestionar la información de sus tesis de magíster y doctorado dirigidas como guía o co-guía de tesis.',
            link: '/Administrative/Academic/HandleAcademicRecord/GuidedThesis',
            icon: <FaLightbulb size={30} />,
        },
        {
            title: 'Gestión de Libros/Capitulos de Libro',
            description: 'En esta sección, podrás gestionar la información de sus libros o capítulos de libro como autor principal o colaborador.',
            link: '/Administrative/Academic/HandleAcademicRecord/BookChapter',
            icon: <FaBook size={30} />,
        },
        {
            title: 'Gestión de Publicaciones',
            description: 'En esta sección, podrás gestionar la información de sus publicaciones como autor principal o colaborador.',
            link: '/Administrative/Academic/HandleAcademicRecord/publication',
            icon: <FaTasks size={30} />,
        },
        {
            title: 'Gestión de Patentes',
            description: 'En esta sección, podrás gestionar la información referente a sus patentes. Podrá crear, actualizar o eliminar sus registros',
            link: '/Administrative/Academic/HandleAcademicRecord/Patent',
            icon: <FaFileAlt size={30} />,
        },
        {
            title: 'Gestión de Proyectos',
            description: 'En esta sección, podrás gestionar la información de sus proyectos como investigador responsable o colaborador.',
            link: '/Administrative/Academic/HandleAcademicRecord/Project',
            icon: <FaProjectDiagram size={30} />,
        },
        {
            title: 'Gestión de Consultorías y Asistencias Técnicas',
            description: 'En esta sección, podrás gestionar la información de sus consultorías o asistencias técnicas realizadas.',
            link: '/Administrative/Academic/HandleAcademicRecord/Consultancy',
            icon: <FaChalkboardTeacher size={30} />,
        },
    ];

    return (
        <SectionsAdministrative
            title={'Panel de Administración de Ficha Académica'}
            sections={sectionsData}
        />
    )
}
