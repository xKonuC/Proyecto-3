/* eslint-disable import/extensions */
import express from 'express';
import { handleFileUpload } from '../../../handleRoutes/handleFileUpload/handleFileUpload.js';
import { uploadArchiveToBucket } from '../../../handleRoutes/uploadArchiveToBucket/uploadArchiveToBucket.js';

import listConsultancy from './listConsultancy/listConsultancy.js';
import createConsultancy from './createConsultancy/createConsultancy.js';
import updateConsultancy from './updateConsultancy/updateConsultancy.js';
import deleteConsultancy from './deleteConsultancy/deleteConsultancy.js';

import validateUserID from '../../../../../validations/user/validateUserID/validateUserID.js';
import validateConsultancyID from '../../../../../validations/handleAcademicRecord/consultancy/validateConsultancyID/validateConsultancyID.js';
import validateConsultancy from '../../../../../validations/handleAcademicRecord/consultancy/validateConsultancy/validateConsultancy.js';
import validateArrayConsultancyID from '../../../../../validations/handleAcademicRecord/consultancy/validateArrayConsultancyID/validateArrayConsultancyID.js';

export {
  express,
  handleFileUpload,
  uploadArchiveToBucket,
  listConsultancy,
  createConsultancy,
  updateConsultancy,
  deleteConsultancy,
  validateUserID,
  validateConsultancyID,
  validateConsultancy,
  validateArrayConsultancyID,
};
