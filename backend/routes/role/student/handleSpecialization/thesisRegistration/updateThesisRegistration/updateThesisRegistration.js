import { UpdateThesisRegistration } from '../../../../../../repository/handleSpecialization/thesisRegistration/updateThesisRegistration.js';

const updateThesisRegistration = async (req, res) => {
  const {
    thesisRegistrationID, userID, directorID, codirectorID, title,
  } = req.body;
  const updateThesisRegistrationInstance = new UpdateThesisRegistration();
  try {
    await updateThesisRegistrationInstance.updateThesisRegistration(thesisRegistrationID, userID, directorID, codirectorID, title);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateThesisRegistration;
