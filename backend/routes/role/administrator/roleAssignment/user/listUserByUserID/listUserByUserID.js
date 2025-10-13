import { SelectUserByUserID } from '../../../../../../repository/roleAssignment/user/selectUserByUserID.js';

const listUserByUserID = async (req, res) => {
  const { userID } = req.body;
  const selectUserByUserID = new SelectUserByUserID();
  try {
    const data = await selectUserByUserID.selectUserByUserID(userID);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listUserByUserID;
