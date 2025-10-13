import {
  express,
  listRubricOverview,
  listTemplateOverview,
  updateRubric,
  updateTemplateID,
  validateRubricID,
  validateRubricName,
  validateDescription,
  validateComment,
  validateEvaluationStatusID,
  validateEvaluationTypeID,
} from './rubricModules.js';

const rubricRoute = express.Router();
rubricRoute.get('/rubricOverview', 
validateRubricID, 
validateEvaluationTypeID, 
listRubricOverview);
rubricRoute.get('/templateOverview', 
validateRubricID, 
listTemplateOverview);
rubricRoute.put('/template', 
validateRubricID, 
updateTemplateID);
rubricRoute.route('/')
  .put(validateRubricID, 
    // validateEvaluationStatusID, 
    validateRubricName, 
    validateDescription, 
    validateComment, 
    updateRubric);
export default rubricRoute;
