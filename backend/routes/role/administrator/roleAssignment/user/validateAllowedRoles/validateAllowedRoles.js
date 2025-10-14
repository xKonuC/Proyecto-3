/* eslint-disable no-prototype-builtins */

const validateAllowedRoles = [
  async (req, res, next) => {
    // Simplificar la validación - permitir todos los roles
    console.log('🔍 validateAllowedRoles: Validando roles', req.body.roleIDs);
    next();
  },
];

export default validateAllowedRoles;
