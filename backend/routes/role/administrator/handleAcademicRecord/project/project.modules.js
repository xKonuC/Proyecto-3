/* eslint-disable import/extensions */
import express from 'express';
import { handleFileUpload } from '../../../handleRoutes/handleFileUpload/handleFileUpload.js';
import { uploadArchiveToBucket } from '../../../handleRoutes/uploadArchiveToBucket/uploadArchiveToBucket.js';

import listProject from './listProject/listProject.js';
import createProject from './createProject/createProject.js';
import updateProject from './updateProject/updateProject.js';
import deleteProject from './deleteProject/deleteProject.js';

import validateUserID from '../../../../../validations/user/validateUserID/validateUserID.js';
import validateProjectID from '../../../../../validations/handleAcademicRecord/project/validateProjectID/validateProjectID.js';
import validateProject from '../../../../../validations/handleAcademicRecord/project/validateProject/validateProject.js';
import validateArrayProjectID from '../../../../../validations/handleAcademicRecord/project/validateArrayProjectID/validateArrayProjectID.js';

export {
  express,
  handleFileUpload,
  uploadArchiveToBucket,
  listProject,
  createProject,
  updateProject,
  deleteProject,
  validateUserID,
  validateProjectID,
  validateProject,
  validateArrayProjectID,
};
