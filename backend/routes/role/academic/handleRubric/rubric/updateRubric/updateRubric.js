import { UpdateRubric } from '../../../../../../repository/handleRubric/rubric/updateRubric.js';

const updateRubric = async (req, res) => {
  const {
    rubricID, name, description, templateID
  } = req.body;
  const updateRubricInstance = new UpdateRubric();
  try {
    await updateRubricInstance.updateRubric(
      rubricID, 
      name, 
      description, 
      templateID);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateRubric;
