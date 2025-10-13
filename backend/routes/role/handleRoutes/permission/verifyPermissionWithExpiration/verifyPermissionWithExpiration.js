import { VerifyPermission } from '../../../../../repository/handleSpecialization/userHasPermission/verifyPermission.js';
import getTimestamp from '../../../../../utils/getTimestamp.js';

const verifyPermissionWithExpiration = (permissionID) => async (req, res, next) => {
  const { userID } = req.body;
  const permission = new VerifyPermission();
  try {
    const { result } = await permission.verifyPermission(userID, permissionID);
    if (result.length === 0) {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' });
    }

    const now = getTimestamp();
    const permissionDueDate = new Date(result[0].dueDate);

    if (now > permissionDueDate) {
      return res.status(403).json({ message: 'El permiso ha caducado.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar el permiso.' });
  }
};

export default verifyPermissionWithExpiration;
