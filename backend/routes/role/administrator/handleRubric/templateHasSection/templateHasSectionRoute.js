import {
  express, createTemplateHasSection, updateTemplateHasSection, deleteTemplateHasSection, validateTemplateID, validateArrayTemplateHasSectionID, validateArrayData, validateTemplateHasSectionArray,
} from './templateHasSectionModules.js';

const templateHasSectionRoute = express.Router();

templateHasSectionRoute.route('/')
  .post(validateTemplateID, validateArrayData, createTemplateHasSection)
  .put(validateTemplateID, validateTemplateHasSectionArray, updateTemplateHasSection)
  .delete(validateArrayTemplateHasSectionID, validateTemplateID, deleteTemplateHasSection);
export default templateHasSectionRoute;
