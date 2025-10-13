import React from 'react';
import EvaluateCRUD from '../../../components/crud/handleSpecialization/student/evaluate/evaluateCRUD';
import { useParams } from 'react-router-dom';

export const Evaluate = () => {
  const urls = [
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/specialization/evaluation/',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/specialization/evaluation/evaluationRubric',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/specialization/evaluation/comments',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/user/listPermission',
  ];

  const { evaluationTypeID } = useParams();

  // Definir el título y subtítulo basados en el evaluationTypeID
  let title, subtitle;
  if (parseInt(evaluationTypeID, 10) === 1) {
    title = "Portal de Evaluación de Anteproyectos";
    subtitle = "Revisa el estado de tu evaluación de anteproyectos, sube documentos y sigue las indicaciones para completar tu proceso de revisión.";
  } else {
    title = "Portal de Evaluación de Tesis";
    subtitle = "Revisa el estado de tu evaluación de tesis, sube documentos y sigue las indicaciones para completar tu proceso de revisión.";
  }

  return (
    <EvaluateCRUD name={'Evaluación de Anteproyectos y Tesis'} urls={urls} title={title} subtitle={subtitle} />
  );
};
