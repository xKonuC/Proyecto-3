import React from 'react';
import EvaluationCRUD from '../../../../components/crud/handleSpecialization/academic/evaluationCRUD';
import EvaluatorAssignmentNavbar from '../../../../components/crud/handleSpecialization/academic/navbar/evaluatorAssignmentNavbar';

export const Evaluation = () => {
  const urls = [
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/handleSpecialization/',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/semester',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/handleSpecialization/comments',
  ];
  return (
    <>
      <EvaluatorAssignmentNavbar />
      <EvaluationCRUD name={'Evaluation'} urls={urls} title={`Bienvenido a la Evaluación de Estudiantes`} subtitle={''} />
    </>
  );
};
