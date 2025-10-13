import { CreateUserHasPermission } from '../../../../../../repository/handleSpecialization/userHasPermission/createUserHasPermission.js';

const createUserHasPermission = async (req, res) => {
  const {
    userID, dataArray,
  } = req.body;
  const createUserHasPermissionInstance = new CreateUserHasPermission();
  try {
    const createPromises = dataArray.map(async (data) => {
      await createUserHasPermissionInstance.createUserHasPermission(
        userID, 
        data.permissionID, 
        data.dueDate);
    });
    await Promise.all(createPromises);
    res.status(200).json({ verificationMessage: 'El Permiso fue Habilitado' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createUserHasPermission;
