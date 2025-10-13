/* eslint-disable import/extensions */
import express from 'express';
import listSection from './listSection/listSection.js';
import listEnableSection from './listEnableSection/listEnableSection.js';
import createSection from './createSection/createSection.js';
import updateSection from './updateSection/updateSection.js';
import enableSection from './enableSection/enableSection.js';
import disableSection from './disableSection/disableSection.js';
import validateArraySectionID from '../../../../../validations/handleRubric/section/validateArraySectionID/validateArraySectionID.js';
import validateSectionID from '../../../../../validations/handleRubric/section/validateSectionID/validateSectionID.js';
import validateName from '../../../../../validations/handleRubric/section/validateName/validateName.js';

export {
  express,
  listEnableSection,
  listSection,
  createSection,
  updateSection,
  enableSection,
  disableSection,
  validateArraySectionID,
  validateSectionID,
  validateName,
};
