import React from 'react';
import EvaluatorAssignmentCRUD from '../../../../components/crud/handleSpecialization/administrator/evaluatorAssignmentCRUD';
import EvaluatorAssignmentNavbar from '../../../../components/crud/handleSpecialization/academic/navbar/evaluatorAssignmentNavbar';
import { useParams } from 'react-router-dom';

export const EvaluatorAssignment = () => {
  const urls = [
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleSpecialization/',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleSpecialization/academic',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleSpecialization/administrative',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleSpecialization/semester',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleRubric/rubric',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleRubric/template/enable',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleSpecialization/evaluationStatus',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleSpecialization/oralDefenseScores',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleSpecialization/processEvaluation',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleSpecialization/comments',
  ];
  const { evaluationTypeID } = useParams();

  // Definir el título y subtítulo basados en el evaluationTypeID
  let title;
  if (parseInt(evaluationTypeID, 10) === 1) {
    title = "Bienvenido a Gestión de Anteproyectos de Estudiantes";
  } else {
    title = "Bienvenido a Gestión de Tesis de Estudiantes";
  }

  return (
    <>
      <EvaluatorAssignmentNavbar />
      <EvaluatorAssignmentCRUD name={'Asignación de Evaluadores'} urls={urls} title={title} subtitle={''} />
    </>
  );
};
