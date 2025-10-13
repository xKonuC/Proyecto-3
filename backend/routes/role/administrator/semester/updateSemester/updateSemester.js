import { UpdateSemester } from '../../../../../repository/handleSpecialization/semester/updateSemester.js';

const updateSemester = async (req, res) => {
  const {
    semesterID, semesterNumber, year, startDate, finishDate,
  } = req.body;
  const updateSemesterInstance = new UpdateSemester();
  try {
    await updateSemesterInstance.updateSemester(semesterID, semesterNumber, year, startDate, finishDate);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateSemester;
