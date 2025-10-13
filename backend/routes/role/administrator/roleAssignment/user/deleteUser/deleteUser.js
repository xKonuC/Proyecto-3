import { DeleteUser } from '../../../../../../repository/roleAssignment/user/deleteUser.js';

const deleteUser = async (req, res) => {
  const { IDs, userIDs } = req.body;
  const newIDs = IDs ? IDs : userIDs;
  const deleteUserInstance = new DeleteUser();
  try {
    const header = req.header("Authorization") || "";
    const access_token = header.split(" ")[1];  
    const deletePromises = newIDs.map(async (ID) => {
      await deleteUserInstance.deleteUser(ID, access_token);
    });
    await Promise.all(deletePromises);
    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deleteUser;
