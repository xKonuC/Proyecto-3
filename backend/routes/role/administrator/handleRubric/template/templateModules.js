/* eslint-disable import/extensions */
import express from 'express';
import listEnableTemplate from './listEnableTemplate/listEnableTemplate.js';
import listTemplate from './listTemplate/listTemplate.js';
import listTemplateOverview from './listTemplateOverview/listTemplateOverview.js';
import createTemplate from './createTemplate/createTemplate.js';
import updateTemplate from './updateTemplate/updateTemplate.js';
import enableTemplate from './enableTemplate/enableTemplate.js';
import disableTemplate from './disableTemplate/disableTemplate.js';
import validateArrayTemplateID from '../../../../../validations/handleRubric/template/validateArrayTemplateID/validateArrayTemplateID.js';
import validateTemplateID from '../../../../../validations/handleRubric/template/validateTemplateID/validateTemplateID.js';
import validateDescription from '../../../../../validations/handleRubric/template/validateDescription/validateDescription.js';
import validateName from '../../../../../validations/handleRubric/template/validateName/validateName.js';

export {
  express,
  listEnableTemplate,
  listTemplateOverview,
  listTemplate,
  createTemplate,
  updateTemplate,
  enableTemplate,
  disableTemplate,
  validateArrayTemplateID,
  validateTemplateID,
  validateName,
  validateDescription,
};
