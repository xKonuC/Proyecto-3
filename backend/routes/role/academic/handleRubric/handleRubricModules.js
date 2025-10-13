/* eslint-disable import/extensions */
import express from 'express';
import rubricRoute from './rubric/rubricRoute.js';
import rubricHasQuestionRoute from './rubricHasQuestion/rubricHasQuestionRoute.js';
import rubricHasSectionRoute from './rubricHasSection/rubricHasSectionRoute.js';
import answerRoute from './answer/answerRoute.js';

export {
  express,
  rubricRoute,
  rubricHasQuestionRoute,
  rubricHasSectionRoute,
  answerRoute,
};
