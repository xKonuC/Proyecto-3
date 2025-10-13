import React from 'react';
import ThesisRegistrationCRUD from '../../../../components/crud/handleSpecialization/administrator/thesisRegistration/thesisRegistrationCRUD';
import ThesisRegistrationNavbar from '../../../../components/crud/handleSpecialization/administrator/thesisRegistration/navbar/thesisRegistrationNavbar';

export const ThesisRegistration = () => {
  const urls = [
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/thesisRegistration/',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/thesisRegistration/student',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleSpecialization/administrative',
  ];

  return (
    <>
      <ThesisRegistrationNavbar />
      <ThesisRegistrationCRUD name={'Ficha'} urls={urls} title={'Bienvenido a Ficha de Inscripción'} subtitle={''} />
    </>
  );
};
