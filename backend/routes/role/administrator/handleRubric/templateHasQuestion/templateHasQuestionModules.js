/* eslint-disable import/extensions */
import express from 'express';
import createTemplateHasQuestion from './createTemplateHasQuestion/createTemplateHasQuestion.js';
import updateTemplateHasQuestion from './updateTemplateHasQuestion/updateTemplateHasQuestion.js';
import deleteTemplateHasQuestion from './deleteTemplateHasQuestion/deleteTemplateHasQuestion.js';
import validateArrayTemplateHasQuestionID from '../../../../../validations/handleRubric/templateHasQuestion/validateArrayRubricHasQuestionID/validateArrayRubricHasQuestionID.js';
import validateArrayData from '../../../../../validations/handleRubric/templateHasQuestion/validateArrayData/validateArrayData.js';
import validateTemplateHasQuestionArray from '../../../../../validations/handleRubric/templateHasQuestion/validateTemplateHasQuestionArray/validateTemplateHasQuestionArray.js';

export {
  express,
  createTemplateHasQuestion,
  updateTemplateHasQuestion,
  deleteTemplateHasQuestion,
  validateArrayTemplateHasQuestionID,
  validateArrayData,
  validateTemplateHasQuestionArray,
};
