import React from 'react';
import HandleRubricCRUD from '../../../../components/crud/handleRubric/rubric/handleRubricCRUD';
import RubricNavbar from '../../../../components/crud/handleRubric/rubric/navbar/rubricNavbar';

export const HandleRubric = () => {
  const urls = [
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/handleRubric/rubric',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/handleRubric/rubric/rubricOverview',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/handleSpecialization/evaluationStatus',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/handleRubric/answer',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/handleRubric/answer/evaluationStatus',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/handleRubric/answer/evaluator',
  ];
  return (
    <>
      <RubricNavbar urls={urls} showClearButton={false}/>
      <HandleRubricCRUD name={'rubrica'} urls={urls}/>
    </>
  );
};
