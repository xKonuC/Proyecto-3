import { SelectUserHasRoles2 } from "../../../../../../repository/roleAssignment/userHasRole/selectUserHasRoles2.js";

const listAcademic = async (req, res) => {
  const selectUserHasRolesInstance2 = new SelectUserHasRoles2();
  try {
    const data = await selectUserHasRolesInstance2.selectUserHasRoles2('academic');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listAcademic;
