import {
  express,
  listUser,
  listUserByUserID,
  createUser,
  createRoleHasNewUser,
  updateUser,
  updateEmail,
  updatePassword,
  deleteUser,
  validateAllowedRoles,
  validateArrayRoleID,
  validateArrayUserID,
  validateUserID,
  validateUser,
  validatePreviousEmail,
  validateEmail,
  validatePassword,
} from './userModules.js';
import { protectUserDeletion, protectSensitiveData, protectRoleAssignment } from '../../../../../middleware/roleAssignmentProtection.js';

const userRoute = express.Router();
userRoute.put('/updateEmail', validateUserID, validateEmail, updateEmail);
userRoute.put('/updatePassword', validateUserID, validatePassword, updatePassword);
userRoute.get('/user', validateUserID, listUserByUserID);
userRoute.route('/')
  .get(protectSensitiveData, listUser)
  .post(protectRoleAssignment, validateAllowedRoles, validateArrayRoleID, validateUser, createUser, createRoleHasNewUser)
  .put(validateUserID, protectSensitiveData, validateUser, validatePreviousEmail, updateUser, updateEmail)
  .delete(protectUserDeletion, validateArrayUserID, deleteUser);

export default userRoute;
