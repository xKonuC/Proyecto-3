/* eslint-disable import/extensions */
import express from 'express';
import createRubricHasSection from './createRubricHasSection/createRubricHasSection.js';
import updateRubricHasSection from './updateRubricHasSection/updateRubricHasSection.js';
import deleteRubricHasSection from './deleteRubricHasSection/deleteRubricHasSection.js';
import validateArrayRubricHasSectionID from '../../../../../validations/handleRubric/rubricHasSection/validateArrayRubricHasSectionID/validateArrayRubricHasSectionID.js';
import validateRubricID from '../../../../../validations/handleRubric/rubric/validateRubricID/validateRubricID.js';
import validateArrayData from '../../../../../validations/handleRubric/rubricHasSection/validateArrayData/validateArrayData.js';
import validateRubricHasSectionArray from '../../../../../validations/handleRubric/rubricHasSection/validateRubricHasSectionArray/validateRubricHasSectionArray.js';

export {
  express,
  createRubricHasSection,
  updateRubricHasSection,
  deleteRubricHasSection,
  validateArrayRubricHasSectionID,
  validateRubricID,
  validateArrayData,
  validateRubricHasSectionArray,
};
