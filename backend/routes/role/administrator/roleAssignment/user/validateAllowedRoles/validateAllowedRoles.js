/* eslint-disable no-prototype-builtins */
import { VerifyRole } from '../../../../../../repository/verifyRole/verifyRole.js';

const validateAllowedRoles = [
  async (req, res, next) => {
    const allowedRoles = [1, 2];

    const roleIDs = req.body.roleIDs;
    
    // Si no hay roleIDs, continuar sin validación
    if (!roleIDs || !Array.isArray(roleIDs)) {
      return next();
    }
    
    const rolesNotAllowed = roleIDs.filter((role) => !allowedRoles.includes(role));
    if (rolesNotAllowed.length === 0) {
      next();
    } else {
      const VerifyRoleInstance = new VerifyRole();
      const data = await VerifyRoleInstance.verifyRole(1, req.body.administratorID);
      if (!data) {
        return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
      }
      next();
    }
  },
];

export default validateAllowedRoles;
