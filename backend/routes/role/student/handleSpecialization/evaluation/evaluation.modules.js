/* eslint-disable import/extensions */
import express from 'express';
import { handleFileUpload } from '../../../handleRoutes/handleFileUpload/handleFileUpload.js';
import { uploadArchiveToBucket } from '../../../handleRoutes/uploadArchiveToBucket/uploadArchiveToBucket.js';
import verifyPermission from '../../../handleRoutes/permission/verifyPermission/verifyPermission.js';

import listEvaluation from './listEvaluation/listEvaluation.js';
import listEvaluationRubric from './listEvaluationRubric/listEvaluationRubric.js';
import listComments from './listComments/listComments.js';
import verifyStudentHasSemester from './verifyStudentHasSemester/verifyStudentHasSemester.js';
import verifyEvaluationStatus from './verifyEvaluationStatus/verifyEvaluationStatus.js';
import verifyUpdatedEvaluationStatus from './verifyUpdatedEvaluationStatus/verifyUpdatedEvaluationStatus.js';
import createEvaluation from './createEvaluation/createEvaluation.js';
import manageEvaluation from './manageEvaluation/manageEvaluation.js';
import getProjectURL from './getProjectURL/getProjectURL.js';
import deleteProjectURL from './deleteProjectURL/deleteProjectURL.js';
import updateEvaluation from './updateEvaluation/updateEvaluation.js';

import validateEvaluatorCategoryID from '../../../../../validations/handleSpecialization/evaluator/validateEvaluatorCategoryID/validateEvaluatorCategoryID.js';
import validateEvaluationID from '../../../../../validations/handleSpecialization/evaluation/validateEvaluationID/validateEvaluationID.js';
import validateStudentHasSpecializationID from '../../../../../validations/handleSpecialization/studentHasSpecialization/validateStudentHasSpecializationID/validateStudentHasSpecializationID.js';
import validateStudentHasSemesterID from '../../../../../validations/handleSpecialization/studentHasSemester/validateStudentHasSemesterID/validateStudentHasSemesterID.js';
import validateRubricID from '../../../../../validations/handleRubric/rubric/validateRubricID/validateRubricID.js';
import validateEvaluationTypeID from '../../../../../validations/handleSpecialization/evaluationType/validateEvaluationTypeID/validateEvaluationTypeID.js';

export {
  express,
  handleFileUpload,
  uploadArchiveToBucket,
  verifyPermission,
  listEvaluationRubric,
  listEvaluation,
  listComments,
  verifyStudentHasSemester,
  verifyEvaluationStatus,
  verifyUpdatedEvaluationStatus,
  createEvaluation,
  manageEvaluation,
  getProjectURL,
  deleteProjectURL,
  updateEvaluation,
  validateEvaluatorCategoryID,
  validateStudentHasSpecializationID,
  validateStudentHasSemesterID,
  validateEvaluationID,
  validateRubricID,
  validateEvaluationTypeID,
};
