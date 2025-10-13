/* eslint-disable import/extensions */
import express from 'express';
import { handleFileUpload } from '../../../handleRoutes/handleFileUpload/handleFileUpload.js';
import { uploadArchiveToBucket } from '../../../handleRoutes/uploadArchiveToBucket/uploadArchiveToBucket.js';

import listBookChapter from './listBookChapter/listBookChapter.js';
import createBookChapter from './createBookChapter/createBookChapter.js';
import updateBookChapter from './updateBookChapter/updateBookChapter.js';
import deleteBookChapter from './deleteBookChapter/deleteBookChapter.js';

import validateUserID from '../../../../../validations/user/validateUserID/validateUserID.js';
import validateBookChapterID from '../../../../../validations/handleAcademicRecord/bookChapter/validateBookChapterID/validateBookChapterID.js';
import validateBookChapter from '../../../../../validations/handleAcademicRecord/bookChapter/validateBookChapter/validateBookChapter.js';
import validateArrayBookChapterID from '../../../../../validations/handleAcademicRecord/bookChapter/validateArrayBookChapterID/validateArrayBookChapterID.js';

export {
  express,
  handleFileUpload,
  uploadArchiveToBucket,
  listBookChapter,
  createBookChapter,
  updateBookChapter,
  deleteBookChapter,
  validateUserID,
  validateBookChapterID,
  validateBookChapter,
  validateArrayBookChapterID,
};
