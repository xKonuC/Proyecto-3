/* eslint-disable import/extensions */
import express from 'express';
import listEvaluation from './listEvaluation/listEvaluation.js';
import updateComments from './updateComments/updateComments.js';

import validateEvaluationID from '../../../../validations/handleSpecialization/evaluation/validateEvaluationID/validateEvaluationID.js';
import validateEvaluationTypeID from '../../../../validations/handleSpecialization/evaluationType/validateEvaluationTypeID/validateEvaluationTypeID.js';
import validatePreprojectEvaluatorID from '../../../../validations/handleSpecialization/evaluator/validatePreprojectEvaluatorID/validatePreprojectEvaluatorID.js';
import validateComments from '../../../../validations/handleSpecialization/evaluator/validateComments/validateComments.js';
import validateReviewCompleted from '../../../../validations/handleSpecialization/evaluator/validateReviewCompleted/validateReviewCompleted.js';

export {
  express,
  listEvaluation,
  updateComments,
  validateEvaluationID,
  validateEvaluationTypeID,
  validatePreprojectEvaluatorID,
  validateComments,
  validateReviewCompleted,
};
