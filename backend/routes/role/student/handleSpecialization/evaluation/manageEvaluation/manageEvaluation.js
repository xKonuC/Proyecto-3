/* eslint-disable eqeqeq */
import { UpdateEvaluationStatus } from '../../../../../../repository/handleSpecialization/studentHasSemester/updateEvaluationStatus.js';
import { CreatePreprojectEvaluator } from '../../../../../../repository/handleSpecialization/preprojectEvaluator/createPreprojectEvaluator.js';
import { CreateThesisEvaluator } from '../../../../../../repository/handleSpecialization/thesisEvaluator/createThesisEvaluator.js';
import { GetRubricHasQuestion } from '../../../../../../repository/handleRubric/rubricHasQuestion/getRubricQuestions.js';
import { CreateEvaluatorAnswer } from '../../../../../../repository/handleRubric/evaluatorAnswer/createEvaluatorAnswer.js';
import { CreateStageAnswer } from '../../../../../../repository/handleRubric/stageAnswer/createEvaluatorAnswer.js';

const manageEvaluation = async (req, res) => {
  const {
    studentHasSemesterID, evaluationStatusID, evaluationTypeID, evaluationID, evaluators, rubricID,
  } = req.body;

  try {
    const updateEvaluationStatusInstance = new UpdateEvaluationStatus();
    // Para el estado inicial de evaluación, valor por defecto al crear un studentHasSemester
    if (evaluationStatusID == null) {
      // Actualizo el estado de la evaluación a 1 (Sin asignación)
      await updateEvaluationStatusInstance.updateEvaluationStatus(studentHasSemesterID, 1);
    } else if ([5, 6].includes(evaluationStatusID)) { // 5(aprobado co observaciones) o 6 (Reprobado en primer intento), como ya reprobe ya debo tener datos previos
      // En caso de tengo los información de las de preprojectEvaluation(1) o thesisEvaluation(2), obtener datos previos
      // Uso evaluators para obtener la información de los evaluadores asignados previamente,

      // Obtengo los rubricHasQuestion asociados a rubricID, que es la rubrica que se asigno al principio de todo
      const getRubricHasQuestionInstance = new GetRubricHasQuestion();
      const { result } = await getRubricHasQuestionInstance.getRubricHasQuestion(rubricID);
      let createAnswerInstance;
      // Lógica para crear rúbricas basada en evaluationTypeID y
      if (evaluationTypeID == 1) { // Anteproyecto
        // Crear rúbricas para académico A(2) y B(3)
        const createEvaluatorInstance = new CreatePreprojectEvaluator();
        const academicAUserID = evaluators.evaluatorID_1;
        const academicBUserID = evaluators.evaluatorID_2;
        const evaluator1ID = await createEvaluatorInstance.createPreprojectEvaluator(academicAUserID, 2, evaluationID);
        const evaluator2ID = await createEvaluatorInstance.createPreprojectEvaluator(academicBUserID, 3, evaluationID);

        // Con un rubrica ya previamente asigna y con las preguntas de esa rubrica, entonces creo respuesta por defecto para los evaluadores
        createAnswerInstance = new CreateEvaluatorAnswer();
        const createAnswerPromises = result.map(async (question) => {
          await createAnswerInstance.createAnswer(evaluator1ID, question.rubricHasQuestionID, 4);
          await createAnswerInstance.createAnswer(evaluator2ID, question.rubricHasQuestionID, 4);
        });

        // Esperar a que se completen todas las creaciones de preguntas para esta sección
        await Promise.all(createAnswerPromises);
      } if (evaluationTypeID == 2) { // Tesis
        // Crear rúbricas para académico A(2), B(3), director(4), codirector(5) y director de Programa(6)
        const createEvaluatorInstance = new CreateThesisEvaluator();
        const academicAUserID = evaluators.evaluatorID_1;
        const academicBUserID = evaluators.evaluatorID_2;
        const directorUserID = evaluators.evaluatorID_3;
        const codirectorUserID = evaluators.evaluatorID_4 || null;
        const programDirectorUserID = evaluators.evaluatorID_5;

        let evaluator4ID = 0;

        // Con un rubrica ya previamente asigna y con las preguntas de esa rubrica, entonces creo respuesta por defecto para los evaluadores
        createAnswerInstance = new CreateStageAnswer();
        const evaluator1ID = await createEvaluatorInstance.createThesisEvaluator(academicAUserID, 2, evaluationID);
        const evaluator2ID = await createEvaluatorInstance.createThesisEvaluator(academicBUserID, 3, evaluationID);
        const evaluator3ID = await createEvaluatorInstance.createThesisEvaluator(directorUserID, 4, evaluationID);
        // El codirector es opcional
        if (codirectorUserID !== null) {
          evaluator4ID = await createEvaluatorInstance.createThesisEvaluator(codirectorUserID, 5, evaluationID);
        }
        // El director de Programa no lleva un rubrica
        await createEvaluatorInstance.createThesisEvaluator(programDirectorUserID, 6, evaluationID);

        const createAnswerPromises = result.map(async (question) => {
          await createAnswerInstance.createAnswer(evaluator1ID, question.rubricHasQuestionID, 1);
          await createAnswerInstance.createAnswer(evaluator2ID, question.rubricHasQuestionID, 1);
          await createAnswerInstance.createAnswer(evaluator3ID, question.rubricHasQuestionID, 1);
          if (codirectorUserID !== null) {
            await createAnswerInstance.createAnswer(evaluator4ID, question.rubricHasQuestionID, 1);
          }
        });

        // Esperar a que se completen todas las creaciones de preguntas para esta sección
        await Promise.all(createAnswerPromises);
      }
    }

    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error: 'Ha ocurrido un error inesperado.' });
    }
  }
};

export default manageEvaluation;
