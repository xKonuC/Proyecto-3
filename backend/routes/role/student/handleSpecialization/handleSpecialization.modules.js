/* eslint-disable import/extensions */
import express from 'express';
import studentHasSpecializationRoute from './studentHasSpecialization/studentHasSpecializationRoute.js';
import studentHasSemesterRoute from './studentHasSemester/studentHasSemesterRoute.js';
import evaluationRoute from './evaluation/evaluation.js';
import thesisRegistrationRoute from './thesisRegistration/thesisRegistrationRoute.js';

export {
  express,
  studentHasSpecializationRoute,
  studentHasSemesterRoute,
  evaluationRoute,
  thesisRegistrationRoute,
};
