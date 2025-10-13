import { FaCertificate, FaUniversity } from "react-icons/fa";
import SectionsAdministrative from "../../../../components/sections/home/sectionsAdministrative";

export const HandleTitle = () => {
    const sectionsData = [
        {
            title: 'Gestión de Títulos',
            description: 'En esta sección, tendrá la capacidad de crear, actualizar o eliminar información de los títulos que se podrán seleccionar en el sistema.',
            link: '/Administrative/Administrator/Title',
            icon: <FaCertificate size={30} />,
        },
        {
            title: 'Gestión de Universidades',
            description: 'En esta sección, tendrá la capacidad de crear, actualizar o eliminar información de las universidades que se podrán seleccionar en el sistema.',
            link: '/Administrative/Administrator/University',
            icon: <FaUniversity size={34} />,
        },
    ];

    return (
        <SectionsAdministrative
            title={'Panel de Administración General de Títulos'}
            sections={sectionsData}
        />
    );
}
