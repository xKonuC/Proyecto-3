import express from 'express';
import getClassifications from './getClassifications.js';
import createClassification from './createClassification.js';
import updateClassification from './updateClassification.js';
import deleteClassification from './deleteClassification.js';
import getClassificationCriteria from './getClassificationCriteria.js';
import getGraduatesByClassification from './getGraduatesByClassification.js';

const classificationRoute = express.Router();

classificationRoute.get('/', getClassifications);
classificationRoute.get('/criteria', getClassificationCriteria);
classificationRoute.get('/graduates/:classificationId', getGraduatesByClassification);
classificationRoute.post('/', createClassification);
classificationRoute.put('/:id', updateClassification);
classificationRoute.delete('/:id', deleteClassification);

export default classificationRoute;
