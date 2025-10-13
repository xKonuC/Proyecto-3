/* eslint-disable import/extensions */
import express from 'express';
import listRubricOverview from './listRubricOverview/listRubricOverview.js';
import listTemplateOverview from './listTemplateOverview/listTemplateOverview.js';
import updateRubric from './updateRubric/updateRubric.js';
import updateTemplateID from './updateTemplateID/updateTemplateID.js';
import validateRubricID from '../../../../../validations/handleRubric/rubric/validateRubricID/validateRubricID.js';
import validateEvaluationStatusID from '../../../../../validations/handleSpecialization/evaluationStatus/validateEvaluationStatusID/validateEvaluationStatusID.js';
import validateDescription from '../../../../../validations/handleRubric/rubric/validateDescription/validateDescription.js';
import validateRubricName from '../../../../../validations/handleRubric/rubric/validateRubricName/validateRubricName.js';
import validateComment from '../../../../../validations/handleRubric/rubric/validateComment/validateComment.js';
import validateEvaluationTypeID from '../../../../../validations/handleSpecialization/evaluationType/validateEvaluationTypeID/validateEvaluationTypeID.js';

export {
  express,
  listRubricOverview,
  listTemplateOverview,
  updateRubric,
  updateTemplateID,
  validateRubricID,
  validateRubricName,
  validateDescription,
  validateComment,
  validateEvaluationTypeID,
  validateEvaluationStatusID,
};
