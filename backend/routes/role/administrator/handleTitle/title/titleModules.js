/* eslint-disable import/extensions */
import express from 'express';
import listDegree from './listDegree/listDegree.js';
import listUniversity from './listUniversity/listUniversity.js';
import listTitle from './listTitle/listTitle.js';
import createTitle from './createTitle/createTitle.js';
import updateTitle from './updateTitle/updateTitle.js';
import deleteTitle from './deleteTitle/deleteTitle.js';

import validateTitleID from '../../../../../validations/handleTitle/title/validateTitleID/validateTitleID.js';
import validateArrayTitleID from '../../../../../validations/handleTitle/title/validateArrayTitleID/validateArrayTitleID.js';
import validateName from '../../../../../validations/handleTitle/title/validateName/validateName.js';
import validateDegreeID from '../../../../../validations/handleTitle/title/validateDegreeID/validateDegreeID.js';
import validateUniversityID from '../../../../../validations/handleTitle/title/validateUniversityID/validateUniversityID.js';
import validateAreaID from '../../../../../validations/handleTitle/title/validateAreaID/validateAreaID.js';

export {
  express,
  listDegree,
  listUniversity,
  listTitle,
  createTitle,
  updateTitle,
  deleteTitle,
  validateTitleID,
  validateArrayTitleID,
  validateName,
  validateUniversityID,
  validateDegreeID,
  validateAreaID,
};
