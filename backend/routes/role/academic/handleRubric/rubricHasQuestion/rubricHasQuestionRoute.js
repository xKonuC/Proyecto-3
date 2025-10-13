import {
  express, createRubricHasQuestion, updateRubricHasQuestion, deleteRubricHasQuestion, validateArrayRubricHasQuestionID, validateArrayData, validateRubricHasQuestionArray,
} from './rubricHasQuestionModules.js';

const rubricHasQuestionRoute = express.Router();

rubricHasQuestionRoute.route('/')
  .post(
    // validateArrayData, 
    createRubricHasQuestion)
  .put(
    // validateRubricHasQuestionArray, 
    updateRubricHasQuestion)
  .delete(validateArrayRubricHasQuestionID, deleteRubricHasQuestion);
export default rubricHasQuestionRoute;
