import {
  express, createUserHasRole, listUserHasRoles, listUserHasRole, listAllRole, listAcademic, listStudent, deleteUserHasRole, validateAllowedRoles, validateUserID, validateArrayRoleID,
} from './userHasRoleModules.js';
import { protectRoleAssignment, protectSensitiveData } from '../../../../../middleware/roleAssignmentProtection.js';

const userHasRoleRoute = express.Router();
userHasRoleRoute.get('/userHasRoles', listUserHasRoles);
userHasRoleRoute.get('/roles', listAllRole);
userHasRoleRoute.get('/academic', listAcademic);
userHasRoleRoute.get('/student', listStudent);
userHasRoleRoute.route('/')
  .get(validateUserID, protectSensitiveData, listUserHasRole)
  .post(
    protectRoleAssignment,
    validateAllowedRoles,
    validateUserID,
    validateArrayRoleID,
    createUserHasRole,
  )
  .delete(
    protectRoleAssignment,
    validateAllowedRoles,
    validateUserID,
    validateArrayRoleID,
    deleteUserHasRole,
  );

export default userHasRoleRoute;
