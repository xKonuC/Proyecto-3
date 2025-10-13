import {
  express,
  listGuidedThesis,
  createGuidedThesis,
  updateGuidedThesis,
  deleteGuidedThesis,
  validateUserID,
  validateGuidedThesisID,
  validateGuidedThesis,
  validateArrayGuidedThesisID,
} from './guidedThesis.modules.js';

const guidedThesisRoute = express.Router();

guidedThesisRoute.route('/')
  .get(validateUserID, listGuidedThesis)
  .post(validateUserID, validateGuidedThesis, createGuidedThesis)
  .put(validateUserID, validateGuidedThesisID, validateGuidedThesis, updateGuidedThesis)
  .delete(validateArrayGuidedThesisID, deleteGuidedThesis);

export default guidedThesisRoute;
