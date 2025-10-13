import {
  express, listQuestion, listEnableQuestion, createQuestion, updateQuestion, enableQuestion, disableQuestion, validateArrayQuestionID, validateQuestionID, validateQuestion,
} from './questionModules.js';

const questionRoute = express.Router();
questionRoute.route('/enable')
  .get(listEnableQuestion)
  .put(validateArrayQuestionID, enableQuestion);
questionRoute.put('/disable', validateArrayQuestionID, disableQuestion);
questionRoute.route('/')
  .get(listQuestion)
  .post(validateQuestion, createQuestion)
  .put(validateQuestionID, validateQuestion, updateQuestion);
export default questionRoute;
