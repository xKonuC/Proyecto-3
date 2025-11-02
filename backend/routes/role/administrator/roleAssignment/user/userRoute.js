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

const userRoute = express.Router();
userRoute.put('/updateEmail', validateUserID, validateEmail, updateEmail);
userRoute.put('/updatePassword', validateUserID, validatePassword, updatePassword);
userRoute.get('/user', validateUserID, listUserByUserID);
userRoute.route('/')
  .get(listUser)
  .post(validateAllowedRoles, validateArrayRoleID, validateUser, createUser, createRoleHasNewUser)
  .put(validateUserID, validateUser, validatePreviousEmail, updateUser, updateEmail)
  .delete(validateArrayUserID, deleteUser);

export default userRoute;
