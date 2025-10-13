import { GetUserHasPermission } from '../../../../../../repository/handleSpecialization/userHasPermission/getUserHasPermission.js';

const listUserHasPermission = async (req, res) => {
  const { userID } = req.body;
  const getUserHasPermissionInstance = new GetUserHasPermission();
  try {
    const data = await getUserHasPermissionInstance.getUserHasPermission(userID);
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listUserHasPermission;
