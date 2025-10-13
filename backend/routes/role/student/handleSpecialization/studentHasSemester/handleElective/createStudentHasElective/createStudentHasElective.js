import { CreateStudentHasElective } from '../../../../../../../repository/handleSpecialization/studentHasSemester/handleElective/createStudentHasElective.js';

const createStudentHasElective = async (req, res) => {
  const {
    userID, semesterID, electiveID,
  } = req.body;
  const createStudentHasElectiveInstance = new CreateStudentHasElective();
  try {
    await createStudentHasElectiveInstance.createStudentHasElective(userID, semesterID, electiveID);
    res.status(200).json({ verificationMessage: 'Te has asociado a este Electivo' });
  } catch (error) {
    if (error && error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'No puedes crear el mismo tipo de evaluación más de una vez durante el actual semestre' });
    } else if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createStudentHasElective;
