/* eslint-disable no-console */
import { GetUserAuth } from '../../../../repository/utils/getUserAuth.js';
import { VerifyRole } from '../../../../repository/verifyRole/verifyRole.js';
import { ROLE_PERMISSIONS, ROLE_HIERARCHY } from '../../../../middleware/permissionHierarchy.js';

const getUserPermissions = async (req, res) => {
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    
    if (!access_token) {
      return res.status(401).json({ error: 'Token de acceso requerido' });
    }

    const getUserAuth = new GetUserAuth();
    const user = await getUserAuth.getUserAuth(access_token);

    if (!user) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    // Obtener el rol más alto del usuario
    const VerifyRoleInstance = new VerifyRole();
    let userRole = null;
    let userRoleID = null;

    // Verificar roles en orden de jerarquía
    for (const [roleID, roleName] of Object.entries(ROLE_HIERARCHY)) {
      const roleData = await VerifyRoleInstance.verifyRole(parseInt(roleID), user.userID);
      if (roleData) {
        userRole = roleName;
        userRoleID = parseInt(roleID);
        break; // Usar el rol de mayor jerarquía
      }
    }

    if (!userRole) {
      return res.status(403).json({ error: 'No tienes un rol válido asignado' });
    }

    // Obtener permisos del usuario
    const userPermissions = ROLE_PERMISSIONS[userRole];
    
    // Filtrar solo los permisos que el usuario tiene
    const availablePermissions = Object.keys(userPermissions).filter(key => userPermissions[key]);

    res.status(200).json({
      userID: user.userID,
      userRole,
      userRoleID,
      permissions: userPermissions,
      availablePermissions,
      hierarchy: ROLE_HIERARCHY
    });

  } catch (error) {
    console.error('Error al obtener permisos del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default getUserPermissions;
