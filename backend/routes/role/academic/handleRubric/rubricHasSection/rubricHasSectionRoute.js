import {
  express, createRubricHasSection, updateRubricHasSection, deleteRubricHasSection, validateRubricID, validateArrayRubricHasSectionID, validateArrayData, validateRubricHasSectionArray,
} from './rubricHasSectionModules.js';

const rubricHasSectionRoute = express.Router();
rubricHasSectionRoute.route('/')
  .post(validateRubricID, validateArrayData, createRubricHasSection)
  .put(validateRubricID, validateRubricHasSectionArray, updateRubricHasSection)
  .delete(validateArrayRubricHasSectionID, validateRubricID, deleteRubricHasSection);
export default rubricHasSectionRoute;
