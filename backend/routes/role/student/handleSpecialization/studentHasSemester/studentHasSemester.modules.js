/* eslint-disable import/extensions */
import express from 'express';
import verifyPermissionWithExpiration from '../../../handleRoutes/permission/verifyPermissionWithExpiration/verifyPermissionWithExpiration.js';

import listEvaluationType from './listEvaluationType/listEvaluationType.js';
import listStudentHasSemester from './listStudentHasSemester/listStudentHasSemester.js';
import createStudentHasSemester from './createStudentHasSemester/createStudentHasSemester.js';
import updateStudentHasSemester from './updateStudentHasSemester/updateStudentHasSemester.js';
import verificationApproval from './verificationApproval/verificationApproval.js';

import listStudentHasElective from './handleElective/listStudentHasElective/listStudentHasElective.js';
import createStudentHasElective from './handleElective/createStudentHasElective/createStudentHasElective.js';
import updateStudentHasElective from './handleElective/updateStudentHasElective/updateStudentHasElective.js';
import verifyElective from './handleElective/verifyElective/verifyElective.js';

import validateStudentHasElectiveID from '../../../../../validations/handleSpecialization/studentHasElective/validateStudentHasElectiveID/validateStudentHasElectiveID.js';
import validateStudentHasSemesterID from '../../../../../validations/handleSpecialization/studentHasSemester/validateStudentHasSemesterID/validateStudentHasSemesterID.js';
import validateSemesterID from '../../../../../validations/handleSpecialization/semester/validateSemesterID/validateSemesterID.js';
import validateEvaluationTypeID from '../../../../../validations/handleSpecialization/evaluationType/validateEvaluationTypeID/validateEvaluationTypeID.js';
import validateSpecializationID from '../../../../../validations/handleSpecialization/specialization/validateSpecializationID/validateSpecializationID.js';
import validateElectiveID from '../../../../../validations/handleSpecialization/elective/validateElectiveID/validateElectiveID.js';
import validateNumber from '../../../../../validations/handleSpecialization/elective/validateNumber/validateNumber.js';

export {
  express,
  verifyPermissionWithExpiration,
  listEvaluationType,
  listStudentHasSemester,
  createStudentHasSemester,
  updateStudentHasSemester,
  verificationApproval,
  listStudentHasElective,
  createStudentHasElective,
  updateStudentHasElective,
  verifyElective,
  validateStudentHasElectiveID,
  validateStudentHasSemesterID,
  validateSemesterID,
  validateEvaluationTypeID,
  validateSpecializationID,
  validateElectiveID,
  validateNumber,
};
