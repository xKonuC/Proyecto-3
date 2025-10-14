/* eslint-disable import/extensions */
import express from 'express';
import administratorRoute from './administrator/administrator.js';
import studentRoute from './student/student.js';
import academicRoute from './academic/academic.js';
import graduateRoute from './administrator/graduate/graduate.route.js';
import verifyAdministrator from '../../verify/verifyAdministrator/verifyAdministrator.js';
import verifyAcademic from '../../verify/verifyAcademic/verifyAcademic.js';
import verifyStudent from '../../verify/verifyStudent/verifyStudent.js';
import verifySuperAdmin from '../../verify/verifySuperAdmin/verifySuperAdmin.js';
import verifyGraduate from '../../verify/verifyGraduate/verifyGraduate.js';

export {
  express,
  academicRoute,
  administratorRoute,
  studentRoute,
  graduateRoute,
  verifyAcademic,
  verifyAdministrator,
  verifyStudent,
  verifySuperAdmin,
  verifyGraduate,
};
