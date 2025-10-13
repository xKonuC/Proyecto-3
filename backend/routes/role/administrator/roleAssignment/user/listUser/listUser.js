import { SelectUser } from '../../../../../../repository/roleAssignment/user/selectUser.js';

const listUser = async (req, res) => {
  const selectUserInstance = new SelectUser();
  try {
    const data = await selectUserInstance.selectUser();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listUser;
