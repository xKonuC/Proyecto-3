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

<<<<<<< HEAD
export default graduatesRoute;
=======
export default graduatesRoute;
>>>>>>> c98ce8ccd65bda4ebabc9fcc45e29e80f6436df3
