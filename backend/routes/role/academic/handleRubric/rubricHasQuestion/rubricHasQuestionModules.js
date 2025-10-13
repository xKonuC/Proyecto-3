/* eslint-disable import/extensions */
import express from 'express';
import createRubricHasQuestion from './createRubricHasQuestion/createRubricHasQuestion.js';
import updateRubricHasQuestion from './updateRubricHasQuestion/updateRubricHasQuestion.js';
import deleteRubricHasQuestion from './deleteRubricHasQuestion/deleteRubricHasQuestion.js';
import validateArrayRubricHasQuestionID from '../../../../../validations/handleRubric/rubricHasQuestion/validateArrayRubricHasQuestionID/validateArrayRubricHasQuestionID.js';
import validateArrayData from '../../../../../validations/handleRubric/rubricHasQuestion/validateArrayData/validateArrayData.js';
import validateRubricHasQuestionArray from '../../../../../validations/handleRubric/rubricHasQuestion/validateRubricHasQuestionArray/validateRubricHasQuestionArray.js';

export {
  express,
  createRubricHasQuestion,
  updateRubricHasQuestion,
  deleteRubricHasQuestion,
  validateArrayRubricHasQuestionID,
  validateArrayData,
  validateRubricHasQuestionArray,
};
