import express from 'express';
import getGraduates from './getGraduates.js';
import createGraduate from './createGraduate.js';
import updateGraduate from './updateGraduate.js';
import deleteGraduate from './deleteGraduate.js';

const graduatesRoute = express.Router();

graduatesRoute.get('/', getGraduates);
graduatesRoute.post('/', createGraduate);
graduatesRoute.put('/', updateGraduate);
graduatesRoute.delete('/', deleteGraduate);

export default graduatesRoute;
