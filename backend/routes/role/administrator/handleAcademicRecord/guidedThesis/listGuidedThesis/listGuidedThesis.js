import { GetGuidedThesis } from '../../../../../../repository/handleAcademicRecord/guidedThesis/getGuidedThesis.js';

const listGuidedThesis = async (req, res) => {
  const { userID } = req.body;
  const getGuidedThesisInstance = new GetGuidedThesis();
  try {
    const data = await getGuidedThesisInstance.getGuidedThesis(userID);
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listGuidedThesis;
