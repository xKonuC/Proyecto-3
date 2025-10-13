import { DeleteUserHasRole } from '../../../../../../repository/roleAssignment/userHasRole/deleteUserHasRole.js';

const deleteUserHasRole = async (req, res) => {
  const { userID, roleIDs } = req.body;
  const deleteUserHasRoleInstance = new DeleteUserHasRole();
  try {
    const deletePromises = roleIDs.map(async (roleID) => {
      await deleteUserHasRoleInstance.deleteUserHasRole(userID, roleID);
    });
    await Promise.all(deletePromises);
    res.status(200).json({ verificationMessage: 'Roles eliminados exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default deleteUserHasRole;
