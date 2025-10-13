import { SelectUserHasRoles } from '../../../../../../repository/roleAssignment/userHasRole/selectUserHasRoles.js';

const listUserHasRoles = async (req, res) => {
  const selectUserHasRolesInstance = new SelectUserHasRoles();
  try {
    const data = await selectUserHasRolesInstance.selectUserHasRoles();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listUserHasRoles;
