/* eslint-disable import/extensions */
import express from 'express';
import { handleFileUpload } from '../../../handleRoutes/handleFileUpload/handleFileUpload.js';
import { uploadArchiveToBucket } from '../../../handleRoutes/uploadArchiveToBucket/uploadArchiveToBucket.js';

import listTitle from '../title/listTitle/listTitle.js';
import listAcademicHasTitle from './listAcademicHasTitle/listAcademicHasTitle.js';
import createAcademicHasTitle from './createAcademicHasTitle/createAcademicHasTitle.js';
import updateAcademicHasTitle from './updateAcademicHasTitle/updateAcademicHasTitle.js';
import deleteAcademicHasTitle from './deleteAcademicHasTitle/deleteAcademicHasTitle.js';

import validateUserID from '../../../../../validations/user/validateUserID/validateUserID.js';
import validateTitleID from '../../../../../validations/handleTitle/title/validateTitleID/validateTitleID.js';
import validateTitleYear from '../../../../../validations/handleTitle/studentHasTitle/validateTitleYear/validateTitleYear.js';
import validateStudyField from '../../../../../validations/handleTitle/academicHasTitle/validateStudyField/validateStudyField.js';
import validateArchiveURL from '../../../../../validations/handleTitle/academicHasTitle/validateArchiveURL/validateArchiveURL.js';

import validateArrayAcademicHasTitleID from '../../../../../validations/handleTitle/academicHasTitle/validateArrayAcademicHasTitleID/validateArrayAcademicHasTitleID.js';
import validateAcademicHasTitleID from '../../../../../validations/handleTitle/academicHasTitle/validateAcademicHasTitleID/validateAcademicHasTitleID.js';

export {
  express,
  handleFileUpload,
  uploadArchiveToBucket,
  listTitle,
  listAcademicHasTitle,
  createAcademicHasTitle,
  updateAcademicHasTitle,
  deleteAcademicHasTitle,
  validateUserID,
  validateTitleID,
  validateStudyField,
  validateArchiveURL,
  validateArrayAcademicHasTitleID,
  validateTitleYear,
  validateAcademicHasTitleID,
};
