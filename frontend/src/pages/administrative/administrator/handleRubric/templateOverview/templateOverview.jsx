import React from 'react';
import TemplateOverviewCRUD from '../../../../../components/crud/handleRubric/templateOverview/templateOverviewCRUD';
import TemplateOverviewNavbar from '../../../../../components/crud/handleRubric/templateOverview/navbar/templateOverviewNavbar';

export const TemplateOverview = () => {
  const urls = [
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleRubric/template/templateOverview',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleRubric/question/enable',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleRubric/section/enable',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleRubric/templateHasSection',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleRubric/templateHasQuestion',
  ];
  return (
    <>
      <TemplateOverviewNavbar urls={urls} />
      <TemplateOverviewCRUD name={'Plantilla'} urls={urls}/>
    </>
  );
};
