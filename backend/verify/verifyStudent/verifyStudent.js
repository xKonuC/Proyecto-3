/* eslint-disable no-console */
import { GetUserAuth } from '../../repository/utils/getUserAuth.js';
import { VerifyStudent } from '../../repository/verifyRole/verifyStudent.js';

const verifyStudent = async (req, res, next) => {
  const verifyStudentInstance = new VerifyStudent();
  const getUserAuth = new GetUserAuth();
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    const user = await getUserAuth.getUserAuth(access_token);
    if (user) {
      const data = await verifyStudentInstance.verifyStudent(user.userID);
      if (data) {
        req.body.userID = data.userID;
        req.body.rubricInfo = { entry: data.entry, group: data.group, fullName: `${data.firstName} ${data.secondName} ${data.surname1} ${data.surname2}` };
        next();
      } else {
        res.status(403).json({ errorDenied: 'No tienes permiso para ingresar' });
      }
    } else {
      res.status(400).json({ expirationError: 'La sesión ha expirado o las credenciales son inválidas' });
    }
  } catch (error) {
    console.error('Error en la verificación de encargado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default verifyStudent;
