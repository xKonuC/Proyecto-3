import React from 'react';
import ThesisTemplate from './thesisTemplate';
import PreProjectTemplate from './preProjectTemplate';

const ExportRubricPDF = ({ rubric, rubricInfo = {}, evaluationTypeID = 0, categoryEvaluator = 0 }) => {
    // Verificar si rubric está definido y es un objeto válido
    if (!rubric || typeof rubric !== 'object') {
        return null;
    }

    const getEvaluatorName = () => {
        switch (categoryEvaluator) {
            case '2':
                return 'Evaluador';
            case '3':
                return 'Evaluador';
            case '5':
                return 'Co-Director';
            case '4':
                return 'Director';
            default:
                return 'Evaluador Desconocido';
        }
    };

    const parseEvaluationTypeID = parseInt(evaluationTypeID, 10);

    return (
        <>
            {
                parseEvaluationTypeID === 1 ? <PreProjectTemplate rubric={rubric} rubricInfo={rubricInfo} evaluatorType={getEvaluatorName()}/> : <ThesisTemplate rubric={rubric} rubricInfo={rubricInfo} evaluatorType={getEvaluatorName()}/>
            }
        </>
    );
};

export default ExportRubricPDF;
