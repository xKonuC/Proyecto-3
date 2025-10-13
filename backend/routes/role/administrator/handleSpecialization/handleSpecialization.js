import {
  express,
  listAdministrative,
  listAcademic,
  listSemester,
  listEvaluation,
  createEvaluateHasUser,
  updateEvaluateHasUser,
  updateEvaluationStatus,
  validateStudentHasSemesterID,
  validateEvaluator_userID,
  validateEvaluatorID,
  validateEvaluationID,
  validateEvaluationTypeID,
  validateStage,
  listEvaluationStatus,
  updateEvaluate,
  updateStudentHasSemester,
  updateStudentHasSpecialization,
  validateSemesterID,
  validateEvaluationStatusID,
  validateSpecializationID,
  processEvaluationData,
  validateArrayData,
  updateOralDefenseScores,
  updateThesisGrades,
  validateScoresAndEvaluatorIDs,
  validateThesisGradesID,
  updateComments,
  validatePreprojectEvaluatorID,
  validateComments,
  validateReviewCompleted,
} from './handleSpecialization.modules.js';

const handleSpecializationRoute = express.Router();

// Semestres disponibles(utilizados por el frontend para filtrar las evaluaciones por semestres)
handleSpecializationRoute.get('/semester', listSemester);
// Actualizar Notas de la defensa Oral solo en tesis y el promedio de estas
handleSpecializationRoute.put(
  '/oralDefenseScores',
  validateScoresAndEvaluatorIDs,
  validateThesisGradesID,
  updateOralDefenseScores,
  updateThesisGrades,
);
// Proceso para actualizar el estado de evaluación para muchos estudiantes
handleSpecializationRoute.put(
  '/processEvaluation',
  validateEvaluationTypeID,
  validateArrayData,
  processEvaluationData,
);
// Actualiza el estado de evaluación de un estudiantes
handleSpecializationRoute.route('/evaluationStatus')
  .get(listEvaluationStatus)
  .put(
    validateEvaluationTypeID,
    validateEvaluationStatusID,
    validateEvaluationID,
    validateSpecializationID,
    validateSemesterID,
    validateStudentHasSemesterID,
    updateEvaluate,
    updateStudentHasSemester,
    updateStudentHasSpecialization,
  );
// Evaluadores a Asignar
handleSpecializationRoute.get('/administrative', listAdministrative);
handleSpecializationRoute.get('/academic', listAcademic);

// Actualizar Comentarios de Anteproyecto
handleSpecializationRoute.put('/comments', validatePreprojectEvaluatorID, validateEvaluationID, validateComments, validateReviewCompleted, updateComments);

// Asignación de Evaluadores para un tipo de evaluación
handleSpecializationRoute.route('/')
  .get(validateEvaluationTypeID, listEvaluation)
  .post(
    validateEvaluationTypeID,
    validateStage,
    validateEvaluationID,
    validateEvaluator_userID,
    validateStudentHasSemesterID,
    createEvaluateHasUser,
    updateEvaluationStatus,
  )
  .put(
    validateEvaluationTypeID,
    validateStage,
    validateEvaluator_userID,
    validateEvaluatorID,
    validateEvaluationID,
    validateStudentHasSemesterID,
    updateEvaluateHasUser,
    updateEvaluationStatus,
  );
export default handleSpecializationRoute;
