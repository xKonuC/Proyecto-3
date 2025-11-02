import {
  express, signin, signinWithGoogle, recoverPassword, changePassword, refreshToken, signinAdministrative, signinWithGoogleAdministrative, verifyAdministrative, validateEmail, validatePassword,
} from './auth.modules.js';
import signinStudent from './signinStudent/signinStudent.js';

const authRoute = express.Router();

authRoute.post(
  '/signinWithEmail',
  validateEmail,
  validatePassword,
  signin,
);
authRoute.post(
  '/administrative/signinWithEmail',
  validateEmail,
  validatePassword,
  signinAdministrative,
);
authRoute.post(
  '/student/signinWithEmail',
  validateEmail,
  validatePassword,
  signinStudent,
);
authRoute.get('/signinWithGoogle', signinWithGoogle);
authRoute.get('/administrative/signinWithGoogle', signinWithGoogleAdministrative);
authRoute.post(
  '/verifyAdministrative',
  verifyAdministrative,
);
authRoute.post('/recoverPassword', validateEmail, recoverPassword);
authRoute.post('/changePassword', validatePassword, changePassword);
authRoute.post('/refreshToken', refreshToken);

export default authRoute;
