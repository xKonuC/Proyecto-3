import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    setItems,
} from '../../../../../redux/slice/handleRubric/rubric/rubricSlice';
import { calculateFinalGrade, calculateScore, getAnswerScale, handleCheckboxChange } from '../../../../../utils/crudHelpers/handleRubric/utils';
import Checkbox from '../../../../input/checkbox';

const RubricTable = () => {
    const dispatch = useDispatch();
    const { items: rubric } = useSelector((state) => state.handleRubric.rubric);
    const { evaluationTypeID } = useParams();
    const parseEvaluationTypeID = parseInt(evaluationTypeID, 10);
    // Obtener la escala de respuestas según el evaluationTypeID
    const answerScale = getAnswerScale(parseEvaluationTypeID);

    // Calcular el puntaje obtenido y la calificación final para la sección de tesis
    let score = 0;
    let totalScore = 0;
    let finalGrade = 0;
    if (parseEvaluationTypeID === 2) {
        const { score: calculatedScore, totalScore: calculatedTotalScore } = calculateScore(rubric.sections);
        score = calculatedScore;
        totalScore = calculatedTotalScore;
        finalGrade = calculateFinalGrade(score, totalScore);
    }

    return (
        <>
            <div>
                {rubric.rubricID && (
                    <div key={rubric.rubricID} className="mt-5">
                        <section className="mb-2">
                            <h2>{parseEvaluationTypeID === 1 ? 'Título de Anteproyecto: ' : 'Título de Tesis: '} {rubric.rubric_name}</h2>
                            <p>Notas adicionales: {rubric.rubric_description === null ? 'No se indicaron notas adicionales.': rubric.rubric_description}</p>
                            {parseInt(evaluationTypeID, 10) === 1 ?
                                < p >Estado de Evaluación: {rubric.name}</p>
                                :
                                <p>Nota estimada según el Puntaje Actual: {finalGrade}</p>
                            }
                             <p>
                                {parseInt(evaluationTypeID, 10) === 1 ? 'Sugerencias de Mejora: ' : 'Otras Observaciones: '}
                                {rubric.comment === null ? 'No se indicaron sugerencias u observaciones.' : rubric.comment}
                            </p>
                        </section>
                        {rubric.sections.map((section) => (
                            <div key={section.sectionID} className="overflow-x-auto mt-2">
                                <table className="min-w-full text-sm rounded-lg">
                                    <thead className="bg-gray-800 text-gray-100 border-2 border-gray-700">
                                        <tr>
                                            <th className="w-4/12" rowSpan="2">{section.name}</th>
                                            {answerScale.map((answer, index) => (
                                                <React.Fragment key={index}>
                                                    <th className="w-1/12">{index + 1}</th>
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                        <tr>
                                            {answerScale.map((answer, index) => (
                                                <React.Fragment key={index}>
                                                    <td className="w-1/12 text-center font-semibold">{answer}</td>
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {section.questions.map((question) => (
                                            <tr key={question.questionID} className="border-2 border-opacity-20 border-gray-700 bg-white">
                                                <td className="p-3 text-center border-2 border-opacity-20 border-gray-700">
                                                    {question.question}
                                                </td>
                                                {answerScale.map((answer, index) => (
                                                    <td key={index} className="text-center">
                                                        <Checkbox
                                                            id={`${answer}-${question.questionID}`}
                                                            name={`${answer}-${question.questionID}`}
                                                            checked={question.answer === answer}
                                                            onChange={e => handleCheckboxChange(rubric, dispatch, setItems, section.sectionID, question.questionID, e.target.checked ? answer : null)}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                        {parseEvaluationTypeID === 2 && (
                            <section className="grid grid-cols-3 px-0 text-center sm:px-10 my-2 font-normal text-sm sm:text-base">
                                <div className="col-span-full sm:col-span-2">
                                    Nota Minima Aprobación Actividad de Graduación (Tesis de Grado): 5.0
                                </div>
                                <div className="col-span-full sm:col-span-1">
                                    <table className="min-w-full rounded-lg">
                                        <tbody>
                                            <tr className="border-2 border-opacity-20 border-gray-700 bg-white">
                                                <td className="px-3 py-1 text-center border border-opacity-20 border-gray-700">Puntaje Obtenido</td>
                                                <td className="px-3 py-1 text-center border border-opacity-20 border-gray-700">{score} de {totalScore}</td>
                                            </tr>
                                            <tr className="border-2 border-opacity-20 border-gray-700 bg-white">
                                                <td className="px-3 py-1 text-center border border-opacity-20 border-gray-700">Calificación Final</td>
                                                <td className="px-3 py-1 text-center border border-opacity-20 border-gray-700">{rubric.grade1 === null ? 1.0 : rubric.grade1}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div >
        </>
    );
}

export default RubricTable;
