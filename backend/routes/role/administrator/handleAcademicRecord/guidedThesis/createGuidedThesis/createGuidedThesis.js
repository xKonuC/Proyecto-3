import { CreateGuidedThesis } from '../../../../../../repository/handleAcademicRecord/guidedThesis/createGuidedThesis.js';

const createGuidedThesis = async (req, res) => {
  const {
    userID, author, type, role, year, title, program, institution, sameProgram, accessURL,
  } = req.body;
  const createGuidedThesisInstance = new CreateGuidedThesis();
  try {
    await createGuidedThesisInstance.createGuidedThesis(userID, author, type, role, year, title, program, institution, sameProgram, accessURL);
    res.status(200).json({ verificationMessage: 'La Información fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createGuidedThesis;
