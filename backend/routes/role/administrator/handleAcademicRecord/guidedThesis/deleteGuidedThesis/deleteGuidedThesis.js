import { DeleteGuidedThesis } from '../../../../../../repository/handleAcademicRecord/guidedThesis/deleteGuidedThesis.js';

const deleteGuidedThesis = async (req, res) => {
  const { guidedThesisIDs, userID } = req.body;
  const deleteGuidedThesisInstance = new DeleteGuidedThesis();
  try {
    await deleteGuidedThesisInstance.deleteGuidedThesis(guidedThesisIDs, userID);

    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deleteGuidedThesis;
