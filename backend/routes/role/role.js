import {
  express, administratorRoute, academicRoute, studentRoute, graduateRoute, 
  verifyAdministrator, verifyAcademic, verifyStudent, verifySuperAdmin, verifyGraduate
} from './role.modules.js';
import { verifyRoleHierarchy, verifyCanAssignRole, verifyDataAccess } from '../../middleware/permissionHierarchy.js';

const roleRoute = express.Router();

// Rutas con verificación jerárquica de permisos
roleRoute.use('/administrator', verifyRoleHierarchy('canManageUsers'), administratorRoute);
roleRoute.use('/academic', verifyRoleHierarchy('canManageAcademic'), academicRoute);
roleRoute.use('/student', verifyStudent, studentRoute);
roleRoute.use('/graduate', verifyRoleHierarchy('canManageGraduates'), graduateRoute);

// Rutas específicas para SuperAdmin
roleRoute.use('/superadmin', verifySuperAdmin, administratorRoute);

export default roleRoute;
