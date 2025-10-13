import {
  express,
  listThesisRegistration,
  createThesisRegistration,
  updateThesisRegistration,
  deleteThesisRegistration,
  listStudent,
  validateArrayThesisRegistrationID,
  validateThesisRegistrationID,
  validateThesisRegistration,
  validateStudentID,
} from './thesisRegistrationModules.js';

const thesisRegistrationRoute = express.Router();

thesisRegistrationRoute.get('/student', listStudent);

thesisRegistrationRoute.route('/')
  .get(listThesisRegistration)
  .post(validateStudentID, validateThesisRegistration, createThesisRegistration)
  .put(validateThesisRegistrationID, validateStudentID, validateThesisRegistration, updateThesisRegistration)
  .delete(validateArrayThesisRegistrationID, deleteThesisRegistration);

export default thesisRegistrationRoute;
