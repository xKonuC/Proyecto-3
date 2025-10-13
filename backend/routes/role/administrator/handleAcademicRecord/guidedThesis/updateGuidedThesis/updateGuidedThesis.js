import { UpdateGuidedThesis } from '../../../../../../repository/handleAcademicRecord/guidedThesis/updateGuidedThesis.js';

const updateGuidedThesis = async (req, res) => {
  const {
    guidedThesisID, userID, author, type, role, year, title, program, institution, sameProgram, accessURL,
  } = req.body;
  const updateGuidedThesisInstance = new UpdateGuidedThesis();
  try {
    await updateGuidedThesisInstance.updateGuidedThesis(guidedThesisID, userID, author, type, role, year, title, program, institution, sameProgram, accessURL);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateGuidedThesis;
