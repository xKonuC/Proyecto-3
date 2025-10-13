import { FaBookReader } from 'react-icons/fa';
import SectionsAdministrative from "../../../../components/sections/home/sectionsAdministrative";

export const HandleSpecialization = () => {

    const sectionsData = [
        {
            title: 'Gestión de Anteproyectos',
            description: 'En esta sección, tendrá la capacidad de hacer un seguimiento a los procesos de Anteproyecto del programa. Podrá asignar académicos evaluadores, visualizar los anteproyectos de los estudiantes y asignar un estado final a la evaluación.',
            link: '/Administrative/Administrator/EvaluatorAssignment/1',
            icon: (
                <FaBookReader size={30} />
            ),
        },
        {
            title: 'Gestión de Tesis',
            description: 'En esta sección, tendrá la capacidad de hacer un seguimiento a los procesos de Tesis del programa. Podrá asignar académicos evaluadores, Director o Co-Director de Tesis, visualizar las tesis de los estudiantes y asignar las notas del proceso de Defensa Oral.',
            link: '/Administrative/Administrator/EvaluatorAssignment/2',
            icon: (
                <FaBookReader size={30} />
            ),
        },
        {
            title: 'Gestión de Ficha de Inscripción',
            description: ' En esta sección, tendrá la capacidad de crear, actualizar y eliminar información de los registro de tesis del programa.',
            link: '/Administrative/Administrator/ThesisRegistration',
            icon: (
                <FaBookReader size={30} />
            ),
        },
    ];

    return (
        <SectionsAdministrative
            title={'Panel de Administración de Anteproyectos y Tesis'}
            sections={sectionsData}
        />
    )
}
