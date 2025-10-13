import { SelectSemester } from '../../../../../repository/handleSpecialization/semester/selectSemester.js';

const listSemester = async (req, res) => {
  const selectSemesterInstance = new SelectSemester();
  try {
    const data = await selectSemesterInstance.selectSemester();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listSemester;
