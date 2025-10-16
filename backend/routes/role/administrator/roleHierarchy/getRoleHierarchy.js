/* eslint-disable no-console */
import { ROLE_HIERARCHY, ROLE_PERMISSIONS } from '../../../../middleware/permissionHierarchy.js';

const getRoleHierarchy = async (req, res) => {
  try {
    res.status(200).json({
      hierarchy: ROLE_HIERARCHY,
      permissions: ROLE_PERMISSIONS,
      description: {
        SuperAdmin: 'Máximo privilegio - Puede hacer todo en el sistema',
        Administrador: 'Puede gestionar usuarios y contenido, pero no puede asignar SuperAdmin',
        Académico: 'Puede evaluar y gestionar contenido académico',
        Estudiante: 'Acceso limitado a sus propios datos',
        Egresado: 'Acceso muy limitado, puede ver reportes de egresados'
      }
    });
  } catch (error) {
    console.error('Error al obtener jerarquía de roles:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default getRoleHierarchy;


