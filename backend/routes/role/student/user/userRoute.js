import {
  express,
  listUserByUserID,
  listUserHasPermission,
  updatePassword,
  updateProfile,
  validatePassword,
} from './userModules.js';

const userRoute = express.Router();

userRoute.get('/listPermission', listUserHasPermission);

userRoute.put('/updatePassword', validatePassword, updatePassword);

// 🔹 ACTUALIZAR PERFIL
userRoute.put('/profile', updateProfile);

userRoute.route('/')
  .get(listUserByUserID);

export default userRoute;
