/* eslint-disable import/extensions */
import express from 'express';
import { handleFileUpload } from '../../../handleRoutes/handleFileUpload/handleFileUpload.js';
import { uploadArchiveToBucket } from '../../../handleRoutes/uploadArchiveToBucket/uploadArchiveToBucket.js';

import listTitle from './listTitle/listTitle.js';
import listStudentHasTitle from './listStudentHasTitle/listStudentHasTitle.js';
import createStudentHasTitle from './createStudentHasTitle/createStudentHasTitle.js';
import updateStudentHasTitle from './updateStudentHasTitle/updateStudentHasTitle.js';
import deleteStudentHasTitle from './deleteStudentHasTitle/deleteStudentHasTitle.js';

import validateUserID from '../../../../../validations/user/validateUserID/validateUserID.js';
import validateTitleID from '../../../../../validations/handleTitle/title/validateTitleID/validateTitleID.js';
import validateStudentHasTitleID from '../../../../../validations/handleTitle/studentHasTitle/validateStudentHasTitleID/validateStudentHasTitleID.js';
import validateArrayStudentHasTitleID from '../../../../../validations/handleTitle/studentHasTitle/validateArrayStudentHasTitleID/validateArrayStudentHasTitleID.js';
import validateTitleYear from '../../../../../validations/handleTitle/studentHasTitle/validateTitleYear/validateTitleYear.js';

export {
  express,
  handleFileUpload,
  uploadArchiveToBucket,
  listTitle,
  listStudentHasTitle,
  createStudentHasTitle,
  updateStudentHasTitle,
  deleteStudentHasTitle,
  validateUserID,
  validateTitleID,
  validateStudentHasTitleID,
  validateArrayStudentHasTitleID,
  validateTitleYear,
};
