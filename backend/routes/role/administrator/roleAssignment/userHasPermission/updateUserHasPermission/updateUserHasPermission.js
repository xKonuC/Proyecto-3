import { UpdateUserHasPermission } from '../../../../../../repository/handleSpecialization/userHasPermission/updateUserHasPermission.js';

const updateUserHasPermission = async (req, res) => {
  const {
    dataArray,
  } = req.body;
  const updateUserHasPermissionInstance = new UpdateUserHasPermission();
  try {
    const updatedPromises = dataArray.map(async (data) => {
      await updateUserHasPermissionInstance.updateUserHasPermission(
        data.userHasPermissionID,
        data.dueDate,
      );
    });
    await Promise.all(updatedPromises);
    res.status(200).json({ verificationMessage: 'El Permiso fue sido actualizado exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateUserHasPermission;
