/* eslint-disable import/extensions */
import express from 'express';
import verifyPermissionWithExpiration from '../../../handleRoutes/permission/verifyPermissionWithExpiration/verifyPermissionWithExpiration.js';

import getThesisRegistration from './getThesisRegistration/getThesisRegistration.js';
import createThesisRegistration from './createThesisRegistration/createThesisRegistration.js';
import updateThesisRegistration from './updateThesisRegistration/updateThesisRegistration.js';
import listAdministrative from './listAdministrative/listAdministrative.js';

import validateThesisRegistrationID from '../../../../../validations/handleSpecialization/thesisRegistration/validateThesisRegistrationID/validateThesisRegistrationID.js';
import validateThesisRegistration from '../../../../../validations/handleSpecialization/thesisRegistration/validateThesisRegistration/validateThesisRegistration.js';

export {
  express,
  verifyPermissionWithExpiration,
  getThesisRegistration,
  createThesisRegistration,
  updateThesisRegistration,
  listAdministrative,
  validateThesisRegistrationID,
  validateThesisRegistration,
};
