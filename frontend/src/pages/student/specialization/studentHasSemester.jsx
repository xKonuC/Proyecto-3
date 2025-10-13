import React from 'react';
import StudentHasSemesterCRUD from '../../../components/crud/handleSpecialization/student/studentHasSemester/studentHasSemesterCRUD';

export const StudentHasSemester = () => {
  const myUrls = [
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/specialization/studentHasSemester',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/specialization/studentHasSpecialization/semesterAvailability',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/user/listPermission',
  ];
  return (
    <StudentHasSemesterCRUD 
    name={'Tipo de Actividad'} 
    urls={myUrls} 
    title={`Bienvenido al Proceso de Evaluación`} 
    subtitle={"Comienza tu proceso de Anteproyecto o Tesis para finalizar tus estudios. Podrás subir tu anteproyecto o tesis y realizar un seguimiento del estado de tu evaluación."} 
    />
  );
};
