/* eslint-disable import/extensions */
import express from 'express';
import { handleFileUpload } from '../../../handleRoutes/handleFileUpload/handleFileUpload.js';
import { uploadArchiveToBucket } from '../../../handleRoutes/uploadArchiveToBucket/uploadArchiveToBucket.js';

import listPatent from './listPatent/listPatent.js';
import createPatent from './createPatent/createPatent.js';
import updatePatent from './updatePatent/updatePatent.js';
import deletePatent from './deletePatent/deletePatent.js';

import validateUserID from '../../../../../validations/user/validateUserID/validateUserID.js';
import validatePatentID from '../../../../../validations/handleAcademicRecord/patent/validatePatentID/validatePatentID.js';
import validatePatent from '../../../../../validations/handleAcademicRecord/patent/validatePatent/validatePatent.js';
import validateArrayPatentID from '../../../../../validations/handleAcademicRecord/patent/validateArrayPatentID/validateArrayPatentID.js';

export {
  express,
  handleFileUpload,
  uploadArchiveToBucket,
  listPatent,
  createPatent,
  updatePatent,
  deletePatent,
  validateUserID,
  validatePatentID,
  validatePatent,
  validateArrayPatentID,
};
