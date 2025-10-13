import React from 'react';
import TemplateCRUD from '../../../../../components/crud/handleRubric/template/templateCRUD';
import TemplateNavbar from '../../../../../components/crud/handleRubric/template/navbar/templateNavbar';

export const Template = () => {
  const urls = [
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleRubric/template',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleRubric/template/enable',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleRubric/template/disable',
  ];
  return (
    <>
      <TemplateNavbar />
      <TemplateCRUD name={'Plantilla'} urls={urls} title={`Bienvenido a Gestión de Plantillas de Rúbrica`} subtitle={'Sistema Administrativo'} />
    </>
  );
};
