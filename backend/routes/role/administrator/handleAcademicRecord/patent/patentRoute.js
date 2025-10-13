import {
  express,
  listPatent,
  createPatent,
  updatePatent,
  deletePatent,
  validateUserID,
  validatePatentID,
  validatePatent,
  validateArrayPatentID,
} from './patent.modules.js';

const patentRoute = express.Router();

patentRoute.route('/')
  .get(validateUserID, listPatent)
  .post(validateUserID, validatePatent, createPatent)
  .put(validateUserID, validatePatentID, validatePatent, updatePatent)
  .delete(validateArrayPatentID, deletePatent);

export default patentRoute;
