import { CreateTemplate } from '../../../../../../repository/handleRubric/template/createTemplate.js';

const createTemplate = async (req, res) => {
  const {
    name, description,
  } = req.body;
  const createTemplateInstance = new CreateTemplate();
  try {
    await createTemplateInstance.createTemplate(name, description);
    res.status(200).json({ verificationMessage: 'La Pregunta fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createTemplate;
