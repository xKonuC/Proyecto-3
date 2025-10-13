import {
  express, signin, signinWithGoogle, recoverPassword, changePassword, refreshToken, signinAdministrative, signinWithGoogleAdministrative, verifyAdministrative, signup, validateEmail, validatePassword,
} from './auth.modules.js';
import validateLoginPassword from '../../validations/auth/validateLoginPassword/validateLoginPassword.js';
import signinStudent from './signinStudent/signinStudent.js';

const authRoute = express.Router();

authRoute.post(
  '/signinWithEmail',
  validateEmail,
  validateLoginPassword,
  signin,
);
authRoute.post(
  '/administrative/signinWithEmail',
  validateEmail,
  validateLoginPassword,
  signinAdministrative,
);
authRoute.post(
  '/student/signinWithEmail',
  validateEmail,
  validateLoginPassword,
  signinStudent,
);
authRoute.get('/signinWithGoogle', signinWithGoogle);
authRoute.get('/administrative/signinWithGoogle', signinWithGoogleAdministrative);
authRoute.post(
  '/verifyAdministrative',
  verifyAdministrative,
);
authRoute.post('/signup', validateEmail, validatePassword, signup);
authRoute.post('/recoverPassword', validateEmail, recoverPassword);
authRoute.post('/changePassword', validatePassword, changePassword);
authRoute.post('/refreshToken', refreshToken);

export default authRoute;
