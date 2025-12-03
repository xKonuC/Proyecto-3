import express from 'express';
import GraduateController from '../controllers/graduate.controller.js';
import verifyAdministrator from '../verify/verifyAdministrator/verifyAdministrator.js';

const graduatesRoute = express.Router();

graduatesRoute.use(verifyAdministrator);

graduatesRoute.get('/', GraduateController.getAllGraduates);
graduatesRoute.get('/:id', GraduateController.getGraduateById);
graduatesRoute.post('/', GraduateController.createGraduate);
graduatesRoute.put('/:id', GraduateController.updateGraduate);
graduatesRoute.delete('/:id', GraduateController.deleteGraduate);

export default graduatesRoute;
