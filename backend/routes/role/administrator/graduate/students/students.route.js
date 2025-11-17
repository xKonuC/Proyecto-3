import express from 'express';
import getStudents from './getStudents.js';
import createStudent from './createStudent.js';
import updateStudent from './updateStudent.js';
import deleteStudent from './deleteStudent.js';
import { protectUserDeletion } from '../../../../../middleware/roleAssignmentProtection.js';

const studentsRoute = express.Router();

studentsRoute.get('/', getStudents);
studentsRoute.post('/', createStudent);
studentsRoute.put('/', updateStudent);
studentsRoute.delete('/', protectUserDeletion, deleteStudent);

export default studentsRoute;
