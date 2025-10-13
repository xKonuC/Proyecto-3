/* eslint-disable import/extensions */
import express from 'express';
import templateRoute from './template/templateRoute.js';
import questionRoute from './question/questionRoute.js';
import templateHasQuestionRoute from './templateHasQuestion/templateHasQuestionRoute.js';
import templateHasSectionRoute from './templateHasSection/templateHasSectionRoute.js';
import sectionRoute from './section/sectionRoute.js';
import rubricRoute from './rubric/rubricRoute.js';

export {
  express,
  rubricRoute,
  sectionRoute,
  templateRoute,
  questionRoute,
  templateHasQuestionRoute,
  templateHasSectionRoute,
};
