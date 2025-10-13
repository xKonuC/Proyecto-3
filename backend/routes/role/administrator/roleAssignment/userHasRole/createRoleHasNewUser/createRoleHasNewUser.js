import { CreateRoleHasNewUser } from '../../../../../../repository/roleAssignment/userHasRole/createRoleHasNewUser.js';

const createRoleHasNewUser = async (req, res) => {
  const userID = req.userID;
  const { roleIDs } = req.body;
  const createRoleHasNewUserInstance = new CreateRoleHasNewUser();
  try {
    const createPromises = roleIDs.map(async (roleID) => {
      await createRoleHasNewUserInstance.createRoleHasNewUser(userID, roleID);
    });

    await Promise.all(createPromises);

    res.status(200).json({ verificationMessage: 'Se ha creado un usuario exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createRoleHasNewUser;
