/* eslint-disable import/extensions */
import express from 'express';
import listEvaluationStatus from '../../../administrator/handleSpecialization/evaluationStatus/listEvaluationStatus/listEvaluationStatus.js';
import updateEvaluator from './updateEvaluator/updateEvaluator.js';
import updateAnswer from './updateAnswer/updateAnswer.js';
import validateDataArray from '../../../../../validations/handleRubric/answer/validateDataArray/validateDataArray.js';

import validateEvaluatorID from '../../../../../validations/handleSpecialization/evaluator/validateEvaluatorID/validateEvaluatorID.js';
import validateEvaluationTypeID from '../../../../../validations/handleSpecialization/evaluationType/validateEvaluationTypeID/validateEvaluationTypeID.js';
import validateGrade1 from '../../../../../validations/handleSpecialization/evaluator/validateGrade1/validateGrade1.js';
import validateComment from '../../../../../validations/handleSpecialization/evaluator/validateComment/validateComment.js';
import validateEvaluationStatusID from '../../../../../validations/handleSpecialization/evaluationStatus/validateEvaluationStatusID/validateEvaluationStatusID.js';

export {
  express,
  listEvaluationStatus,
  updateEvaluator,
  updateAnswer,
  validateEvaluatorID,
  validateDataArray,
  validateEvaluationTypeID,
  validateEvaluationStatusID,
  validateGrade1,
  validateComment,
};
