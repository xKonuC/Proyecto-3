import { CreateStudentHasSpecialization } from '../../../../../../repository/handleSpecialization/studentHasSpecialization/createStudentHasSpecialization.js';

const createStudentHasSpecialization = async (req, res) => {
  const { userID, specializationID, semesterID } = req.body;
  const createStudentHasSpecializationInstance = new CreateStudentHasSpecialization();
  try {
    await createStudentHasSpecializationInstance.createStudentHasSpecialization(userID, specializationID, semesterID);
    res.status(200).json({ verificationMessage: 'Te has asociado a esta Linea de Formación' });
  } catch (error) {
    if (error && error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'Ya estás asociado a esta Linea de Formación' });
    } else if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createStudentHasSpecialization;
