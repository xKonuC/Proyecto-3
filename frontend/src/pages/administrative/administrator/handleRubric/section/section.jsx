import React from 'react';
import SectionCRUD from '../../../../../components/crud/handleRubric/section/sectionCRUD';
import SectionNavbar from '../../../../../components/crud/handleRubric/section/navbar/sectionNavbar';

export const Section = () => {
  const urls = [
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleRubric/section',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleRubric/section/enable',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleRubric/section/disable',
  ];
  return (
    <>
      <SectionNavbar />
      <SectionCRUD name={'Sección'} urls={urls} title={`Bienvenido a Gestión de Secciones de Rúbrica`} subtitle={'Sistema Administrativo'} />
    </>
  );
};
