/* eslint-disable import/extensions */
import express from 'express';
import listThesisRegistration from './listThesisRegistration/listThesisRegistration.js';
import createThesisRegistration from './createThesisRegistration/createThesisRegistration.js';
import updateThesisRegistration from './updateThesisRegistration/updateThesisRegistration.js';
import deleteThesisRegistration from './deleteThesisRegistration/deleteThesisRegistration.js';
import listStudent from './listStudent/listStudent.js';

import validateArrayThesisRegistrationID from '../../../../validations/handleSpecialization/thesisRegistration/validateArrayThesisRegistrationID/validateArrayThesisRegistrationID.js';
import validateThesisRegistrationID from '../../../../validations/handleSpecialization/thesisRegistration/validateThesisRegistrationID/validateThesisRegistrationID.js';
import validateThesisRegistration from '../../../../validations/handleSpecialization/thesisRegistration/validateThesisRegistration/validateThesisRegistration.js';
import validateStudentID from '../../../../validations/handleSpecialization/thesisRegistration/validateStudentID/validateStudentID.js';

export {
  express,
  listThesisRegistration,
  createThesisRegistration,
  updateThesisRegistration,
  deleteThesisRegistration,
  listStudent,
  validateArrayThesisRegistrationID,
  validateThesisRegistrationID,
  validateThesisRegistration,
  validateStudentID,
};
