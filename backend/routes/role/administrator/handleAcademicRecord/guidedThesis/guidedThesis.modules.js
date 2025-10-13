/* eslint-disable import/extensions */
import express from 'express';
import { handleFileUpload } from '../../../handleRoutes/handleFileUpload/handleFileUpload.js';
import { uploadArchiveToBucket } from '../../../handleRoutes/uploadArchiveToBucket/uploadArchiveToBucket.js';

import listGuidedThesis from './listGuidedThesis/listGuidedThesis.js';
import createGuidedThesis from './createGuidedThesis/createGuidedThesis.js';
import updateGuidedThesis from './updateGuidedThesis/updateGuidedThesis.js';
import deleteGuidedThesis from './deleteGuidedThesis/deleteGuidedThesis.js';

import validateUserID from '../../../../../validations/user/validateUserID/validateUserID.js';
import validateGuidedThesisID from '../../../../../validations/handleAcademicRecord/guidedThesis/validateGuidedThesisID/validateGuidedThesisID.js';
import validateGuidedThesis from '../../../../../validations/handleAcademicRecord/guidedThesis/validateGuidedThesis/validateGuidedThesis.js';
import validateArrayGuidedThesisID from '../../../../../validations/handleAcademicRecord/guidedThesis/validateArrayGuidedThesisID/validateArrayGuidedThesisID.js';

export {
  express,
  handleFileUpload,
  uploadArchiveToBucket,
  listGuidedThesis,
  createGuidedThesis,
  updateGuidedThesis,
  deleteGuidedThesis,
  validateUserID,
  validateGuidedThesisID,
  validateGuidedThesis,
  validateArrayGuidedThesisID,
};
