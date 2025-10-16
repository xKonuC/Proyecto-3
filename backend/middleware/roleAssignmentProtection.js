/* eslint-disable no-console */
import { verifyCanAssignRole, verifyDataAccess } from './permissionHierarchy.js';

// Middleware para proteger la asignación de roles
const protectRoleAssignment = async (req, res, next) => {
  try {
    const { userPermissions, userRole } = req.body;
    const { roleIDs } = req.body;

    // SuperAdmin puede asignar cualquier rol
    if (userRole === 'SuperAdmin') {
      return next();
    }

    // Administrador no puede asignar SuperAdmin
    if (userRole === 'Administrador') {
      const hasSuperAdminRole = roleIDs && roleIDs.includes(1);
      if (hasSuperAdminRole) {
        return res.status(403).json({
          error: 'No tienes permisos para asignar el rol de SuperAdmin',
          message: 'Solo un SuperAdmin puede asignar el rol de SuperAdmin'
        });
      }
    }

    // Verificar si puede asignar los roles solicitados
    const unauthorizedRoles = roleIDs ? roleIDs.filter(roleID => 
      !userPermissions.allowedRoles.includes(roleID)
    ) : [];

    if (unauthorizedRoles.length > 0) {
      return res.status(403).json({
        error: 'No tienes permisos para asignar estos roles',
        unauthorizedRoles,
        allowedRoles: userPermissions.allowedRoles,
        userRole
      });
    }

    next();
  } catch (error) {
    console.error('Error en protección de asignación de roles:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Middleware para proteger la eliminación de usuarios
const protectUserDeletion = async (req, res, next) => {
  try {
    const { userPermissions, userRole } = req.body;
    const targetUserID = req.params.userID || req.body.userID;

    // SuperAdmin puede eliminar cualquier usuario
    if (userRole === 'SuperAdmin') {
      return next();
    }

    // Administrador no puede eliminar usuarios
    if (!userPermissions.canDeleteUsers) {
      return res.status(403).json({
        error: 'No tienes permisos para eliminar usuarios',
        message: 'Solo SuperAdmin puede eliminar usuarios del sistema'
      });
    }

    next();
  } catch (error) {
    console.error('Error en protección de eliminación de usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Middleware para proteger la modificación de configuraciones del sistema
const protectSystemSettings = async (req, res, next) => {
  try {
    const { userPermissions, userRole } = req.body;

    // Solo SuperAdmin puede modificar configuraciones del sistema
    if (!userPermissions.canModifySystemSettings) {
      return res.status(403).json({
        error: 'No tienes permisos para modificar configuraciones del sistema',
        message: 'Solo SuperAdmin puede modificar configuraciones del sistema'
      });
    }

    next();
  } catch (error) {
    console.error('Error en protección de configuraciones del sistema:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Middleware para proteger el acceso a datos sensibles
const protectSensitiveData = async (req, res, next) => {
  try {
    const { userPermissions, userRole, userID } = req.body;
    const targetUserID = req.params.userID || req.body.targetUserID;

    // SuperAdmin y Administrador pueden acceder a todos los datos
    if (userPermissions.canViewAllData) {
      return next();
    }

    // Otros roles solo pueden acceder a sus propios datos
    if (userPermissions.canOnlyAccessOwnData) {
      if (targetUserID && targetUserID !== userID) {
        return res.status(403).json({
          error: 'Solo puedes acceder a tus propios datos',
          message: 'No tienes permisos para ver datos de otros usuarios'
        });
      }
    }

    next();
  } catch (error) {
    console.error('Error en protección de datos sensibles:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export {
  protectRoleAssignment,
  protectUserDeletion,
  protectSystemSettings,
  protectSensitiveData
};


