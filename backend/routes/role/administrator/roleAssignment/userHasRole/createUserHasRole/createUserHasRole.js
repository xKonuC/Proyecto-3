import { CreateUserHasRole } from '../../../../../../repository/roleAssignment/userHasRole/createUserHasRole.js';

const createUserHasRole = async (req, res) => {
  const { userID, roleIDs } = req.body;
  const createUserHasRoleInstance = new CreateUserHasRole();
  try {
    const createPromises = roleIDs.map(async (roleID) => {
      await createUserHasRoleInstance.createUserHasRole(userID, roleID);
    });
    await Promise.all(createPromises);
    res.status(200).json({ verificationMessage: 'Roles asignados exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createUserHasRole;
