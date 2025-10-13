/* eslint-disable import/extensions */
import express from 'express';
import listSemester from '../semester/listSemester/listSemester.js';

// Asignación de Evaluadores para un tipo de evaluación
import listAdministrative from './evaluatorAssignment/listAdministrative/listAdministrative.js';
import listAcademic from './evaluatorAssignment/listAcademic/listAcademic.js';
import listEvaluation from './evaluatorAssignment/listEvaluation/listEvaluation.js';
import createEvaluateHasUser from './evaluatorAssignment/createEvaluateHasUser/createEvaluateHasUser.js';
import updateEvaluateHasUser from './evaluatorAssignment/updateEvaluateHasUser/updateEvaluateHasUser.js';
import updateEvaluationStatus from './evaluatorAssignment/updateEvaluationStatus/updateEvaluationStatus.js';

// Asignación de un estado de evaluación
import listEvaluationStatus from './evaluationStatus/listEvaluationStatus/listEvaluationStatus.js';
import updateEvaluate from './evaluationStatus/updateEvaluate/updateEvaluate.js';
import updateStudentHasSemester from './evaluationStatus/updateStudentHasSemester/updateStudentHasSemester.js';
import updateStudentHasSpecialization from './evaluationStatus/updateStudentHasSpecialization/updateStudentHasSemester.js';

// Proceso para actualizar el estado de evaluación para muchos estudiantes
import processEvaluationData from './evaluationStatus/processEvaluation.js/processEvaluation.js';

// Actualizar Notas de la defensa Oral solo en tesis y el promedio de estas
import updateOralDefenseScores from './oralDefenseScores/updateOralDefenseScores/updateOralDefenseScores.js';
import updateThesisGrades from './oralDefenseScores/updateThesisGrades/updateThesisGrades.js';

// Actualizar Comentarios de Anteproyecto
import updateComments from '../../academic/handleSpecialization/updateComments/updateComments.js';

import validateStudentHasSemesterID from '../../../../validations/handleSpecialization/studentHasSemester/validateStudentHasSemesterID/validateStudentHasSemesterID.js';
import validateEvaluator_userID from '../../../../validations/handleSpecialization/evaluator/validateEvaluator_userID/validateEvaluator_userID.js';
import validateEvaluatorID from '../../../../validations/handleSpecialization/evaluator/validateEvaluatorID/validateEvaluatorID.js';
import validateEvaluationID from '../../../../validations/handleSpecialization/evaluation/validateEvaluationID/validateEvaluationID.js';
import validateEvaluationTypeID from '../../../../validations/handleSpecialization/evaluationType/validateEvaluationTypeID/validateEvaluationTypeID.js';
import validateStage from '../../../../validations/handleSpecialization/stage/validateStage/validateStage.js';

import validateScoresAndEvaluatorIDs from '../../../../validations/handleSpecialization/evaluator/validateScoresAndEvaluatorIDs/validateScoresAndEvaluatorIDs.js';
import validateThesisGradesID from '../../../../validations/handleSpecialization/thesisGrades/validateThesisGradesID/validateThesisGradesID.js';

import validateEvaluationStatusID from '../../../../validations/handleSpecialization/evaluationStatus/validateEvaluationStatusID/validateEvaluationStatusID.js';
import validateSemesterID from '../../../../validations/handleSpecialization/semester/validateSemesterID/validateSemesterID.js';
import validateSpecializationID from '../../../../validations/handleSpecialization/specialization/validateSpecializationID/validateSpecializationID.js';
import validateArrayData from '../../../../validations/handleSpecialization/thesisGrades/validateArrayData/validateArrayData.js';

import validatePreprojectEvaluatorID from '../../../../validations/handleSpecialization/evaluator/validatePreprojectEvaluatorID/validatePreprojectEvaluatorID.js';
import validateComments from '../../../../validations/handleSpecialization/evaluator/validateComments/validateComments.js';
import validateReviewCompleted from '../../../../validations/handleSpecialization/evaluator/validateReviewCompleted/validateReviewCompleted.js';

export {
  express,
  listAdministrative,
  listAcademic,
  listSemester,
  listEvaluation,
  createEvaluateHasUser,
  updateEvaluateHasUser,
  updateEvaluationStatus,
  validateStudentHasSemesterID,
  validateEvaluator_userID,
  validateEvaluatorID,
  validateEvaluationID,
  validateEvaluationTypeID,
  validateStage,

  listEvaluationStatus,
  updateEvaluate,
  updateStudentHasSemester,
  updateStudentHasSpecialization,
  validateSemesterID,
  validateEvaluationStatusID,
  validateSpecializationID,

  processEvaluationData,
  validateArrayData,

  updateOralDefenseScores,
  updateThesisGrades,
  validateScoresAndEvaluatorIDs,
  validateThesisGradesID,

  updateComments,
  validatePreprojectEvaluatorID,
  validateComments,
  validateReviewCompleted,
};
