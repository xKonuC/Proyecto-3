import { SelectUserHasRolesStudent } from '../../../../../repository/roleAssignment/userHasRole/selectUserHasRolesStudent.js';

const listStudent = async (req, res) => {
  const selectUserHasRolesInstanceStudent = new SelectUserHasRolesStudent();
  try {
    const data = await selectUserHasRolesInstanceStudent.SelectUserHasRolesStudent();
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listStudent;
