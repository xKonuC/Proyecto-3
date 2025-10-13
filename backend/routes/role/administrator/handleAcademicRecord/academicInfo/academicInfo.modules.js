/* eslint-disable import/extensions */
import express from 'express';
import { handleFileUpload } from '../../../handleRoutes/handleFileUpload/handleFileUpload.js';
import { uploadArchiveToBucket } from '../../../handleRoutes/uploadArchiveToBucket/uploadArchiveToBucket.js';

import listAcademicInfo from './listAcademicInfo/listAcademicInfo.js';
import createAcademicInfo from './createAcademicInfo/createAcademicInfo.js';
import updateAcademicInfo from './updateAcademicInfo/updateAcademicInfo.js';

import validateUserID from '../../../../../validations/user/validateUserID/validateUserID.js';
import validateBestDegreeID from '../../../../../validations/handleAcademicRecord/academicInfo/validateBestDegreeID/validateBestDegreeID.js';
import validateAcademicInfo from '../../../../../validations/handleAcademicRecord/academicInfo/validateAcademicInfo/validateAcademicInfo.js';

export {
  express,
  handleFileUpload,
  uploadArchiveToBucket,
  listAcademicInfo,
  createAcademicInfo,
  updateAcademicInfo,
  validateUserID,
  validateBestDegreeID,
  validateAcademicInfo,
};
