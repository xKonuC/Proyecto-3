import { MdSchool, MdBook, MdAssessment } from 'react-icons/md';
import SectionsGraduate from "../../components/sections/home/sectionsGraduate";

export const HomeGraduate = () => {

    const sectionsData = [
        {
            title: 'Llenar formulario de seguimiento',
            description: 'Explora y elige entre una variedad de líneas de formación diseñadas para adaptarse a tus intereses y objetivos académicos. Encuentra la línea que mejor se ajuste a tus necesidades y comienza tu viaje educativo de manera informada y motivadora.',
            link: '/Dashboard/Specialization/',
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
        <SectionsGraduate
            title={'Panel de Administración del Graduado'}
            description={"Bienvenido al Panel de Administración para graduados. Aquí podrás gestionar todos los aspectos relacionados con tu ."}
            sections={sectionsData}
        />
    )
}
