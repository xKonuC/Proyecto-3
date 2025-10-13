import {
  express, listUserByUserID, listUserHasPermission, updatePassword, validatePassword,
} from './userModules.js';

const userRoute = express.Router();
userRoute.get('/listPermission', listUserHasPermission);
userRoute.put('/updatePassword', validatePassword, updatePassword);
userRoute.route('/')
  .get(listUserByUserID);
export default userRoute;
