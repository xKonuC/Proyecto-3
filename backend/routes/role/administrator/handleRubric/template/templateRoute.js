import {
  express,
  listTemplateOverview,
  listTemplate,
  createTemplate,
  updateTemplate,
  enableTemplate,
  disableTemplate,
  validateArrayTemplateID,
  validateTemplateID,
  validateName,
  validateDescription,
  listEnableTemplate,
} from './templateModules.js';

const templateRoute = express.Router();

templateRoute.get('/templateOverview', validateTemplateID, listTemplateOverview);
templateRoute.get('/enable', listEnableTemplate);
templateRoute.put('/enable', validateArrayTemplateID, enableTemplate);
templateRoute.put('/disable', validateArrayTemplateID, disableTemplate);
templateRoute.route('/')
  .get(listTemplate)
  .post(validateName, validateDescription, createTemplate)
  .put(validateTemplateID, validateName, validateDescription, updateTemplate);
export default templateRoute;
