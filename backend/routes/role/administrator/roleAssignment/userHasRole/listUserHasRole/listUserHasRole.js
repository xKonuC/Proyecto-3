import { SelectUserHasRole } from '../../../../../../repository/roleAssignment/userHasRole/selectUserHasRole.js';

const listUserHasRole = async (req, res) => {
  const { userID } = req.body;
  const selectUserHasRoleInstance = new SelectUserHasRole();
  try {
    const data = await selectUserHasRoleInstance.selectUserHasRole(userID);
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listUserHasRole;
