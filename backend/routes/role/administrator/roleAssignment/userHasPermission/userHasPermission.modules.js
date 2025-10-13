/* eslint-disable import/extensions */
import express from 'express';

import listUserHasPermission from './listUserHasPermission/listUserHasPermission.js';
import createUserHasPermission from './createUserHasPermission/createUserHasPermission.js';
import updateUserHasPermission from './updateUserHasPermission/updateUserHasPermission.js';
import deleteUserHasPermission from './deleteUserHasPermission/deleteUserHasPermission.js';
import validateUserID from '../../../../../validations/user/validateUserID/validateUserID.js';
import validateArrayUserHasPermissionID from '../../../../../validations/handleSpecialization/userHasPermission/validateArrayUserHasPermissionID/validateArrayUserHasPermissionID.js';
import validateArrayData from '../../../../../validations/handleSpecialization/userHasPermission/validateArrayData/validateArrayData.js';

export {
  express,
  listUserHasPermission,
  createUserHasPermission,
  updateUserHasPermission,
  deleteUserHasPermission,
  validateUserID,
  validateArrayUserHasPermissionID,
  validateArrayData,
};
