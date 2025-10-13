import { DeleteSemester } from '../../../../../repository/handleSpecialization/semester/deleteSemester.js';

const deleteSemester = async (req, res) => {
  const { semesterIDs } = req.body;
  const deleteSemesterInstance = new DeleteSemester();
  try {
    await deleteSemesterInstance.deleteSemester(semesterIDs);

    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deleteSemester;
