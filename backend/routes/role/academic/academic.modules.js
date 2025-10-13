/* eslint-disable import/extensions */
import express from 'express';
import listSemester from '../administrator/semester/listSemester/listSemester.js';
import handleSpecializationRoute from './handleSpecialization/handleSpecializationRoute.js';
import handleRubricRoute from './handleRubric/handleRubricRoute.js';
import handleAcademicRecordRoute from './handleAcademicRecord/handleAcademicRecordRoute.js';
import academicHasTitleRoute from '../administrator/handleTitle/academicHasTitle/academicHasTitleRoute.js';

export {
  express,
  handleSpecializationRoute,
  listSemester,
  handleRubricRoute,
  handleAcademicRecordRoute,
  academicHasTitleRoute,
};
