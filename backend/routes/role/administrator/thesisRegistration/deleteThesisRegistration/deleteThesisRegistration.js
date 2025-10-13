import { DeleteThesisRegistration } from '../../../../../repository/handleSpecialization/thesisRegistration/deleteThesisRegistration.js';

const deleteThesisRegistration = async (req, res) => {
  const { thesisRegistrationIDs } = req.body;
  const deleteThesisRegistrationInstance = new DeleteThesisRegistration();
  try {
    await deleteThesisRegistrationInstance.deleteThesisRegistration(thesisRegistrationIDs);

    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deleteThesisRegistration;
