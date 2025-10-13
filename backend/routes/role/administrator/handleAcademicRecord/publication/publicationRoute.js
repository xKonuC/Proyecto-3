import {
  express,
  listPublication,
  createPublication,
  updatePublication,
  deletePublication,
  validateUserID,
  validatePublicationID,
  validatePublication,
  validateArrayPublicationID,
} from './publication.modules.js';

const publicationRoute = express.Router();

publicationRoute.route('/')
  .get(validateUserID, listPublication)
  .post(validateUserID, validatePublication, createPublication)
  .put(validateUserID, validatePublicationID, validatePublication, updatePublication)
  .delete(validateArrayPublicationID, deletePublication);

export default publicationRoute;
