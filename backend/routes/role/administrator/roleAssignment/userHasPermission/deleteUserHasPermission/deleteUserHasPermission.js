import { DeleteUserHasPermission } from '../../../../../../repository/handleSpecialization/userHasPermission/deleteUserHasPermission.js';

const deleteUserHasPermission = async (req, res) => {
  const { userHasPermissionIDs } = req.body;
  const deleteUserHasPermissionInstance = new DeleteUserHasPermission();
  try {
    await deleteUserHasPermissionInstance.deleteUserHasPermission(userHasPermissionIDs);

    res.status(200).json({ verificationMessage: 'El Permiso se ha eliminado exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default deleteUserHasPermission;
