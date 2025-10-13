/* eslint-disable import/extensions */
import express from 'express';
import createTemplateHasSection from './createTemplateHasSection/createTemplateHasSection.js';
import updateTemplateHasSection from './updateTemplateHasSection/updateTemplateHasSection.js';
import deleteTemplateHasSection from './deleteTemplateHasSection/deleteTemplateHasSection.js';
import validateArrayTemplateHasSectionID from '../../../../../validations/handleRubric/templateHasSection/validateArrayTemplateHasSectionID/validateArrayTemplateHasSectionID.js';
import validateTemplateID from '../../../../../validations/handleRubric/template/validateTemplateID/validateTemplateID.js';
import validateArrayData from '../../../../../validations/handleRubric/templateHasSection/validateArrayData/validateArrayData.js';
import validateTemplateHasSectionArray from '../../../../../validations/handleRubric/templateHasSection/validateTemplateHasSectionArray/validateTemplateHasSectionArray.js';

export {
  express,
  createTemplateHasSection,
  updateTemplateHasSection,
  deleteTemplateHasSection,
  validateArrayTemplateHasSectionID,
  validateTemplateID,
  validateArrayData,
  validateTemplateHasSectionArray,
};
