import { FaWpforms, FaRegListAlt, FaQuestionCircle } from 'react-icons/fa';
import SectionsAdministrative from "../../../../components/sections/home/sectionsAdministrative";

export const HandleRubric = () => {

    const sectionsData = [
        {
            title: 'Gestión de Plantillas',
            description: 'En esta sección, tendrá la capacidad de crear y actualizar plantillas de rúbricas para las distintas evaluaciones del programa. Además, podrás gestionar las preguntas de cada sección de rúbrica, con la opción de activar o desactivarlas según sea necesario.',
            link: '/Administrative/Administrator/Template',
            icon: <FaWpforms size={30} />,
        },
        {
            title: 'Gestión de Secciones',
            description: 'En esta sección, tendrá la capacidad de crear y actualizar la información de las Secciones de las rúbricas para las distintas evaluaciones del programa, con la opción de activar o desactivarlas según sea necesario.',
            link: '/Administrative/Administrator/Section',
            icon: <FaRegListAlt size={30} />,
        },
        {
            title: 'Gestión de Preguntas',
            description: 'En esta sección, tendrá la capacidad de crear y actualizar la información de las Preguntas de las rúbricas para las distintas evaluaciones del programa, con la opción de activar o desactivarlas según sea necesario.',
            link: '/Administrative/Administrator/Question',
            icon: <FaQuestionCircle size={30} />,
        },
    ];

    return (
        <SectionsAdministrative
            title={'Panel de Administración de Rúbricas'}
            sections={sectionsData}
        />
    )
}
