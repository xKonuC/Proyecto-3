/* eslint-disable import/extensions */
import express from 'express';
import authRoute from './authCases/auth.route.js';
import roleRoute from './role/role.js';

import validateToken from '../token/validateToken/validateToken.js';
import validateAccess from '../validations/auth/validateAccess/validateAccess.js';

export {
  express,
  authRoute,
  roleRoute,
  validateToken,
  validateAccess,
};
