import { UpdateTemplateID } from '../../../../../../repository/handleRubric/rubric/updateTemplateID.js';

const updateTemplateID = async (req, res) => {
  const {
    rubricID, templateID,
  } = req.body;
  const updateTemplateIDInstance = new UpdateTemplateID();
  try {
    await updateTemplateIDInstance.updateTemplateID(rubricID, templateID);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateTemplateID;
