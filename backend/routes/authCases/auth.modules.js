import express from 'express';
import signin from './signin/signin.js';
import signinWithGoogle from './signinWithGoogle/signinWithGoogle.js';
import recoverPassword from './recoverPassword/recoverPassword.js';
import refreshToken from './refreshToken/refreshToken.js';
import changePassword from './changePassword/changePassword.js';
import signinAdministrative from './signinAdministrative/signinAdministrative.js';
import signinWithGoogleAdministrative from './signinWithGoogleAdministrative/signinWithGoogleAdministrative.js';
import verifyAdministrative from './verifyAdministrative/verifyAdministrative.js';
import signup from './signup/signup.js';

import validateToken from '../../token/validateToken/validateToken.js';
import validateRefreshToken from '../../validations/auth/validateRefreshToken/validateRefreshToken.js';
import validateEmail from '../../validations/auth/validateEmail/validateEmail.js';
import validatePassword from '../../validations/auth/validatePassword/validatePassword.js';
import validateAccessToken from '../../validations/auth/validateAccess/validateAccess.js';

export {
  express,
  signin,
  signinWithGoogle,
  validateToken,
  recoverPassword,
  changePassword,
  refreshToken,
  signinAdministrative,
  signinWithGoogleAdministrative,
  verifyAdministrative,
  signup,
  validateRefreshToken,
  validateEmail,
  validatePassword,
  validateAccessToken,
};
