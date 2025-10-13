/* eslint-disable import/extensions */
import express from 'express';
import verifyPermissionWithExpiration from '../../../handleRoutes/permission/verifyPermissionWithExpiration/verifyPermissionWithExpiration.js';

import listSpecialization from './listSpecialization/listSpecialization.js';
import listSemester from '../../../administrator/semester/listSemester/listSemester.js';
import listSemesterAvailability from './listSemesterAvailability/listSemesterAvailability.js';
import listStudentHasSpecialization from './listStudentHasSpecialization/listStudentHasSpecialization.js';
import createStudentHasSpecialization from './createStudentHasSpecialization/createStudentHasSpecialization.js';
import updateStudentHasSpecialization from './updateStudentHasSpecialization/updateStudentHasSpecialization.js';
import cancellationVerification from './cancellationVerification/cancellationVerification.js';

import validateStudentHasSpecializationID from '../../../../../validations/handleSpecialization/studentHasSpecialization/validateStudentHasSpecializationID/validateStudentHasSpecializationID.js';
import validateSemesterID from '../../../../../validations/handleSpecialization/semester/validateSemesterID/validateSemesterID.js';
import validateSpecializationID from '../../../../../validations/handleSpecialization/specialization/validateSpecializationID/validateSpecializationID.js';

export {
  express,
  verifyPermissionWithExpiration,
  listSpecialization,
  listSemester,
  listSemesterAvailability,
  listStudentHasSpecialization,
  createStudentHasSpecialization,
  updateStudentHasSpecialization,
  cancellationVerification,
  validateStudentHasSpecializationID,
  validateSemesterID,
  validateSpecializationID,
};
