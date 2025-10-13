import { FaClipboardList, FaChalkboardTeacher } from 'react-icons/fa';
import SectionsAdministrative from "../../../components/sections/home/sectionsAdministrative";

export const Home = () => {

    const sectionsData = [
        {
            title: 'Evaluación de Anteproyectos',
            description: 'En esta sección, tendrá la responsabilidad de evaluar los anteproyectos presentado por los estudiantes del programa. Además, podrá realizar una revisión a los anteproyectos antes de evaluarlos.',
            link: '/Administrative/Academic/Evaluation/1',
            icon: <FaChalkboardTeacher size={30} />,
        },
        {
            title: 'Evaluación de Tesis',
            description: 'En esta sección, en calidad de Académico Evaluador o Director de Tesis, tendrá la responsabilidad de evaluar las tesis presentadas por los estudiantes del programa.',
            link: '/Administrative/Academic/Evaluation/2',
            icon: <FaChalkboardTeacher size={30} />,
        },
        {
            title: 'Gestión de Fichas Académicas',
            description: 'En esta sección, podrá gestionar toda la información relacionada a su fichas académica solicitada por el programa. Esto incluye la añadir o modificar la información de tesis dirigidas, publicaciones, libros o capítulos de libro, proyectos, patentes o consultorías.',
            link: '/Administrative/Academic/HandleAcademicRecord/',
            icon: <FaClipboardList size={30} />,
        },
        {
            title: 'Gestión de Títulos',
            description: 'En esta sección, tendrá la capacidad de crear, actualizar o eliminar información de sus Títulos de manera eficiente y sencilla.',
            link: '/Administrative/Academic/AcademicHasTitle/',
            icon: <FaChalkboardTeacher size={34} />,
        },
    ];
    

    return (
        <SectionsAdministrative
            title={'Panel de Administración del Académico'}
            description={"Bienvenido al Panel de Administración para la gestión de Magíster para la Universidad de Tarapacá, diseñado para facilitar la gestión de recursos. Supervisa y optimiza las operaciones de tu institución educativa con eficacia."}
            sections={sectionsData}
        />
    )
}
