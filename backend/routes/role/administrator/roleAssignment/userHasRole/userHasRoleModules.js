/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
import express from 'express';
import listUserHasRoles from './listUserHasRoles/listUserHasRoles.js';
import listUserHasRole from './listUserHasRole/listUserHasRole.js';
import listAllRole from './listAllRole/listAllRole.js';
import listAcademic from './listAcademic/listAcademic.js';
import listStudent from './listStudent/listStudent.js';
import createUserHasRole from './createUserHasRole/createUserHasRole.js';
import deleteUserHasRole from './deleteUserHasRole/deleteUserHasRole.js';
import validateAllowedRoles from '../user/validateAllowedRoles/validateAllowedRoles.js';

import validateUserID from '../../../../../validations/user/validateUserID/validateUserID.js';
import validateArrayRoleID from '../../../../../validations/role/validateArrayRoleID/validateArrayRoleID.js';

export {
  express,
  listUserHasRole,
  listUserHasRoles,
  listAllRole,
  listAcademic,
  listStudent,
  createUserHasRole,
  deleteUserHasRole,
  validateAllowedRoles,
  validateUserID,
  validateArrayRoleID,
};
