import {
  express, listEvaluationStatus, updateEvaluator, updateAnswer, validateEvaluatorID, validateDataArray, validateEvaluationTypeID, validateGrade1, validateEvaluationStatusID, validateComment,
} from './answerModules.js';

const answerRoute = express.Router();
answerRoute.put(
  '/evaluator',
  validateEvaluationTypeID,
  validateEvaluatorID,
  validateGrade1,
  validateEvaluationStatusID,
  validateComment,
  updateEvaluator,
);
// Actualiza el estado de evaluación de un estudiantes
answerRoute.get(
  '/evaluationStatus',
  listEvaluationStatus,
);
answerRoute.route('/')
  .put(
    validateEvaluationTypeID,
    validateDataArray,
    updateAnswer,
  );
export default answerRoute;
