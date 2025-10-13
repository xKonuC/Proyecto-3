import { UpdateTemplate } from '../../../../../../repository/handleRubric/template/updateTemplate.js';

const updateTemplate = async (req, res) => {
  const {
    templateID, name, description,
  } = req.body;
  const updateTemplateInstance = new UpdateTemplate();
  try {
    await updateTemplateInstance.updateTemplate(templateID, name, description);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateTemplate;
