import { SelectUserHasRolesAcademic } from '../../../../../../repository/roleAssignment/userHasRole/selectUserHasRolesAcademic.js';

const listAcademic = async (req, res) => {
  const selectUserHasRolesInstanceAcademic = new SelectUserHasRolesAcademic();
  try {
    const data = await selectUserHasRolesInstanceAcademic.SelectUserHasRolesAcademic();
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listAcademic;
