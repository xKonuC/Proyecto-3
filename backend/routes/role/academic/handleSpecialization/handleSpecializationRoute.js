import {
  express,
  listEvaluation,
  updateComments,
  validateEvaluationID,
  validateEvaluationTypeID,
  validateComments,
  validatePreprojectEvaluatorID,
  validateReviewCompleted,
} from './handleSpecialization.modules.js';

const handleSpecializationRoute = express.Router();

handleSpecializationRoute.put('/comments', validatePreprojectEvaluatorID, validateEvaluationID, validateComments, validateReviewCompleted, updateComments);

handleSpecializationRoute.route('/')
  .get(validateEvaluationTypeID, listEvaluation);// ✅
export default handleSpecializationRoute;
