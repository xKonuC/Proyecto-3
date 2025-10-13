import {
  express,
  userRoute,
  userHasRoleRoute,
  importUsersRoute,
  userHasPermissionRoute,
} from './roleAssignment.modules.js';

const roleAssignmentRoute = express.Router();
roleAssignmentRoute.use('/user', userRoute);
roleAssignmentRoute.use('/userHasRole', userHasRoleRoute);
roleAssignmentRoute.use('/importUsers', importUsersRoute);
roleAssignmentRoute.use('/userHasPermission', userHasPermissionRoute);
export default roleAssignmentRoute;
