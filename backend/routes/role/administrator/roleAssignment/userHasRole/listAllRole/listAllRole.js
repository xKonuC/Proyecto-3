import { GetRole } from '../../../../../../repository/roleAssignment/userHasRole/getRole.js';

const listAllRole = async (req, res) => {
  const getRoleInstance = new GetRole();
  try {
    const data = await getRoleInstance.getRole();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listAllRole;
