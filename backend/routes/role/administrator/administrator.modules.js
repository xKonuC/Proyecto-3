/* eslint-disable import/extensions */
import express from 'express';
import roleAssignmentRoute from './roleAssignment/roleAssignment.js';
import handleSpecializationRoute from './handleSpecialization/handleSpecialization.js';
import documentRoute from './document/document.js';
import handleTitleRoute from './handleTitle/handleTitleRoute.js';
import semesterRoute from './semester/semesterRoute.js';
import handleRubricRoute from './handleRubric/handleRubricRoute.js';
import handleAcademicRecordRoute from './handleAcademicRecord/handleAcademicRecordRoute.js';
import thesisRegistrationRoute from './thesisRegistration/thesisRegistrationRoute.js';
import graduateRoute from './graduate/graduate.route.js';

export {
  express,
  roleAssignmentRoute,
  handleSpecializationRoute,
  handleRubricRoute,
  documentRoute,
  handleTitleRoute,
  semesterRoute,
  handleAcademicRecordRoute,
  thesisRegistrationRoute,
  graduateRoute,
};
