import {
  express, createTemplateHasQuestion, updateTemplateHasQuestion, deleteTemplateHasQuestion, validateArrayTemplateHasQuestionID, validateArrayData, validateTemplateHasQuestionArray,
} from './templateHasQuestionModules.js';

const templateHasQuestionRoute = express.Router();

templateHasQuestionRoute.route('/')
  .post(validateArrayData, createTemplateHasQuestion)
  .put(validateTemplateHasQuestionArray, updateTemplateHasQuestion)
  .delete(validateArrayTemplateHasQuestionID, deleteTemplateHasQuestion);
export default templateHasQuestionRoute;
