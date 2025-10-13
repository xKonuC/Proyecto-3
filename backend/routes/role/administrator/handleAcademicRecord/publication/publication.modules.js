/* eslint-disable import/extensions */
import express from 'express';
import { handleFileUpload } from '../../../handleRoutes/handleFileUpload/handleFileUpload.js';
import { uploadArchiveToBucket } from '../../../handleRoutes/uploadArchiveToBucket/uploadArchiveToBucket.js';

import listPublication from './listPublication/listPublication.js';
import createPublication from './createPublication/createPublication.js';
import updatePublication from './updatePublication/updatePublication.js';
import deletePublication from './deletePublication/deletePublication.js';

import validateUserID from '../../../../../validations/user/validateUserID/validateUserID.js';
import validatePublicationID from '../../../../../validations/handleAcademicRecord/publication/validatePublicationID/validatePublicationID.js';
import validatePublication from '../../../../../validations/handleAcademicRecord/publication/validatePublication/validatePublication.js';
import validateArrayPublicationID from '../../../../../validations/handleAcademicRecord/publication/validateArrayPublicationID/validateArrayPublicationID.js';

export {
  express,
  handleFileUpload,
  uploadArchiveToBucket,
  listPublication,
  createPublication,
  updatePublication,
  deletePublication,
  validateUserID,
  validatePublicationID,
  validatePublication,
  validateArrayPublicationID,
};
