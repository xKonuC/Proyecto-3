/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/extensions */
import { VerifyPermission } from '../../../../../repository/handleSpecialization/userHasPermission/verifyPermission.js';

const verifyPermission = (permissionID) => async (req, res, next) => {
  const { userID } = req.body;
  const permission = new VerifyPermission();

  try {
    const { result } = await permission.verifyPermission(userID, permissionID);
    if (result.length === 0) {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' });
    }

    req.body.dueDate = new Date(result[0].dueDate);
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar el permiso.' });
  }
};

export default verifyPermission;
