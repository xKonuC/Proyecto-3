/* eslint-disable no-console */
import { GetUserAuth } from '../../repository/utils/getUserAuth.js';
import { VerifyRole } from '../../repository/verifyRole/verifyRole.js';
import { MapAuthToPosgrado } from '../../repository/utils/mapAuthToPosgrado.js';

const verifySuperAdmin = async (req, res, next) => {
  const VerifyRoleInstance = new VerifyRole();
  const getUserAuth = new GetUserAuth();
  const mapAuthToPosgrado = new MapAuthToPosgrado();
  
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    const user = await getUserAuth.getUserAuth(access_token);

    if (user) {
      // Mapear el ID del AuthServer al userID de posgrado_db
      const posgradoUserID = await mapAuthToPosgrado.mapAuthToPosgrado(user.userID);
      
      if (!posgradoUserID) {
        return res.status(403).json({ errorDenied: 'Usuario no encontrado en el sistema' });
      }

      const data = await VerifyRoleInstance.verifyRole(1, posgradoUserID);

      if (!data) {
        return res.status(403).json({ errorDenied: 'No tienes permiso para ingresar' });
      }
      req.body.superAdminID = data.userID;
      req.body.userRole = 'SuperAdmin';
      next();
    } else {
      res.status(400).json({ expirationError: 'La sesión ha expirado o las credenciales son inválidas' });
    }
  } catch (error) {
    console.error('Error en la verificación de SuperAdmin:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default verifySuperAdmin;
