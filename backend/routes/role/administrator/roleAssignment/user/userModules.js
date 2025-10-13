/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
import express from 'express';
import createUser from './createUser/createUser.js';
import createRoleHasNewUser from '../userHasRole/createRoleHasNewUser/createRoleHasNewUser.js';
import listUser from './listUser/listUser.js';
import listUserByUserID from './listUserByUserID/listUserByUserID.js';
import updateUser from './updateUser/updateUser.js';
import updateEmail from './updateEmail/updateEmail.js';
import updatePassword from './updatePassword/updatePassword.js';
import deleteUser from './deleteUser/deleteUser.js';
import validateAllowedRoles from './validateAllowedRoles/validateAllowedRoles.js';

import validateArrayRoleID from '../../../../../validations/role/validateArrayRoleID/validateArrayRoleID.js';
import validateArrayUserID from '../../../../../validations/user/validateArrayUserID/validateArrayUserID.js';
import validateUserID from '../../../../../validations/user/validateUserID/validateUserID.js';
import validateUser from '../../../../../validations/user/validateUser/validateUser.js';
import validatePreviousEmail from '../../../../../validations/user/validatePreviousEmail/validatePreviousEmail.js';
import validateEmail from '../../../../../validations/auth/validateEmail/validateEmail.js';
import validatePassword from '../../../../../validations/auth/validatePassword/validatePassword.js';

export {
  express,
  createUser,
  createRoleHasNewUser,
  listUser,
  listUserByUserID,
  updateUser,
  updateEmail,
  updatePassword,
  deleteUser,
  validateAllowedRoles,
  validateArrayRoleID,
  validateArrayUserID,
  validateUserID,
  validateUser,
  validatePreviousEmail,
  validateEmail,
  validatePassword,
};
