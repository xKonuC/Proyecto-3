import { MdSchool, MdBook, MdAssessment } from 'react-icons/md';
import SectionsStudent from "../../components/sections/home/sectionsStudent";

export const HomeStudent = () => {

    const sectionsData = [
        {
            title: 'Actualizar mi información',
            description: 'actualizar mi informacion personal y académica, asegurando que mis datos estén siempre al día para una mejor gestión de mi trayectoria educativa.',
            link: '/Dashboard/Profile',
            icon: (
                <MdSchool className="h-10 w-10" />
            ),
        },
        {
            title: 'Inscripción de Electivos',
            description: 'Accede a una amplia selección de cursos electivos para enriquecer tu experiencia académica. Elige tus electivos y ajusta tu plan de estudios según tus intereses y requisitos de graduación.',
            link: '/Dashboard/Specialization/Electives/',
            icon: (
                <MdBook className="h-10 w-10" />
            ),
        },
        {
            title: 'Anteproyecto y Tesis',
            description: 'Comienza tu proceso de Anteproyecto o Tesis para finalizar tus estudios. Podrás subir tu anteproyecto o tesis y realizar un seguimiento del estado de tu evaluación.',
            link: '/Dashboard/Specialization/EvaluationProcess/',
            icon: (
                <MdAssessment className="h-10 w-10" />
            ),
        },
    ];

    return (
        <SectionsStudent
            title={'Panel de Administración del Estudiante'}
            description={"Bienvenido al Panel de Administración para estudiantes. Aquí podrás gestionar todos los aspectos relacionados con tu Linea de Formación, cursos electivos y procesos de evaluación, asegurando que tengas toda la información y recursos necesarios para una experiencia educativa enriquecedora y exitosa."}
            sections={sectionsData}
        />
    );
};
