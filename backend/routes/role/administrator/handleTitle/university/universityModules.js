/* eslint-disable import/extensions */
import express from 'express';

import listUniversity from './listUniversity/listUniversity.js';
import createUniversity from './createUniversity/createUniversity.js';
import updateUniversity from './updateUniversity/updateUniversity.js';
import deleteUniversity from './deleteUniversity/deleteUniversity.js';

import validateArrayUniversityID from '../../../../../validations/handleTitle/university/validateArrayUniversityID/validateArrayUniversityID.js';
import validateUniversityID from '../../../../../validations/handleTitle/university/validateUniversityID/validateUniversityID.js';
import validateName from '../../../../../validations/handleTitle/university/validateName/validateName.js';
import validateCity from '../../../../../validations/handleTitle/university/validateCity/validateCity.js';
import validateCountry from '../../../../../validations/handleTitle/university/validateCountry/validateCountry.js';

export {
  express,
  listUniversity,
  createUniversity,
  updateUniversity,
  deleteUniversity,
  validateArrayUniversityID,
  validateUniversityID,
  validateName,
  validateCity,
  validateCountry,
};
