import { UpdateStudentHasSemester } from '../../../../../../repository/handleSpecialization/studentHasSemester/updateStudentHasSemester.js';

const updateStudentHasSemester = async (req, res) => {
  const {
    studentHasSemesterID, semesterID, specializationID,
  } = req.body;
  const updateStudentHasSemesterInstance = new UpdateStudentHasSemester();
  try {
    const data = await updateStudentHasSemesterInstance.updateStudentHasSemester(studentHasSemesterID, semesterID, specializationID);
    if (data.result.affectedRows > 0) {
      res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
    } else {
      return res.status(409).json({ error: 'No tienes permiso para modificar' });
    }
  } catch (error) {
    if (error && error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'Ya estás asociado a esta Evaluación' });
    } else if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateStudentHasSemester;
