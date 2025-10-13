import React from 'react';
import QuestionCRUD from '../../../../../components/crud/handleRubric/question/questionCRUD';
import QuestionNavbar from '../../../../../components/crud/handleRubric/question/navbar/questionNavbar';

export const Question = () => {
  const urls = [
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleRubric/question',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleRubric/question/enable',
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/handleRubric/question/disable',
  ];
  return (
    <>
      <QuestionNavbar />
      <QuestionCRUD name={'Pregunta'} urls={urls} title={`Bienvenido a Gestión de Preguntas de Rúbrica`} subtitle={'Sistema Administrativo'} />
    </>
  );
};
