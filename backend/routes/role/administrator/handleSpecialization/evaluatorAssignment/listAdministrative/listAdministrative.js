import { SelectUserHasRolesAdministrative } from '../../../../../../repository/roleAssignment/userHasRole/selectUserHasRolesAdministrative.js';

const listAdministrative = async (req, res) => {
  const selectUserHasRolesInstanceAdministrative = new SelectUserHasRolesAdministrative();
  try {
    const data = await selectUserHasRolesInstanceAdministrative.selectUserHasRolesAdministrative();
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listAdministrative;
