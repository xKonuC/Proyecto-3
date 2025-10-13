import {
  express, administratorRoute, academicRoute, studentRoute, verifyAdministrator, verifyAcademic, verifyStudent,
} from './role.modules.js';

const roleRoute = express.Router();
roleRoute.use('/administrator', verifyAdministrator, administratorRoute);
roleRoute.use('/academic', verifyAcademic, academicRoute);
roleRoute.use('/student', verifyStudent, studentRoute);

export default roleRoute;
