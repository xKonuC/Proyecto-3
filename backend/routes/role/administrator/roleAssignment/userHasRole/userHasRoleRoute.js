import {
  express, createUserHasRole, listUserHasRoles, listUserHasRole, listAllRole, listAcademic, listStudent, deleteUserHasRole, validateAllowedRoles, validateUserID, validateArrayRoleID,
} from './userHasRoleModules.js';

const userHasRoleRoute = express.Router();
userHasRoleRoute.get('/userHasRoles', listUserHasRoles);
userHasRoleRoute.get('/roles', listAllRole);
userHasRoleRoute.get('/academic', listAcademic);
userHasRoleRoute.get('/student', listStudent);
userHasRoleRoute.route('/')
  .get(validateUserID, listUserHasRole)
  .post(
    validateAllowedRoles,
    validateUserID,
    validateArrayRoleID,
    createUserHasRole,
  )
  .delete(
    validateAllowedRoles,
    validateUserID,
    validateArrayRoleID,
    deleteUserHasRole,
  );

export default userHasRoleRoute;
