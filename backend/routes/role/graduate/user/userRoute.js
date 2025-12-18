import {
  express, listUserByUserID, listUserHasPermission, updatePassword, validatePassword, updateUser, updateEmail,
} from './userModules.js';

const userRoute = express.Router();
userRoute.get('/listPermission', listUserHasPermission);
userRoute.put('/updatePassword', validatePassword, updatePassword);
userRoute.route('/')
  .get(listUserByUserID)
  .put(updateUser, updateEmail);
export default userRoute;
