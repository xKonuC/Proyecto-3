/* eslint-disable import/extensions */
import express from 'express';
import listRubricOverview from './listRubricOverview/listRubricOverview.js';
import createRubric from './createRubric/createRubric.js';
import buildRubric from './buildRubric/buildRubric.js';
import updateRubricID from './updateRubricID/updateRubricID.js';
import updateRubric from './updateRubric/updateRubric.js';
import deleteRubricHasSection from './deleteRubricHasSection/deleteRubricHasSection.js';

import validateEvaluationID from '../../../../../validations/handleSpecialization/evaluation/validateEvaluationID/validateEvaluationID.js';
import validateTemplateID from '../../../../../validations/handleRubric/template/validateTemplateID/validateTemplateID.js';
import validateRubricID from '../../../../../validations/handleRubric/rubric/validateRubricID/validateRubricID.js';
import validateDescription from '../../../../../validations/handleRubric/rubric/validateDescription/validateDescription.js';
import validateRubricName from '../../../../../validations/handleRubric/rubric/validateRubricName/validateRubricName.js';
import validateIsUpdateTemplateID from '../../../../../validations/handleRubric/rubric/validateIsUpdateTemplateID/validateIsUpdateTemplateID.js';
import validateEvaluationTypeID from '../../../../../validations/handleSpecialization/evaluationType/validateEvaluationTypeID/validateEvaluationTypeID.js';
import validateEvaluators from '../../../../../validations/handleSpecialization/evaluator/validateEvaluators/validateEvaluators.js';

export {
  express,
  listRubricOverview,
  createRubric,
  buildRubric,
  updateRubric,
  updateRubricID,
  deleteRubricHasSection,
  validateEvaluationID,
  validateRubricID,
  validateRubricName,
  validateDescription,
  validateTemplateID,
  validateIsUpdateTemplateID,
  validateEvaluationTypeID,
  validateEvaluators,
};
