import { CreateThesisRegistration } from '../../../../../repository/handleSpecialization/thesisRegistration/createThesisRegistration.js';

const createThesisRegistration = async (req, res) => {
  const {
    studentID, directorID, codirectorID, title,
  } = req.body;
  const createThesisRegistrationInstance = new CreateThesisRegistration();
  try {
    await createThesisRegistrationInstance.createThesisRegistration(studentID, directorID, codirectorID, title);
    res.status(200).json({ verificationMessage: 'El Registro de Tesis fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createThesisRegistration;
