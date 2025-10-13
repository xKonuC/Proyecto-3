import {
  express,
  verifyPermissionWithExpiration,
  getThesisRegistration,
  createThesisRegistration,
  updateThesisRegistration,
  listAdministrative,
  validateThesisRegistrationID,
  validateThesisRegistration,
} from './thesisRegistrationModules.js';

const thesisRegistrationRoute = express.Router();

thesisRegistrationRoute.get('/administrative', verifyPermissionWithExpiration(5), listAdministrative);

thesisRegistrationRoute.route('/')
  .get(getThesisRegistration)
  .post(validateThesisRegistration, verifyPermissionWithExpiration(5), createThesisRegistration)
  .put(validateThesisRegistrationID, validateThesisRegistration, verifyPermissionWithExpiration(5), updateThesisRegistration);

export default thesisRegistrationRoute;
