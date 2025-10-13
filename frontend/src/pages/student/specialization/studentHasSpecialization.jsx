import React from 'react';
import StudentHasSpecializationCRUD from '../../../components/crud/handleSpecialization/student/studentHasSpecialization/studentHasSpecializationCRUD';

export const StudentHasSpecialization = () => {
  const myUrls = [
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/specialization/studentHasSpecialization/',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/specialization/studentHasSpecialization/semester',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/user/listPermission',
  ];
  return (
    <StudentHasSpecializationCRUD 
    name={'Linea de Formación'} 
    urls={myUrls} 
    title={`Bienvenido a la Selección de Linea de Formación`} 
    subtitle={"Explora y elige entre una variedad de líneas de formación diseñadas para adaptarse a tus intereses y objetivos académicos. Encuentra la línea que mejor se ajuste a tus necesidades y comienza tu viaje educativo de manera informada y motivadora."} 
    />
  );
};
