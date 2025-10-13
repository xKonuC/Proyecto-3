import { CreateStudentHasSemester } from '../../../../../../repository/handleSpecialization/studentHasSemester/createStudentHasSemester.js';

const createStudentHasSemester = async (req, res) => {
  const {
    userID, semesterID, evaluationTypeID, specializationID,
  } = req.body;
  const createStudentHasSemesterInstance = new CreateStudentHasSemester();
  try {
    await createStudentHasSemesterInstance.createStudentHasSemester(userID, semesterID, specializationID, evaluationTypeID);
    res.status(200).json({ verificationMessage: 'Se ha iniciado la Actividad correctamente' });
  } catch (error) {
    if (error && error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'No puedes crear el mismo tipo de Actividad más de una vez durante el actual semestre' });
    } else if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createStudentHasSemester;
