import express from 'express';
import studentsRoute from './students/students.route.js';
import rolesRoute from './roles/roles.route.js';

const graduateRoute = express.Router();

graduateRoute.use('/students', studentsRoute);
graduateRoute.use('/roles', rolesRoute);

export default graduateRoute;
