import React from 'react';
import StudentHasElectiveCRUD from '../../../components/crud/handleSpecialization/student/studentHasElective/studentHasElectiveCRUD';

export const StudentHasElective = () => {
  const urls = [
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/specialization/studentHasSemester/elective',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/specialization/studentHasSpecialization/semesterAvailability',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/user/listPermission',
  ];
  return (
    <StudentHasElectiveCRUD 
    name={'Tipo de Evaluación'} 
    urls={urls} 
    title={`Bienvenido a la Inscripción de Electivos`} 
    subtitle={"Accede a una amplia selección de cursos electivos para enriquecer tu experiencia académica. Elige tus electivos y ajusta tu plan de estudios según tus intereses y requisitos de graduación."} 
    />
  );
};
