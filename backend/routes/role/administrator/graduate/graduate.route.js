import express from 'express';
import studentsRoute from './students/students.route.js';
import graduatesRoute from './graduates/graduates.route.js';
import rolesRoute from './roles/roles.route.js';
import classificationRoute from './classification/classification.route.js';
import reportsRoute from './reports/reports.route.js';

const graduateRoute = express.Router();

graduateRoute.use('/students', studentsRoute);
graduateRoute.use('/graduates', graduatesRoute);
graduateRoute.use('/roles', rolesRoute);
graduateRoute.use('/classification', classificationRoute);
graduateRoute.use('/reports', reportsRoute);

export default graduateRoute;
