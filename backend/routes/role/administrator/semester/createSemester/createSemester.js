import { CreateSemester } from '../../../../../repository/handleSpecialization/semester/createSemester.js';

const createSemester = async (req, res) => {
  const {
    semesterNumber, year, startDate, finishDate,
  } = req.body;
  const createSemesterInstance = new CreateSemester();
  try {
    await createSemesterInstance.createSemester(semesterNumber, year, startDate, finishDate);
    res.status(200).json({ verificationMessage: 'El Semestre fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createSemester;
