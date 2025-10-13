import {
  express,
  listRubricOverview,
  createRubric,
  buildRubric,
  updateRubric,
  updateRubricID,
  deleteRubricHasSection,
  validateEvaluationID,
  validateRubricID,
  validateRubricName,
  validateDescription,
  validateTemplateID,
  validateIsUpdateTemplateID,
  validateEvaluationTypeID,
  validateEvaluators,
} from './rubricModules.js';

const rubricRoute = express.Router();
rubricRoute.get(
  '/rubricOverview',
  validateRubricID,
  validateEvaluationTypeID,
  listRubricOverview,
);
rubricRoute.route('/')
  .post(
    validateEvaluationTypeID,
    validateEvaluators,
    validateEvaluationID,
    validateRubricName,
    validateDescription,
    validateTemplateID,
    createRubric,
    updateRubricID,
    buildRubric,
  )
  .put(
    validateEvaluationTypeID,
    validateEvaluators,
    validateRubricID,
    validateRubricName,
    validateDescription,
    validateTemplateID,
    validateIsUpdateTemplateID,
    updateRubric,
    deleteRubricHasSection,
    buildRubric,
  );
export default rubricRoute;
