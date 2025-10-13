import {
  express,
  listUserHasPermission,
  createUserHasPermission,
  updateUserHasPermission,
  deleteUserHasPermission,
  validateUserID,
  validateArrayUserHasPermissionID,
  validateArrayData,
} from './userHasPermission.modules.js';

const userHasPermissionRoute = express.Router();

userHasPermissionRoute.route('/')
  .get(validateUserID, listUserHasPermission)
  .post(
    validateArrayData,
    validateUserID,
    createUserHasPermission,
  )
  .put(
    validateArrayData,
    updateUserHasPermission,
  )
  .delete(
    validateArrayUserHasPermissionID,
    deleteUserHasPermission,
  );
export default userHasPermissionRoute;
