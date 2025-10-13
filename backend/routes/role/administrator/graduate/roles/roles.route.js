import express from 'express';
import createRole from './createRole.js';
import updateStudentRole from './updateStudentRole.js';
import getRoles from './getRoles.js';

const rolesRoute = express.Router();

rolesRoute.post('/', createRole);
rolesRoute.put('/update', updateStudentRole);
rolesRoute.get('/', getRoles);

export default rolesRoute;
