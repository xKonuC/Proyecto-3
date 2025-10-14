/* eslint-disable no-console */
import { GetUserAuth } from '../repository/utils/getUserAuth.js';
import { VerifyRole } from '../repository/verifyRole/verifyRole.js';
import { MapAuthToPosgrado } from '../repository/utils/mapAuthToPosgrado.js';

// Definir jerarquía de roles (número menor = mayor privilegio)
const ROLE_HIERARCHY = {
  1: 'SuperAdmin',    // Máximo privilegio
  2: 'Administrador', // Puede gestionar usuarios y contenido
  3: 'Académico',     // Puede evaluar y gestionar contenido académico
  4: 'Estudiante',    // Acceso limitado a sus propios datos
  5: 'Egresado'       // Acceso muy limitado
};

// Permisos por rol
const ROLE_PERMISSIONS = {
  SuperAdmin: {
    canManageUsers: true,
    canManageRoles: true,
    canManageSystem: true,
    canManageAcademic: true,
    canManageGraduates: true,
    canViewAllData: true,
    canDeleteUsers: true,
    canModifySystemSettings: true,
    allowedRoles: [1, 2, 3, 4, 5] // Puede asignar cualquier rol
  },
  Administrador: {
    canManageUsers: true,
    canManageRoles: false, // No puede modificar roles de SuperAdmin
    canManageSystem: false,
    canManageAcademic: true,
    canManageGraduates: true,
    canViewAllData: true,
    canDeleteUsers: false, // No puede eliminar usuarios
    canModifySystemSettings: false,
    allowedRoles: [2, 3, 4, 5] // No puede asignar SuperAdmin
  },
  Académico: {
    canManageUsers: false,
    canManageRoles: false,
    canManageSystem: false,
    canManageAcademic: true,
    canManageGraduates: false,
    canViewAllData: false,
    canDeleteUsers: false,
    canModifySystemSettings: false,
    allowedRoles: [] // No puede asignar roles
  },
  Estudiante: {
    canManageUsers: false,
    canManageRoles: false,
    canManageSystem: false,
    canManageAcademic: false,
    canManageGraduates: false,
    canViewAllData: false,
    canDeleteUsers: false,
    canModifySystemSettings: false,
    allowedRoles: [],
    canOnlyAccessOwnData: true
  },
  Egresado: {
    canManageUsers: false,
    canManageRoles: false,
    canManageSystem: false,
    canManageAcademic: false,
    canManageGraduates: false,
    canViewAllData: false,
    canDeleteUsers: false,
    canModifySystemSettings: false,
    allowedRoles: [],
    canOnlyAccessOwnData: true,
    canViewGraduateReports: true
  }
};

// Middleware para verificar jerarquía de roles
const verifyRoleHierarchy = (requiredPermission) => async (req, res, next) => {
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    
    if (!access_token) {
      return res.status(401).json({ error: 'Token de acceso requerido' });
    }

    const getUserAuth = new GetUserAuth();
    const mapAuthToPosgrado = new MapAuthToPosgrado();
    const user = await getUserAuth.getUserAuth(access_token);

    if (!user) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    // Mapear el ID del AuthServer al userID de posgrado_db
    const posgradoUserID = await mapAuthToPosgrado.mapAuthToPosgrado(user.userID);
    
    if (!posgradoUserID) {
      return res.status(403).json({ error: 'Usuario no encontrado en el sistema' });
    }

    // Obtener el rol más alto del usuario
    const VerifyRoleInstance = new VerifyRole();
    let userRole = null;
    let userRoleID = null;

    // Verificar roles en orden de jerarquía
    for (const [roleID, roleName] of Object.entries(ROLE_HIERARCHY)) {
      const roleData = await VerifyRoleInstance.verifyRole(parseInt(roleID), posgradoUserID);
      if (roleData) {
        userRole = roleName;
        userRoleID = parseInt(roleID);
        break; // Usar el rol de mayor jerarquía
      }
    }

    if (!userRole) {
      return res.status(403).json({ error: 'No tienes un rol válido asignado' });
    }

    // Verificar si el usuario tiene el permiso requerido
    const userPermissions = ROLE_PERMISSIONS[userRole];
    if (!userPermissions[requiredPermission]) {
      return res.status(403).json({ 
        error: 'No tienes permisos para realizar esta acción',
        requiredPermission,
        userRole,
        availablePermissions: Object.keys(userPermissions).filter(key => userPermissions[key])
      });
    }

    // Agregar información del usuario a la request
    req.body.authenticatedUserID = user.userID; // ID del AuthServer
    req.body.authenticatedPosgradoUserID = posgradoUserID; // ID de posgrado_db
    req.body.userRole = userRole;
    req.body.userRoleID = userRoleID;
    req.body.userPermissions = userPermissions;

    next();
  } catch (error) {
    console.error('Error en verificación de jerarquía:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Middleware para verificar si puede asignar un rol específico
const verifyCanAssignRole = async (req, res, next) => {
  try {
    const { userPermissions } = req.body;
    const { roleIDs } = req.body;

    if (!roleIDs || !Array.isArray(roleIDs)) {
      return next();
    }

    // Verificar si puede asignar todos los roles solicitados
    const unauthorizedRoles = roleIDs.filter(roleID => 
      !userPermissions.allowedRoles.includes(roleID)
    );

    if (unauthorizedRoles.length > 0) {
      return res.status(403).json({
        error: 'No tienes permisos para asignar estos roles',
        unauthorizedRoles,
        allowedRoles: userPermissions.allowedRoles
      });
    }

    next();
  } catch (error) {
    console.error('Error en verificación de asignación de roles:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Middleware para verificar acceso a datos de otros usuarios
const verifyDataAccess = (targetUserID) => async (req, res, next) => {
  try {
    const { userID, userPermissions } = req.body;
    const targetID = req.params[targetUserID] || req.body[targetUserID];

    // SuperAdmin y Administrador pueden acceder a todos los datos
    if (userPermissions.canViewAllData) {
      return next();
    }

    // Otros roles solo pueden acceder a sus propios datos
    if (userPermissions.canOnlyAccessOwnData && targetID && targetID !== userID) {
      return res.status(403).json({
        error: 'Solo puedes acceder a tus propios datos'
      });
    }

    next();
  } catch (error) {
    console.error('Error en verificación de acceso a datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export {
  verifyRoleHierarchy,
  verifyCanAssignRole,
  verifyDataAccess,
  ROLE_HIERARCHY,
  ROLE_PERMISSIONS
};
