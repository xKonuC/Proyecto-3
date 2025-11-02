/* eslint-disable import/extensions */
import express from 'express';
import administratorRoute from './administrator/administrator.js';
import studentRoute from './student/student.js';
import academicRoute from './academic/academic.js';
import verifyAdministrator from '../../verify/verifyAdministrator/verifyAdministrator.js';
import verifyAcademic from '../../verify/verifyAcademic/verifyAcademic.js';
import verifyStudent from '../../verify/verifyStudent/verifyStudent.js';

export {
  express,
  academicRoute,
  administratorRoute,
  studentRoute,
  verifyAcademic,
  verifyAdministrator,
  verifyStudent,
};
