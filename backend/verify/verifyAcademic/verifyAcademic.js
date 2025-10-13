/* eslint-disable no-console */
import { GetUserAuth } from '../../repository/utils/getUserAuth.js';
import { VerifyRole } from '../../repository/verifyRole/verifyRole.js';

const verifyAcademic = async (req, res, next) => {
  const VerifyRoleInstance = new VerifyRole();
  const getUserAuth = new GetUserAuth();
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    const user = await getUserAuth.getUserAuth(access_token);

    if (user) {
      const data = await VerifyRoleInstance.verifyRole(3, user.userID);

      if (!data) {
        return res.status(403).json({ errorDenied: 'No tienes permiso para ingresar' });
      }
      req.body.userID = data.userID;
      // Esto se usa exclusivamente para la info de la rubrica
      req.body.fullNameEvaluator = `${data.firstName} ${data.secondName} ${data.surname1} ${data.surname2}`;
      next();
    } else {
      res.status(400).json({ expirationError: 'La sesión ha expirado o las credenciales son inválidas' });
    }
  } catch (error) {
    console.error('Error en la verificación de encargado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default verifyAcademic;
