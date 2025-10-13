import {
  express, listSection, listEnableSection, createSection, updateSection, enableSection, disableSection, validateArraySectionID, validateSectionID, validateName,
} from './sectionModules.js';

const sectionRoute = express.Router();
sectionRoute.route('/enable')
  .get(listEnableSection)
  .put(validateArraySectionID, enableSection);
sectionRoute.put('/disable', validateArraySectionID, disableSection);
sectionRoute.route('/')
  .get(listSection)
  .post(validateName, createSection)
  .put(validateSectionID, validateName, updateSection);
export default sectionRoute;
